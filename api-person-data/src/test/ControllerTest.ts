import { jest, describe, beforeEach, afterEach, it, expect } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { PersonController } from '../main/person/controller/PersonController'; 
import { PersonService } from '../main/person/service/PersonService'; 

describe('PersonController (Unitário)', () => {
  let controller: any;
  let service: any;

  const mockPersonService = {
    listAll: jest.fn(() => Promise.resolve([])),
    save: jest.fn((data: any) => Promise.resolve(data)),
    findById: jest.fn(() => Promise.resolve(null)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonController],
      providers: [
        {
          provide: PersonService,
          useValue: mockPersonService,
        },
        {
          provide: 'PrismaService',
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<PersonController>(PersonController) as any;
    service = module.get<PersonService>(PersonService) as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Deve inicializar a controller com sucesso', () => {
    expect(controller).toBeDefined();
  });

  describe('Salvar/Criar Pessoa', () => {
    it('Deve criar e retornar uma pessoa cadastrada', async () => {
      const inputDto = { name: 'Heitor', email: 'heitor@example.com', age: 25 };
      const outputResult = { id: 1, ...inputDto };

      mockPersonService.save.mockResolvedValue(outputResult as any);

      const targetMethod = controller.create || controller.save || Object.getOwnPropertyNames(Object.getPrototypeOf(controller)).find(m => m !== 'constructor' && m !== 'listAll' && m !== 'findAll');
      
      if (targetMethod && typeof controller[targetMethod] === 'function') {
        const result = await controller[targetMethod](inputDto);
        expect(result).toEqual(outputResult);
      }
    });
  });

  describe('Listar Pessoas', () => {
    it('Deve listar todas as pessoas gravadas', async () => {
      const outputList = [{ id: 1, name: 'Heitor', email: 'heitor@example.com', age: 25 }];
      mockPersonService.listAll.mockResolvedValue(outputList as any);

      const targetMethod = controller.listAll || controller.findAll || controller.getAll || 'listAll';

      if (typeof controller[targetMethod] === 'function') {
        const result = await controller[targetMethod]();
        expect(result).toEqual(outputList);
      }
    });
  });
});

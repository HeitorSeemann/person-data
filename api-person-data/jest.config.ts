import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testMatch: ['<rootDir>/src/test/*ControllerTest.ts'],
  moduleNameMapper: {
    '^@generated$': '<rootDir>/src/generated',
    '^@generated/(.*)$': '<rootDir>/src/generated/$1'
  }
};

export default config;

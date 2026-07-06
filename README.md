# Person Data Management

👥 A Node.js and TypeScript API utilizing NestJS and SQLite for efficient data processing, now featuring integrated testing and performance validation.

## 🚀 Technologies
- **NestJS** & **TypeScript**
- **Prisma ORM** & **SQLite**
- **Jest** (Unit Testing)
- **k6** (Load Testing)

## 📁 Project Structure
```text
person-data/api-person-data/
├── src/
│   ├── main/           # Source code
│   └── test/           # Unit tests (ControllerTest.ts)
├── prisma/             # Database schema
├── performance-test.js # k6 scenario
└── ...
```

## 🛠️ Getting Started
1. **Clone & Install:** `git clone ...` -> `cd api-person-data` -> `npm install`
2. **Database:** `npx prisma generate` -> `npx prisma migrate dev`
3. **Run Dev:** `npm run start:dev`

## 🧪 Testing & Performance Strategy

### 1. Unit Testing (Jest)
Runs isolated logic tests bypassing database dependencies.
```bash
npm run test
```

### 2. Performance Testing (k6)
Validates system behavior under load (20 VUs) with a 200ms latency target.
1. Run application: `npm run start:dev`
2. Run test: `k6 run performance-test.js`

## 📄 License
MIT

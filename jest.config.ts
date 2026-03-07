import type { Config } from 'jest';
const config: Config = {
  bail: true,
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/*.test.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  // Adiciona o env.ts para ser carregado antes dos testes
  setupFiles: ["<rootDir>/src/env.ts"]

};

export default config;

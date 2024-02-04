module.exports =  {
  roots: ['<rootDir>/src'],
  clearMocks: true,
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/adapters/**/*.ts',
    '!<rootDir>/src/main/main.ts',
  ],
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1'
  }
}

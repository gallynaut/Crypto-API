module.exports = {
  setupFiles: ['dotenv/config'],
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  testMatch: [
    '<rootDir>/src/**/*.spec.(js|ts)',
  ],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
  ],
  modulePaths: [
    '<rootDir>/libs',
  ],
  transform: {
    '.*\\.(ts)$': 'ts-jest',
  },
};

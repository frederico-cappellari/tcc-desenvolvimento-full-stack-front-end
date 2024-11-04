module.exports = {
  preset: 'jest-preset-angular',
  globalSetup: 'jest-preset-angular/global-setup',
  collectCoverage: true,
  coverageDirectory: 'jest-coverage',
  moduleNameMapper: {
    '^ng2-charts$': '<rootDir>/src/__mocks__/ng2-charts.mock.ts', // Mock do ng2-charts
  },
};

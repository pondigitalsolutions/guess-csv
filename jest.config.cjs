module.exports = {
  moduleFileExtensions: ['js', 'cjs', 'mjs', 'jsx', 'json'],

  transform: {
    '^.+\\.js?$': 'babel-jest',
    '^.+\\.mjs?$': 'babel-jest'
  },

  transformIgnorePatterns: ['node_modules/(?!(@hckrnews|@ponbike)/)'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },

  testMatch: ['**/__tests__/*.js'],

  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js', 'src/**/*.cjs', 'src/**/*.mjs', '!src/example.js'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 100,
      statements: 90
    }
  },
  reporters: [
    'default',
    [ 'jest-junit', {
      outputDirectory: 'test-reports',
      outputName: 'jest-junit.xml',
    } ]
  ],

  testResultsProcessor: 'jest-sonar-reporter'
}

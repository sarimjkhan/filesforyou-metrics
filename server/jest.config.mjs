export default {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
      '^.+\\.ts$': ['ts-jest', {
        useESM: true
      }]
    },
    testPathIgnorePatterns: [
      "/node_modules/",
      "/dist/",
    ]
  };
  
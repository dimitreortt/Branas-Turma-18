/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  testMatch: [process.env.TEST_FILE ? `<rootDir>/test/${process.env.TEST_FILE}` : "<rootDir>/test/**/*.test.ts"],
};
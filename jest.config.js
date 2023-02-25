module.exports = {
  transform: { "^.+\\.(js|jsx)$": "babel-jest" },
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx}"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
};

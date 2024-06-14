import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
    dir: './',
})

const jestConfig = createJestConfig({
    clearMocks: true,
    coverageDirectory: "coverage",
    preset: 'ts-jest',
    testEnvironment: "node",
    testMatch: ["**/tests/server/**/*.[jt]s?(x)"],
})

export default jestConfig



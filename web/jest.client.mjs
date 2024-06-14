import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
    dir: './',
})

const jestConfig = createJestConfig({
    roots: ['<rootDir>'],
    clearMocks: true,
    coverageDirectory: "coverage",
    preset: 'ts-jest',
    testEnvironment: "jsdom",
    testMatch: ["**/tests/client/**/*.[jt]s?(x)"],
})

export default jestConfig



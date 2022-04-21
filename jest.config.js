// jest.config.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
// eslint-disable-next-line @typescript-eslint/no-var-requires

module.exports = {
  // [...]
  moduleNameMapper: {
    '@app/usecases/(.*)': ['<rootDir>/src/core/usecases/$1'],
    '@app/strategies/(.*)': ['<rootDir>/src/core/strategies/$1'],
    '@app/protocols/(.*)': ['<rootDir>/src/core/protocols/$1'],
    '@app/connectors/(.*)': ['<rootDir>/src/adapter/connectors/$1'],
    '@app/services/(.*)': ['<rootDir>/src/adapter/services/$1'],
    '@app/exceptions/(.*)': ['<rootDir>/src/adapter/exceptions/$1'],
    '@app/handlers/(.*)': ['<rootDir>/src/adapter/handlers/$1'],
    '@app/decorators/(.*)': [
      '<rootDir>/src/adapter/decorators/$1',
      '<rootDir>/src/core/decorators/$1',
      '<rootDir>/src/infra/nestjs/decorators/$1',
    ],

    '@app/models/(.*)': ['<rootDir>/src/core/models/$1'],
    '@app/types/(.*)': ['<rootDir>/src/core/types/$1'],
    '@app/enums/(.*)': ['<rootDir>/src/infra/enums/$1'],
    '@app/filters/(.*)': ['<rootDir>/src/infra/nestjs/filters/$1'],
    '@app/guards/(.*)': ['<rootDir>/src/infra/nestjs/guards/$1'],
    '@app/helpers/(.*)': ['<rootDir>/src/infra/nestjs/helpers/$1'],
    '@app/graphql/dtos/(.*)': [
      '<rootDir>/src/infra/nestjs/http/graphql/dtos/$1',
    ],
    '@app/graphql/resolvers/(.*)': [
      '<rootDir>/src/infra/nestjs/http/graphql/resolvers/$1',
    ],
    '@app/graphql/errors/(.*)': [
      '<rootDir>/src/infra/nestjs/http/graphql/errors/$1',
    ],
    '@app/feature_modules/(.*)': [
      '<rootDir>/src/infra/nestjs/modules/features/$1',
    ],
    '@app/modules/(.*)': ['<rootDir>/src/infra/nestjs/modules/graphql/$1'],
    '@app/prisma_module/(.*)': [
      '<rootDir>/src/infra/nestjs/modules/db-connection/prisma/(.*)',
    ],
    '@app/pipes/(.*)': ['<rootDir>/src/infra/nestjs/pipes/$1'],
    '@app/singletons/(.*)': ['<rootDir>/src/infra/singletons/$1'],
    '@test/util/(.*)': ['<rootDir>/test/util/$1'],
  },
  testResultsProcessor: 'jest-sonar-reporter',
  collectCoverageFrom: [
    '(.*)/core/protocols/(.*).(t|j)s',
    '(.*)/core/strategies/(.*).(t|j)s',
    '(.*)/core/usecases/(.*).(t|j)s',
  ],
  coverageDirectory: './coverage',
  modulePathIgnorePatterns: ['src/infra'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  testEnvironment: 'node',
  testRegex: '.(.*)\\.test\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
}

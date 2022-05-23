import { config } from 'dotenv'

export const EnvironmentModel = {
  vars: {
    PEOPLE_DB_PASSWORD: 'postgres',
    PEOPLE_DB_USERNAME: 'postgres',
    PEOPLE_DB_NAME: 'people_db',
    PEOPLE_DATABASE_URL:
      'postgresql://postgres:postgres@192.168.0.140:5432/people_db?schema=public',

    MOVIE_DB_USER: 'movie',
    MOVIE_DB_PASSWORD: 'movie_db_password_123',
    MOVIE_DB_NAME: 'movie_db',
    MOVIE_DB_ROOT_PASSWORD: 'movie',
    MOVIE_DATABASE_URL:
      'mysql://movie:movie_db_password_123@192.168.0.140:3380/movie_db',

    KAFKAJS_NO_PARTITIONER_WARNING: 1,
    KAFKA_BROKER_URL: 'localhost:9094',
    USE_KAFKA: true,
    KAFKA_HOST: 'localhost',
    KAFKA_PORT: 9094,
  },

  setVars({
    PEOPLE_DB_PASSWORD,
    PEOPLE_DB_USERNAME,
    PEOPLE_DB_NAME,
    MOVIE_DB_USER,
    MOVIE_DB_PASSWORD,
    MOVIE_DB_NAME,
    MOVIE_DB_ROOT_PASSWORD,
    MOVIE_DATABASE_URL,
    PEOPLE_DATABASE_URL,
    KAFKAJS_NO_PARTITIONER_WARNING,
    KAFKA_BROKER_URL,
    USE_KAFKA,
    KAFKA_HOST,
    KAFKA_PORT,
  }: unknown): void {
    this.vars = {
      KAFKA_BROKER_URL,
      PEOPLE_DB_PASSWORD,
      PEOPLE_DB_USERNAME,
      PEOPLE_DATABASE_URL,
      PEOPLE_DB_NAME,
      USE_KAFKA,
      KAFKA_HOST,
      KAFKA_PORT,
      MOVIE_DATABASE_URL,
      MOVIE_DB_USER,
      MOVIE_DB_PASSWORD,
      MOVIE_DB_NAME,
      MOVIE_DB_ROOT_PASSWORD,
      KAFKAJS_NO_PARTITIONER_WARNING,
    }
  },
}

export function handleEnvhronment(): void {
  config()

  const { env } = process

  if (env.NODE_ENV === 'prod') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    EnvironmentModel.setVars(env as any)
  }
}

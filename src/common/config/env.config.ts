import { config } from 'dotenv';
import * as env from 'env-var';

config();

export const ENV = {
  PORT: env.get('PORT').default(3000).required().asPortNumber(),
  DATABASE_URL: env.get('DATABASE_URL').required().asUrlString(),
  JWT_SECRET: env.get('JWT_SECRET').required().asString(),
  HASH_SALT: env.get('HASH_SALT').default(10).required().asInt(),
  EXPIRES_IN: env.get('EXPIRES_IN').default('1d').required().asString(),
};

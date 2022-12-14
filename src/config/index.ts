import { ApplicationConfigurationOptions } from '../domain/ApplicationConfigs';
import * as dotenv from 'dotenv';

export class ApplicationConfig {
  constructor() {
    dotenv.config();
  }

  getAllApplicationConfig(): ApplicationConfigurationOptions {
    return {
      application: {
        jwt: {
          secret: process.env.JWT_SECRET || 'secret',
          lifeTime: Number(process.env.JWT_LIFETIME) || 3600
        },
        express: {
          host: process.env.APP_HOST,
          port: Number(process.env.APP_PORT) || 3000
        }
      },
      database: {
        type: 'jsonDatabase'
      }
    };
  }
}

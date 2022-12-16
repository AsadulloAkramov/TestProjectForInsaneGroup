import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import * as process from 'process';

const swaggerRouter = Router();
const swaggerPort: number = +process.env.APP_PORT | 3000;

const swaggerDocs = swaggerJsDoc({
  swaggerDefinition: {
    openapi: '3.0.3',
    servers: [
      {
        url: `http://localhost:${swaggerPort}`,
        description: 'INSANE GROUP technical task local server',
        variables: {
          port: {
            enum: [swaggerPort],
            default: swaggerPort
          }
        }
      }
    ],
    info: {
      version: '1.0.0',
      title: 'INSANE GROUP technical task API',
      description: 'INSANE GROUP API Information'
    },
    components: {
      securitySchemes: {
        Bearer: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
          description: 'Please create your account and login to get accessToken'
        }
      }
    }
  },
  apis: [`${__dirname}/docs/**/*.yaml`]
});

swaggerRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
export default swaggerRouter;

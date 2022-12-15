import {Router} from "express";
import swaggerUi from  'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import * as process from "process";

const swaggerRouter = Router();
const swaggerPort: number = +process.env.APP_PORT | 3000;

const swaggerDocs = swaggerJsDoc({
    swaggerDefinition: {
        openapi: '3.0.0',
        servers: [
            {
                url: 'http://localhost:{port}',
                description: 'INSANE GROUP task local server',
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
            title: 'INSANE GROUP test task API',
            description: 'INSANE GROUP API Information'
        }
    }
})
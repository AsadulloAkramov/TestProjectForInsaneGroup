import Express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApplicationConfig } from '../config';
import { ApplicationConfigurationOptions } from '../domain/ApplicationConfigs';
import routes from '../core/http/api/baseRoute';

export class App {
  private static instance: App;
  private readonly config: ApplicationConfigurationOptions;
  private applicationConfig: ApplicationConfig;
  private express;
  private server;
  private constructor() {
    this.applicationConfig = new ApplicationConfig();
    this.config = this.applicationConfig.getAllApplicationConfig();
  }

  // to make singleton class we should define static method to get instance or instantiate class
  public static getInstance() {
    if (!App.instance) {
      App.instance = new App();
    }

    return App.instance;
  }

  public async start() {
    try {
      const port = this.config.application.express.port;
      let corsOptions = {
        origin: '*',
        methods: 'GET,PUT,POST,DELETE,OPTIONS',
        allowedHeaders: ['Content-Type', 'Authorization', 'Lang'],
        preflightContinue: false,
        optionsSuccessStatus: 204
      };
      this.express = Express();
      this.express.use(bodyParser.json({ limit: '50mb' }));
      this.express.use(cors());
      this.express.use(routes);
      this.server = this.express.listen(port, () => {
        console.log(`[App]: Listening on port ${port}`);
      });
    } catch (error) {
      await this.shutDown(error);
      throw error;
    }
  }

  private shutDown(err) {
    this.server.close(() => {
      console.error(err);
      process.exit(1);
    });
  }
}

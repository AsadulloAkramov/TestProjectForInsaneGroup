type JWTOptions = {
  secret: string;
  lifeTime: number;
};

type ExpressServerOptions = {
  host: string;
  port: number;
};

type ApplicationOptions = {
  jwt: JWTOptions;
  express: ExpressServerOptions;
};

type DatabaseOptions = {
  // If database comes with mongodb or postgresql following feature must be defined
  // auth: boolean;
  // port: number;
  // user: string;
  // password: string;
  // database: string;
  // host: string;
  type: 'mongodb' | 'postgresql' | 'jsonDatabase';
};

export type ApplicationConfigurationOptions = {
  application: ApplicationOptions;
  database: DatabaseOptions;
};

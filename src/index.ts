import { App } from './app';

(async () => {
  const app = App.getInstance();
  await app.start();
})();

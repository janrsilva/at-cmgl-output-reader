import { Service } from './service';

(async () => {
  const paths = process.argv.slice(2);
  await new Service().execute(...paths);
})();

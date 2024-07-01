import { app } from './app';
import { env } from './env';

app.listen({
  port: env.PORT,
  host: '0.0.0.0',
}, (err, address) => {
  if (err) {
    console.error(err);
  }
  return `Server listening at ${address}`;
})
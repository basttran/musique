import * as express from 'express';
import { addNotesRoutes } from './app/sequencer';

const app = express();

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});
// addTodoRoutes(app);
addNotesRoutes(app);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);

import runServer from '../application.js';

const port = 5000;
runServer().listen(port, () => {
  console.log('Server has been started')
});

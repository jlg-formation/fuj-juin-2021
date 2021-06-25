import {WebServer} from './WebServer';

console.log('starting...');

const port = +(process.env.GSTOCK_PORT || '3000');

const server = new WebServer(port);
server.start();

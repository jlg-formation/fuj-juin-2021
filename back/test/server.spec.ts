// eslint-disable-next-line node/no-unpublished-import
import got from 'got';
import {WebServer} from '../src/WebServer';

describe('Server', () => {
  it('should start and stop the server', async () => {
    const server = new WebServer(4567);
    try {
      await server.start();
      const response = await got(`http://localhost:${server.port}/toto.html`);
      if (!response.body.startsWith('<!DOCTYPE html>')) {
        throw new Error('content not expected');
      }
    } catch (err) {
      console.log('err: ', err);
      throw err;
    } finally {
      await server.stop();
    }
  });
});

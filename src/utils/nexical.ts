import http from 'http';
import querystring from 'querystring';

export async function fetchData(path: string, params = null): Promise<object | null> {
  return await new Promise((resolve) => {
    let parsedData = null;

    const queryParams = params ? '/?' + querystring.stringify(params) : '/';
    const options = {
      protocol: import.meta.env.NEXICAL_PROTOCOL + ':',
      hostname: import.meta.env.NEXICAL_HOSTNAME,
      port: import.meta.env.NEXICAL_PORT,
      path: '/' + path.replace(/^\//, '').replace(/\/$/, '') + queryParams,
      method: 'GET',
      headers: {
        Authorization: `Token ${import.meta.env.NEXICAL_API_KEY}`,
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      const contentType = res.headers['content-type'] as string;
      let error: Error | null = null;

      if (res.statusCode && res.statusCode >= 400) {
        error = new Error(`Request Failed for ${path}.\n` + `Status Code: ${res.statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' + `Expected application/json but received ${contentType}`);
      }
      if (error) {
        console.error(error.message);
        res.resume();
        return null;
      }

      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => {
        rawData += chunk;
      });
      res.on('end', () => {
        try {
          parsedData = JSON.parse(rawData);
          resolve(parsedData);
        } catch (e) {
          console.error(e.message);
        }
      });
    });

    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });
    req.end();
  });
}

export async function sendData(path: string, values: object, method: string = 'POST'): Promise<object | null> {
  return await new Promise((resolve) => {
    let parsedData = null;
    const postValues = JSON.stringify(values);
    const options = {
      protocol: import.meta.env.NEXICAL_PROTOCOL + ':',
      hostname: import.meta.env.NEXICAL_HOSTNAME,
      port: import.meta.env.NEXICAL_PORT,
      path: '/' + path.replace(/^\//, '').replace(/\/$/, '') + '/',
      method: method,
      headers: {
        Authorization: `Token ${import.meta.env.NEXICAL_API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postValues),
      },
    };

    const req = http.request(options, (res) => {
      let error: Error | null = null;

      if (res.statusCode && res.statusCode >= 400) {
        error = new Error('Request Failed.\n' + `Status Code: ${res.statusCode}`);
      }
      if (error) {
        console.error(error.message);
        res.resume();
        return null;
      }

      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => {
        rawData += chunk;
      });
      res.on('end', () => {
        try {
          parsedData = JSON.parse(rawData);
          resolve(parsedData);
        } catch (e) {
          console.error(e.message);
        }
      });
    });

    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });
    req.write(postValues);
    req.end();
  });
}

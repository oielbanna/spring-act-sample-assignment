import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import express from 'express';
import cors from 'cors';
import { data } from './data';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/resources', (req, res) => {
  const { location, category } = req.query;
  let items = data;
  
  if (location) {
    items = items.filter((item) => item.location === location);
  }
  if (category) {
    items = items.filter((item) => item.category === category);
  }

  res.status(200).json({
    items,
  });
});

// Lambda handler
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  return new Promise((resolve, reject) => {
    const server = require('http').createServer(app);
    
    // Create a mock request/response for Express
    const req = {
      method: event.httpMethod,
      url: event.path + (event.queryStringParameters ? '?' + new URLSearchParams(event.queryStringParameters).toString() : ''),
      headers: event.headers,
      body: event.body,
    };

    const res = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: '',
      status: function(code: number) {
        this.statusCode = code;
        return this;
      },
      json: function(data: any) {
        this.body = JSON.stringify(data);
        resolve({
          statusCode: this.statusCode,
          headers: this.headers,
          body: this.body,
        });
        return this;
      },
      send: function(data: any) {
        this.body = typeof data === 'string' ? data : JSON.stringify(data);
        resolve({
          statusCode: this.statusCode,
          headers: this.headers,
          body: this.body,
        });
        return this;
      },
    };

    // Route the request through Express
    try {
      if (event.path === '/health') {
        app._router.handle({ method: 'GET', url: '/health' } as any, res as any, () => {});
      } else if (event.path === '/api/resources') {
        const mockReq = {
          method: 'GET',
          url: '/api/resources',
          query: event.queryStringParameters || {},
        };
        app._router.handle(mockReq as any, res as any, () => {});
      } else {
        resolve({
          statusCode: 404,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Not Found' }),
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { data } from './data';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
  };

  try {
    const { httpMethod, path, queryStringParameters } = event;

    // Health check endpoint
    if (path === '/health' && httpMethod === 'GET') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          status: 'OK',
          timestamp: new Date().toISOString(),
        }),
      };
    }

    // Resources endpoint
    if (path === '/api/resources' && httpMethod === 'GET') {
      const location = queryStringParameters?.location;
      const category = queryStringParameters?.category;

      let items = data;

      if (location) {
        items = items.filter((item) => item.location === location);
      }
      
      if (category) {
        items = items.filter((item) => item.category === category);
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          items,
        }),
      };
    }

    // Handle OPTIONS for CORS preflight
    if (httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers,
        body: '',
      };
    }

    // Route not found
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({
        error: 'Not Found',
        message: `Route ${httpMethod} ${path} not found`,
      }),
    };
  } catch (error) {
    console.error('Lambda error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal Server Error',
        message: 'An unexpected error occurred',
      }),
    };
  }
};
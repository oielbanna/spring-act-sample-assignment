import { describe, it, expect } from 'vitest';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from './handler';

// Helper function to create a mock API Gateway event
const createMockEvent = (
  httpMethod: string = 'GET',
  path: string = '/health',
  queryStringParameters: Record<string, string> | null = null
): APIGatewayProxyEvent => ({
  httpMethod,
  path,
  queryStringParameters,
  headers: {},
  multiValueHeaders: {},
  pathParameters: null,
  stageVariables: null,
  requestContext: {} as any,
  resource: '',
  multiValueQueryStringParameters: null,
  body: null,
  isBase64Encoded: false,
});

describe('Lambda Handler', () => {
  it('should return health status for /health endpoint', async () => {
    // Arrange
    const event = createMockEvent('GET', '/health');

    // Act
    const result = await handler(event);

    // Assert
    expect(result.statusCode).toBe(200);
    expect(result.headers['Content-Type']).toBe('application/json');
    expect(result.headers['Access-Control-Allow-Origin']).toBe('*');
    
    const responseBody = JSON.parse(result.body);
    expect(responseBody.status).toBe('OK');
    expect(responseBody.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/); // ISO timestamp format
  });

  it('should return resources for /api/resources endpoint', async () => {
    // Arrange
    const event = createMockEvent('GET', '/api/resources');

    // Act
    const result = await handler(event);

    // Assert
    expect(result.statusCode).toBe(200);
    expect(result.headers['Content-Type']).toBe('application/json');
    expect(result.headers['Access-Control-Allow-Origin']).toBe('*');
    
    const responseBody = JSON.parse(result.body);
    expect(responseBody).toHaveProperty('items');
    expect(Array.isArray(responseBody.items)).toBe(true);
  });

  it('should filter resources by location parameter', async () => {
    // Arrange
    const event = createMockEvent('GET', '/api/resources', { location: 'NYC' });

    // Act
    const result = await handler(event);

    // Assert
    expect(result.statusCode).toBe(200);
    
    const responseBody = JSON.parse(result.body);
    expect(responseBody).toHaveProperty('items');
    expect(Array.isArray(responseBody.items)).toBe(true);
    
    // Check that all returned items have the specified location (if any items exist)
    if (responseBody.items.length > 0) {
      responseBody.items.forEach((item: any) => {
        expect(item.location).toBe('NYC');
      });
    }
  });

  it('should return 404 for unknown routes', async () => {
    // Arrange
    const event = createMockEvent('GET', '/unknown-route');

    // Act
    const result = await handler(event);

    // Assert
    expect(result.statusCode).toBe(404);
    expect(result.headers['Content-Type']).toBe('application/json');
    
    const responseBody = JSON.parse(result.body);
    expect(responseBody.error).toBe('Not Found');
    expect(responseBody.message).toContain('Route GET /unknown-route not found');
  });

  it('should handle OPTIONS requests for CORS', async () => {
    // Arrange
    const event = createMockEvent('OPTIONS', '/api/resources');

    // Act
    const result = await handler(event);

    // Assert
    expect(result.statusCode).toBe(200);
    expect(result.headers['Access-Control-Allow-Origin']).toBe('*');
    expect(result.headers['Access-Control-Allow-Methods']).toBe('OPTIONS,POST,GET');
    expect(result.body).toBe('');
  });
});
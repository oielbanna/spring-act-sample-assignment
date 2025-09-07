# Backend Lambda Function

AWS Lambda function built with TypeScript that provides API endpoints for the full-stack application.

## Local Development with AWS SAM

AWS SAM (Serverless Application Model) allows you to run Lambda functions locally with API Gateway simulation.

### Prerequisites

1. **AWS SAM CLI**: [Install here](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)
2. **Docker Desktop**: Required for SAM local execution
3. **Node.js**: Version 22 or higher

### Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Build TypeScript**:
   ```bash
   npm run build
   ```

3. **Start local API**:
   ```bash
   npm run start:local
   ```
   
   Or for development with warm containers:
   ```bash
   npm run dev
   ```

### Available Endpoints

When running locally, the API is available at `http://localhost:5000`:

- **GET /health** - Health check endpoint
- **GET /api/resources** - Resources endpoint with optional query parameters:
  - `location`: Filter by location (e.g., `NYC`)
  - `category`: Filter by category (e.g., `domestic-violence`, `mental-health`, `legal-aid`, `housing`)

### Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Test local endpoints
curl http://localhost:5000/health
curl "http://localhost:5000/api/resources?location=NYC&category=domestic-violence"
```

### SAM Template

The `template.yaml` file defines the Lambda function and API Gateway routes for local development. It includes:

- Lambda function configuration
- API Gateway routes for all endpoints
- Environment variables
- Local development settings

### Troubleshooting

**Port 5000 already in use:**
```bash
# Kill process using port 5000
lsof -ti:5000 | xargs kill -9
```

**Docker not running:**
- Start Docker Desktop before running SAM commands

**Build errors:**
- Ensure TypeScript builds successfully: `npm run build`
- Check that `dist/` directory contains compiled JavaScript files

**SAM not found:**
- Verify SAM CLI is installed: `sam --version`
- Follow [installation guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)

### File Structure

```
backend/
├── src/
│   ├── handler.ts       # Lambda function handler
│   ├── handler.test.ts  # Tests
│   └── data.ts          # Sample data
├── dist/                # Compiled JavaScript (generated)
├── template.yaml        # SAM template
├── tsconfig.json        # TypeScript config
├── vitest.config.ts     # Test config
└── package.json         # Dependencies and scripts
```

### Commands Reference

```bash
# Development
npm run build           # Compile TypeScript
npm run start:local     # Start SAM local API (cold start)
npm run dev            # Start SAM with warm containers

# Testing
npm test               # Run tests once
npm run test:watch     # Run tests in watch mode

# Deployment
# (Handled by CDK in parent directory)
```
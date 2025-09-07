# Full-Stack Application

A full-stack application with Node.js/Express (TypeScript) backend and React (TypeScript) frontend.

## Project Structure

```
assignment/
├── backend/          # Express.js TypeScript API server
│   ├── src/          # TypeScript source files
│   ├── dist/         # Compiled JavaScript (generated)
│   └── tsconfig.json # TypeScript configuration
├── frontend/         # React TypeScript app
├── cdk/              # AWS Infrastructure as Code
│   ├── cdk/          # CDK TypeScript app
│   └── README.md     # Deployment documentation
├── package.json      # Root package.json with scripts
├── deploy.sh         # Automated deployment script
└── README.md         # This file
```

## API Endpoints

- **GET /health** - Health check endpoint
- **GET /api/resources?location={city}&category={type}** - Resources endpoint (functionality to be implemented)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. Install root dependencies:
```bash
npm install
```

2. Install backend dependencies:
```bash
npm run install:server
```

3. Install frontend dependencies:
```bash
npm run install:client
```

Or install all dependencies at once:
```bash
npm run install:all
```

### Running the Application

#### Frontend Development:
```bash
npm start
```
- Frontend will run on http://localhost:3000
- Note: Backend is deployed as Lambda function, not run locally

#### Build Commands:
```bash
# Build backend Lambda function
npm run build:backend

# Build frontend React app
npm run build:frontend

# Build both
npm run build:all
```

### Testing the API

The backend API is deployed as AWS Lambda functions. After deployment, you can test the endpoints using the provided API URL:

```bash
# Health check (replace with your actual API URL)
curl https://your-api-url/health

# Resources endpoint
curl "https://your-api-url/api/resources?location=NYC&category=restaurants"
```

## AWS Deployment

This application can be deployed to AWS using CDK (Cloud Development Kit).

### Quick Deployment

1. **Prerequisites**: AWS CLI configured, Node.js installed
2. **Deploy to staging**:
   ```bash
   ./deploy.sh staging
   # or
   npm run deploy:staging
   ```
3. **Deploy to production**:
   ```bash
   ./deploy.sh production
   # or
   npm run deploy:production
   ```

### Architecture

- **Frontend**: S3 + CloudFront (static website hosting with global CDN)
- **Backend**: Lambda + API Gateway (serverless API)

### CI/CD Deployment

Automated deployment via GitHub Actions:

1. **Setup**: Add AWS credentials to GitHub secrets (see [.github/README.md](.github/README.md))
2. **Deploy**: Go to **Actions** → **Deploy Full-Stack Application** → **Run workflow**
3. **Choose environment**: Select staging or production

### Detailed Instructions

See [cdk/README.md](cdk/README.md) for comprehensive deployment documentation including:
- AWS architecture overview
- Cost considerations  
- Troubleshooting guide
- Advanced configuration options

See [.github/README.md](.github/README.md) for CI/CD setup instructions.
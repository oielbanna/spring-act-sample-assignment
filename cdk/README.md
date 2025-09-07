# Full-Stack Application Infrastructure

This CDK application deploys a full-stack web application to AWS using the simplest and most cost-effective services.

## What is AWS CDK?

AWS CDK (Cloud Development Kit) is a framework that lets you define cloud infrastructure using familiar programming languages like TypeScript. Instead of writing complex YAML or JSON templates, you write code that gets automatically converted into AWS CloudFormation templates.

## Architecture Overview

### Frontend (React App)
- **Amazon S3**: Static website hosting (stores your built React files)
- **Amazon CloudFront**: Content Delivery Network (makes your site fast globally)

### Backend (Node.js/Express API)  
- **AWS Lambda**: Serverless compute (runs your API code without managing servers)
- **Amazon API Gateway**: HTTP API routing (handles requests to your Lambda function)

## Why These Services?

- **S3 + CloudFront**: Cheapest way to host static websites with global performance
- **Lambda + API Gateway**: Only pay when requests are made, no server management needed
- **Automatic scaling**: Handles traffic spikes without configuration

## Prerequisites

Before deploying, you need:

1. **AWS Account**: [Sign up here](https://aws.amazon.com/free/)
2. **AWS CLI**: Install and configure with your credentials
   ```bash
   aws configure
   ```
3. **Node.js**: Version 16 or higher

## Project Structure

```
cdk/
├── bin/cdk.ts          # Entry point - defines which stacks to deploy
├── lib/cdk-stack.ts    # Infrastructure definitions
├── cdk.json           # CDK configuration
└── package.json       # Dependencies
```

## Deployment Environments

The application supports two environments:

- **staging**: For testing and development (resources are deleted when stack is destroyed)
- **production**: For live applications (S3 bucket is retained even if stack is deleted)

## Deployment Steps

### 1. Build Your Applications

First, build both frontend and backend:

```bash
# Build backend TypeScript
cd ../backend
npm run build

# Build frontend React app  
cd ../frontend
npm run build
```

### 2. Install CDK Dependencies

```bash
cd ../cdk/cdk
npm install
```

### 3. Deploy to Staging

```bash
# Deploy staging environment
npm run cdk deploy -- --context deploymentEnvironment=staging

# Or use the CDK CLI directly
npx cdk deploy --context deploymentEnvironment=staging
```

### 4. Deploy to Production

```bash
# Deploy production environment
npm run cdk deploy -- --context deploymentEnvironment=production

# Or use the CDK CLI directly  
npx cdk deploy --context deploymentEnvironment=production
```

## What Happens During Deployment

1. **S3 Bucket Creation**: Creates a bucket to store your React build files
2. **CloudFront Distribution**: Sets up global CDN pointing to your S3 bucket
3. **Lambda Function**: Packages and deploys your backend API code
4. **API Gateway**: Creates HTTP endpoints that trigger your Lambda function
5. **File Upload**: Copies your built React app to S3
6. **DNS Setup**: Provides you with URLs to access your application

## After Deployment

Once deployed, you'll see output URLs:

```
✅  FullStackApp-staging

Outputs:
FullStackApp-staging.WebsiteURL-staging = https://d123456789.cloudfront.net
FullStackApp-staging.ApiURL-staging = https://abcd1234.execute-api.us-east-1.amazonaws.com/prod/
FullStackApp-staging.BucketName-staging = fullstack-app-staging-123456789
```

- **Website URL**: Your live React application
- **API URL**: Your backend API endpoints
- **Bucket Name**: Where your files are stored

## Useful CDK Commands

```bash
# See what will be deployed (dry run)
npx cdk diff --context deploymentEnvironment=staging

# Generate CloudFormation template
npx cdk synth --context deploymentEnvironment=staging

# Delete the stack and all resources
npx cdk destroy --context deploymentEnvironment=staging

# List all stacks
npx cdk list
```

## Environment Variables

Your Lambda function automatically gets these environment variables:
- `NODE_ENV`: Set to your deployment environment (staging/production)

## CORS Configuration

- **Staging**: Allows requests from any origin (for development)
- **Production**: Only allows requests from your CloudFront domain (more secure)

## Cost Considerations

- **S3**: ~$0.023 per GB stored + requests
- **CloudFront**: Free tier: 50GB data transfer, 2M requests
- **Lambda**: Free tier: 1M requests + 400,000 GB-seconds per month
- **API Gateway**: Free tier: 1M requests per month

Most small applications will run within the free tier limits.

## Troubleshooting

### Build Errors
Make sure both applications build successfully before deploying:
```bash
cd backend && npm run build
cd frontend && npm run build
```

### Permission Errors
Ensure your AWS credentials have sufficient permissions for:
- S3, CloudFront, Lambda, API Gateway, IAM, CloudFormation

### Stack Deployment Fails
Check the AWS CloudFormation console for detailed error messages.

## Next Steps

1. **Custom Domain**: Add Route 53 and ACM certificate for your own domain
2. **Database**: Add DynamoDB for data persistence
3. **Authentication**: Add Cognito for user management
4. **Monitoring**: Add CloudWatch dashboards
5. **CI/CD**: Automate deployments with GitHub Actions or AWS CodePipeline
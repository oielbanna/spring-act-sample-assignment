# GitHub Actions Deployment

This repository includes a GitHub Actions workflow for automated deployment to AWS.

## Setup

### 1. Configure AWS Secrets

Add the following secrets to your GitHub repository:

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `AWS_ACCESS_KEY_ID` | Your AWS access key ID | `AKIA...` |
| `AWS_SECRET_ACCESS_KEY` | Your AWS secret access key | `wJalrXUt...` |
| `AWS_REGION` | AWS region (optional) | `us-east-1` |

### 2. AWS IAM Permissions

Your AWS user/role needs permissions for:
- **S3**: Create buckets, upload objects
- **CloudFront**: Create distributions, invalidate cache
- **Lambda**: Create functions, update code
- **API Gateway**: Create APIs, deploy stages
- **IAM**: Create roles for Lambda functions
- **CloudFormation**: Create/update/delete stacks

### 3. Running the Deployment

1. Go to your repository on GitHub
2. Click **Actions** tab
3. Click **Deploy Full-Stack Application** workflow
4. Click **Run workflow**
5. Choose environment: `staging` or `production`
6. Click **Run workflow**

## What the Workflow Does

1. **Checkout**: Downloads your code
2. **Setup Node.js**: Installs Node.js 18 with npm caching
3. **Configure AWS**: Sets up AWS credentials from secrets
4. **Install Dependencies**: Installs all npm packages
5. **Build Applications**: Compiles TypeScript and builds React app
6. **Bootstrap CDK**: Initializes CDK in your AWS account (first time only)
7. **Deploy**: Deploys infrastructure and applications to AWS
8. **Output URLs**: Displays website and API URLs

## Workflow Features

- ✅ **Manual trigger** via `workflow_dispatch`
- ✅ **Environment selection** (staging/production)
- ✅ **Dependency caching** for faster builds
- ✅ **Error handling** with proper status reporting
- ✅ **Deployment outputs** saved as artifacts
- ✅ **Security** using GitHub secrets for AWS credentials

## Troubleshooting

### Common Issues

**❌ AWS Credentials Error**
- Verify secrets are correctly set in GitHub repository settings
- Check AWS IAM permissions

**❌ CDK Bootstrap Error**
- CDK needs to be bootstrapped once per AWS account/region
- The workflow handles this automatically

**❌ Build Failures**
- Check that all dependencies are correctly specified
- Verify TypeScript compilation passes locally

**❌ Deployment Timeout**
- CloudFormation operations can take several minutes
- The workflow has reasonable timeouts set

### Viewing Deployment Details

1. Click on the workflow run in the **Actions** tab
2. Expand the **Deploy to AWS** step to see detailed logs
3. Check the **Display deployment outputs** step for URLs
4. Download deployment artifacts for offline reference

## Local vs CI/CD Deployment

| Method | Use Case | Pros | Cons |
|--------|----------|------|------|
| `./deploy.sh` | Local development | Fast feedback | Requires local AWS setup |
| GitHub Actions | Production deployments | Consistent environment | Requires push to GitHub |

## Next Steps

Consider adding:
- **Pull request previews**: Deploy staging on every PR
- **Rollback workflow**: Quick revert to previous version
- **Health checks**: Verify deployment success
- **Notifications**: Slack/email alerts on deployment status
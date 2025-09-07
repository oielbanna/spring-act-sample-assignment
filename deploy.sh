#!/bin/bash

# Full-Stack Application Deployment Script
# Usage: ./deploy.sh [staging|production]

set -e

ENVIRONMENT=${1:-staging}

if [[ "$ENVIRONMENT" != "staging" && "$ENVIRONMENT" != "production" ]]; then
    echo "❌ Error: Environment must be either 'staging' or 'production'"
    echo "Usage: ./deploy.sh [staging|production]"
    exit 1
fi

echo "🚀 Deploying to $ENVIRONMENT environment..."

# Check prerequisites
echo "🔍 Checking prerequisites..."

if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not found. Please install AWS CLI and configure it."
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js."
    exit 1
fi

if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials not configured. Run 'aws configure' first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Build backend
echo "🔨 Building backend..."
cd backend
npm install
npm run build
cd ..

# Build frontend  
echo "🔨 Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Deploy infrastructure
echo "🏗️  Deploying infrastructure to AWS..."
cd cdk/cdk
npm install

# Bootstrap CDK if needed (only run once per account/region)
echo "🌱 Bootstrapping CDK (if needed)..."
npx cdk bootstrap || echo "CDK already bootstrapped"

# Deploy the stack
echo "🚀 Deploying CDK stack..."
npx cdk deploy \
    --context deploymentEnvironment=$ENVIRONMENT \
    --require-approval never \
    --outputs-file ../../outputs-$ENVIRONMENT.json

cd ../..

echo ""
echo "🎉 Deployment complete!"
echo ""

# Display outputs
if [[ -f "outputs-$ENVIRONMENT.json" ]]; then
    echo "📋 Deployment Information:"
    echo "=========================="
    
    WEBSITE_URL=$(cat outputs-$ENVIRONMENT.json | grep -o '"WebsiteURL-[^"]*":"[^"]*"' | cut -d'"' -f4)
    API_URL=$(cat outputs-$ENVIRONMENT.json | grep -o '"ApiURL-[^"]*":"[^"]*"' | cut -d'"' -f4)
    BUCKET_NAME=$(cat outputs-$ENVIRONMENT.json | grep -o '"BucketName-[^"]*":"[^"]*"' | cut -d'"' -f4)
    
    echo "🌐 Website URL: $WEBSITE_URL"
    echo "🔗 API URL: $API_URL"  
    echo "🪣 S3 Bucket: $BUCKET_NAME"
    echo ""
    echo "💡 Your application is now live!"
    echo "   Visit $WEBSITE_URL to see your app"
    echo ""
else
    echo "⚠️  Could not read deployment outputs. Check the CDK deployment logs above."
fi

echo "📚 For more information, see cdk/README.md"
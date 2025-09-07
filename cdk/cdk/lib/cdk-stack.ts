import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as path from 'path';

interface FullStackAppProps extends cdk.StackProps {
  deploymentEnvironment: 'staging' | 'production';
}

export class FullStackAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: FullStackAppProps) {
    super(scope, id, props);

    const { deploymentEnvironment } = props;
    
    // S3 Bucket for Frontend Static Website
    const websiteBucket = new s3.Bucket(this, `WebsiteBucket-${deploymentEnvironment}`, {
      bucketName: `fullstack-app-${deploymentEnvironment}-${cdk.Stack.of(this).account}`,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html',
      publicReadAccess: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS_ONLY,
      removalPolicy: deploymentEnvironment === 'production' ? cdk.RemovalPolicy.RETAIN : cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: deploymentEnvironment !== 'production',
    });

    // CloudFront Distribution for Frontend
    const distribution = new cloudfront.Distribution(this, `WebsiteDistribution-${deploymentEnvironment}`, {
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
      ],
    });

    // Lambda Function for Backend API
    const backendLambda = new lambda.Function(this, `BackendLambda-${deploymentEnvironment}`, {
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../backend/src/handler.ts')),
      environment: {
        NODE_ENV: deploymentEnvironment,
      },
      timeout: cdk.Duration.seconds(30),
    });

    // API Gateway for Lambda
    const api = new apigateway.RestApi(this, `BackendApi-${deploymentEnvironment}`, {
      restApiName: `fullstack-app-api-${deploymentEnvironment}`,
      description: `Backend API for fullstack app (${deploymentEnvironment})`,
      defaultCorsPreflightOptions: {
        allowOrigins: deploymentEnvironment === 'production' 
          ? [`https://${distribution.distributionDomainName}`]
          : apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key'],
      },
    });

    const lambdaIntegration = new apigateway.LambdaIntegration(backendLambda);
    
    // Add API Gateway routes - use proxy integration to handle all routes in Lambda
    const proxyResource = api.root.addProxy({
      defaultIntegration: lambdaIntegration,
      anyMethod: true, // TODO define specific routes
    });
    
    // Also handle root level requests
    api.root.addMethod('ANY', lambdaIntegration);

    // Deploy Frontend to S3
    new s3deploy.BucketDeployment(this, `WebsiteDeployment-${deploymentEnvironment}`, {
      sources: [s3deploy.Source.asset(path.join(__dirname, '../../frontend/build'))],
      destinationBucket: websiteBucket,
      distribution,
      distributionPaths: ['/*'],
    });

    // Outputs
    new cdk.CfnOutput(this, `WebsiteURL-${deploymentEnvironment}`, {
      value: `https://${distribution.distributionDomainName}`,
      description: `Frontend URL (${deploymentEnvironment})`,
    });

    new cdk.CfnOutput(this, `ApiURL-${deploymentEnvironment}`, {
      value: api.url,
      description: `Backend API URL (${deploymentEnvironment})`,
    });

    new cdk.CfnOutput(this, `BucketName-${deploymentEnvironment}`, {
      value: websiteBucket.bucketName,
      description: `S3 Bucket Name (${deploymentEnvironment})`,
    });
  }
}

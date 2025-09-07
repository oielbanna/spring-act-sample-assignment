#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { FullStackAppStack } from '../lib/cdk-stack';

const app = new cdk.App();

// Get deployment environment from context (default to staging)
const deploymentEnvironment = app.node.tryGetContext('deploymentEnvironment') || 'staging';

if (!['staging', 'production'].includes(deploymentEnvironment)) {
  throw new Error('deploymentEnvironment must be either "staging" or "production"');
}

new FullStackAppStack(app, `FullStackApp-${deploymentEnvironment}`, {
  deploymentEnvironment: deploymentEnvironment as 'staging' | 'production',
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  stackName: `fullstack-app-${deploymentEnvironment}`,
  description: `Full-stack application infrastructure for ${deploymentEnvironment} environment`,
});
import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as lambda from '@aws-cdk/aws-lambda';
import * as path from 'path';

export class InfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const vpc = new ec2.Vpc(this, 'my-lambda-vpc', {
      cidr: '10.0.0.0/16',
      natGateways: 1,
      maxAzs: 1,
    });

    const lambdaFunction = new lambda.Function(this, 'my-lambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE,
      },
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      handler: 'index.main',
      code: lambda.Code.fromAsset(path.join(__dirname, '/../app/my-lambda')),
    });
  }
}

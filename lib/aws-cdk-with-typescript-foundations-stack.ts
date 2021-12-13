import * as ec2 from '@aws-cdk/aws-ec2';
import * as cdk from '@aws-cdk/core';


export class AwsCdkWithTypescriptFoundationsStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);

      // TODO:
      // - create ec2 instance only = remove everything else
      // - localstack should only run ec2 server = nothing else to
      // - the program to run should just be hello world
      // https://hub.docker.com/_/hello-world

    // 👇 create VPC in which we'll launch the Instance
    const vpc = new ec2.Vpc(this, 'my-cdk-vpc', {
      cidr: '10.0.0.0/16',
      natGateways: 0,
      subnetConfiguration: [
        {name: 'public', cidrMask: 24, subnetType: ec2.SubnetType.PUBLIC},
      ],

    });

    const ec2Instance = new ec2.Instance(this, 'ec2-instance', {
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO,
      ),
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      keyName: 'ec2-key-pair', }
    );

    ec2Instance.addUserData(' CMD ["/hello"]');
    }
}

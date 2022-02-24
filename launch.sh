#!/bin/bash


echo 'Please enter name for new s3 bucket (must be unique)'

read s3bucketname
s3bucketname=${s3bucketname:-devops-project-steve}

echo $s3bucketname

aws s3 mb s3://$s3bucketname --region us-west-2

aws s3api put-bucket-versioning --bucket $s3bucketname --versioning-configuration Status=Enabled --region us-west-2

aws cloudformation package --s3-bucket $s3bucketname --template-file sam/api-template.yaml --output-template-file sam/gen/template-generated.yaml

aws cloudformation deploy --template-file sam/gen/template-generated.yaml --stack-name Serverless-Apps --capabilities CAPABILITY_IAM

aws cloudformation deploy --template-file create-ec2.yaml --stack-name Single-EC2-Instance --capabilities CAPABILITY_IAM

aws cloudformation deploy --template-file pipeline.yaml --stack-name CICD-Pipeline --capabilities CAPABILITY_IAM
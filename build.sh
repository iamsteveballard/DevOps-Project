#!/bin/bash

# clone github repo
# create codecommit repo
# git remote add cc <codecommit url>
# push to codecommit repo
# deploy sam apps
# launch ec2 instance
# launch pipeline

# echo Hello, who am I talking to?
# read varname
# echo It\'s nice to meet you $varname

echo 'creating CodeCommit Repository'

aws cloudformation deploy --template-file create-repo.yml --stack-name create-repo

echo 'open cloudformation console, select the create-repo stack'
echo 'navigate to outputs and copy the CloneRepoUrl'
echo 'git remote add cc <CloneRepoUrl>'
echo 'git push cc master'


echo 'Please enter name for new s3 bucket (must be unique)'

read s3bucketname
s3bucketname=${s3bucketname:-devops-project-steve}

echo $s3bucketname

aws s3 mb s3://$s3bucketname --region us-west-2

aws s3api put-bucket-versioning --bucket $s3bucketname --versioning-configuration Status=Enabled --region us-west-2

# aws cloudformation package --s3-bucket $s3bucketname --template-file sam/api-template.yaml --output-template-file sam/gen/template-generated.yaml

# aws cloudformation deploy --template-file sam/gen/template-generated.yaml --stack-name create-serverless --capabilities CAPABILITY_IAM

# aws cloudformation deploy --template-file create-ec2.yaml --stack-name create-ec2 --capabilities CAPABILITY_IAM

# aws cloudformation deploy --template-file pipeline.yaml --stack-name create-pipeline --capabilities CAPABILITY_IAM




# aws cloudformation package --s3-bucket devops-project-steve --template-file sam/api-template.yaml --output-template-file sam/gen/template-generated.yaml



# sam package --s3-bucket s3://$s3bucketname --template-file sam/api-template.yaml --output-template-file gen/template-generated.yaml
# sam deploy --template-file sam/gen/template-generated.yaml --stack-name sam-test-app --capabilities CAPABILITY_IAM
# sam deploy --template-file create-ec2.yaml --stack-name create-ec2 --capabilities CAPABILITY_IAM
# sam deploy --template-file pipeline.yaml --stack-name pipeline1-stack --capabilities CAPABILITY_IAM





# aws s3 mb s3://devops-project-steve

# sam package --s3-bucket  --template-file api-template.yaml --output-template-file gen/template-generated.yaml

# sam deploy --template-file gen/template-generated.yaml --stack-name sam-test-app --capabilities CAPABILITY_IAM

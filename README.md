# DevOps-Project

Prerequisites: 

AWS CLI installed
AWS profile configured

Note: Everything is run from AWS::Region us-west-2

Step 1: Clone Repository

Run command:
  git clone https://github.com/iamsteveballard/DevOps-Project.git

Step 2: Create a new CodeCommit Repository

Run command:
  aws cloudformation deploy --template-file create-repo.yml --stack-name create-repo

Step 3: Add new CodeCommit Repo as a remote branch

Navigate to AWS CloudFormation console under Stacks https://us-west-2.console.aws.amazon.com/cloudformation/home
Navigate to the Outputs section in the create-repo stack
Copy the CloneRepoUrl

Run commands:
  git remote add cc <CloneRepoUrl>
  git add .
  git commit -m "first upload to CodeCommit repo"
  git push cc master


Then run launch.sh bash script. Will take a while, head to the AWS CloudFormation console to follow along with the progress.

Windows Command:
    bash launch.sh

Linux Command:
    ./launch.sh
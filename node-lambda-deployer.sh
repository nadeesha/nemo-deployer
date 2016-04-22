node-lambda setup
node-lambda deploy -a $AWS_ACCESS_KEY -s $AWS_SECRET_KEY -n nemo-plugin-github -m 128 -t 20 -u nodejs -o arn:aws:iam::637913445463:role/lambda-deployer
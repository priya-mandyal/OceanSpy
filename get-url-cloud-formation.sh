#!/bin/bash

# Ensure you have the necessary environment variable for AWS CLI
if [ -z "$STACK_NAME" ]; then
  echo "STACK_NAME environment variable is not set."
  exit 1
fi

# Retrieve the output values using AWS CLI
SUBSCRIBE_API_URL=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --query "Stacks[0].Outputs[?OutputKey=='SubscribeApiGatewayInvokeUrl'].OutputValue" --output text)
UPLOAD_IMAGE_API_URL=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --query "Stacks[0].Outputs[?OutputKey=='UploadImageApiGatewayInvokeUrl'].OutputValue" --output text)

# Save the URLs to a .env file
echo "VITE_SUBSCRIBE_API_URL=${SUBSCRIBE_API_URL}" > .env
echo "VITE_UPLOAD_IMAGE_API_URL=${UPLOAD_IMAGE_API_URL}" >> .env

echo "API URLs have been saved to .env file."

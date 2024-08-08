#!/bin/bash

if [ -z "$STACK_NAME" ]; then
  echo "STACK_NAME environment variable is not set."
  exit 1
fi

SUBSCRIBE_API_URL=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --query "Stacks[0].Outputs[?OutputKey=='SubscribeApiGatewayInvokeUrl'].OutputValue" --output text)
UPLOAD_IMAGE_API_URL=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --query "Stacks[0].Outputs[?OutputKey=='UploadImageApiGatewayInvokeUrl'].OutputValue" --output text)

echo "VITE_SUBSCRIBE_API_URL=${SUBSCRIBE_API_URL}" > .env
echo "VITE_UPLOAD_IMAGE_API_URL=${UPLOAD_IMAGE_API_URL}" >> .env

echo "API URLs have been saved to .env file."

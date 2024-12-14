#!/bin/bash
REGION="us-east-1"
STACK_NAME="test" 

SUBSCRIBE_API_URL=$(aws cloudformation describe-stacks --stack-name "$STACK_NAME" --region $REGION --query "Stacks[0].Outputs[?OutputKey=='SubscribeApiGatewayInvokeUrl'].OutputValue" --output text)

UPLOAD_IMAGE_API_URL=$(aws cloudformation describe-stacks --stack-name "$STACK_NAME" --region $REGION --query "Stacks[0].Outputs[?OutputKey=='UploadImageApiGatewayInvokeUrl'].OutputValue" --output text)

if [[ -z "$SUBSCRIBE_API_URL" || -z "$UPLOAD_IMAGE_API_URL" ]]; then
  echo "Error: One or both API URLs could not be fetched."
  exit 1
fi

echo "VITE_SUBSCRIBE_API_URL=${SUBSCRIBE_API_URL}" > .env
echo "VITE_UPLOAD_IMAGE_API_URL=${UPLOAD_IMAGE_API_URL}" >> .env

echo "API URLs have been saved to .env file."

#!/bin/bash
REGION="us-east-1"
STACK_NAME="test"  # Replace this with your stack name or pass it as an environment variable

# Fetch the Subscribe API URL
SUBSCRIBE_API_URL=$(aws cloudformation describe-stacks --stack-name "$STACK_NAME" --region $REGION --query "Stacks[0].Outputs[?OutputKey=='SubscribeApiGatewayInvokeUrl'].OutputValue" --output text)

# Fetch the Upload Image API URL
UPLOAD_IMAGE_API_URL=$(aws cloudformation describe-stacks --stack-name "$STACK_NAME" --region $REGION --query "Stacks[0].Outputs[?OutputKey=='UploadImageApiGatewayInvokeUrl'].OutputValue" --output text)

# Check if the URLs are not empty
if [[ -z "$SUBSCRIBE_API_URL" || -z "$UPLOAD_IMAGE_API_URL" ]]; then
  echo "Error: One or both API URLs could not be fetched."
  exit 1
fi

# Save the API URLs to the .env file
echo "VITE_SUBSCRIBE_API_URL=${SUBSCRIBE_API_URL}" > .env
echo "VITE_UPLOAD_IMAGE_API_URL=${UPLOAD_IMAGE_API_URL}" >> .env

echo "API URLs have been saved to .env file."

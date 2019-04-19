export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-2",
    BUCKET: "gardening-app-uploads"
  },
  apiGateway: {
    REGION: "us-east-2",
    URL: "https://5pbuwftdf0.execute-api.us-east-2.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_SfVv4kdy6",
    APP_CLIENT_ID: "5r4f479rc680q722g3512do4ha",
    IDENTITY_POOL_ID: "us-east-2:72ca97a1-d2bb-40d3-b825-4d7223c48c3e"
  }
};

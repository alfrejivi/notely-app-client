const dev = {
    STRIPE_KEY: process.env.REACT_APP_STRIPE_KEY_DEV || "pk_test_0oGdmhKTPdNWSPAgJ4RCEslh00rdZ0pH0F",
    s3: {
        REGION: process.env.REACT_APP_AWS_S3_REGION_DEV || "eu-west-1",
        BUCKET: process.env.REACT_APP_AWS_S3_BUCKET_DEV || "notely-app-2-api-dev-attachmentsbucket-5pkzyn0882xj"
    },
    apiGateway: {
        REGION: process.env.REACT_APP_AWS_API_GATEWAY_REGION_DEV || "eu-west-1",
        URL: process.env.REACT_APP_AWS_API_GATEWAY_URL_DEV || "https://w3bigjvfr2.execute-api.eu-west-1.amazonaws.com/dev"
    },
    cognito: {
        REGION: process.env.REACT_APP_AWS_COGNITO_REGION_DEV || "eu-west-1",
        USER_POOL_ID: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID_DEV || "eu-west-1_z3aA1RU2X",
        APP_CLIENT_ID: process.env.REACT_APP_AWS_COGNITO_APP_CLIENT_ID_DEV || "4demj3j4veilka1bvvq3avabeh",
        IDENTITY_POOL_ID: process.env.REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID_DEV || "eu-west-1:32b733de-e457-4edd-8bfc-c002bb8e5bba"
    }
};

const prod = {
    STRIPE_KEY: process.env.REACT_APP_STRIPE_KEY_PROD,
    s3: {
        REGION: process.env.REACT_APP_AWS_S3_REGION_PROD,
        BUCKET: process.env.REACT_APP_AWS_S3_BUCKET_PROD
    },
    apiGateway: {
        REGION: process.env.REACT_APP_AWS_API_GATEWAY_REGION_PROD,
        URL: process.env.REACT_APP_AWS_API_GATEWAY_URL_PROD
    },
    cognito: {
        REGION: process.env.REACT_APP_AWS_COGNITO_REGION_PROD,
        USER_POOL_ID: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID_PROD,
        APP_CLIENT_ID: process.env.REACT_APP_AWS_COGNITO_APP_CLIENT_ID_PROD,
        IDENTITY_POOL_ID: process.env.REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID_PROD
    }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
    ? prod
    : dev;

export default {
    // Add common config values here
    MAX_ATTACHMENT_SIZE: 5000000,
    ...config
};
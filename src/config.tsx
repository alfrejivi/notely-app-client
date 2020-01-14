const dev = {
    STRIPE_KEY: "sk_test_dxktu2gCMuWsmnTMi46qFOz300vXBFBYu6",
    s3: {
        REGION: "eu-west-1",
        BUCKET: "notely-app-2-api-dev-attachmentsbucket-5pkzyn0882xj"
    },
    apiGateway: {
        REGION: "eu-west-1",
        URL: "https://w3bigjvfr2.execute-api.eu-west-1.amazonaws.com/dev"
    },
    cognito: {
        REGION: "eu-west-1",
        USER_POOL_ID: "eu-west-1_z3aA1RU2X",
        APP_CLIENT_ID: "4demj3j4veilka1bvvq3avabeh",
        IDENTITY_POOL_ID: "eu-west-1:32b733de-e457-4edd-8bfc-c002bb8e5bba"
    }
};

const prod = {
    STRIPE_KEY: "sk_test_dxktu2gCMuWsmnTMi46qFOz300vXBFBYu6",
    s3: {
        REGION: "eu-west-1",
        BUCKET: "notely-app-2-api-prod-attachmentsbucket-ndco2t0yr884"
    },
    apiGateway: {
        REGION: "eu-west-1",
        URL: "https://mk7ukv6jf3.execute-api.eu-west-1.amazonaws.com/prod"
    },
    cognito: {
        REGION: "eu-west-1",
        USER_POOL_ID: "eu-west-1_saaMTrYfk",
        APP_CLIENT_ID: "5l1tbfvksp2rj21eo31e88d067",
        IDENTITY_POOL_ID: "eu-west-1:e852daf1-53a5-423b-9fc2-fe97af762b92"
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
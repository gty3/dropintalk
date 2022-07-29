import { Amplify } from 'aws-amplify'

try {
  Amplify.configure({
    Auth: {
      region: process.env.NEXT_PUBLIC_REGION,
      identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID,
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
      userPoolWebClientId: process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT_ID,
    },
    API: {
      endpoints: [{ 
        name: process.env.NEXT_PUBLIC_APIGATEWAY_NAME, 
        endpoint: process.env.NEXT_PUBLIC_API_URL,
      }]
    },
  })
} catch (err) {
  console.log('amplifyConfigErr', err)
}

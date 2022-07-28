import { StackContext, NextjsSite, Api, Table, Auth } from "@serverless-stack/resources";

export function MyStack({ stack }: StackContext) {

  const auth = new Auth(stack, "Auth", {
    login: ["email"],
  })

  const emailsTable = new Table(stack, 'EmailsTable', {
    fields: {
      email: "string"
    },
    primaryIndex: { partitionKey: "email" }
  })

  const api = new Api(stack, "Api", {
    routes: {
      "POST /mailer": {
        function: {
         handler: "functions/mailer.handler",
         environment: {
          EMAILS_TABLE: emailsTable.tableName
         },
        },
        authorizer: "iam"
      },
    }
  })

  auth.attachPermissionsForUnauthUsers(stack, [api])

  api.attachPermissions([emailsTable])

  new NextjsSite(stack, "NextSite", {
    path: "frontend",
    environment: {
      NEXT_PUBLIC_API_URL: api.url,
      NEXT_PUBLIC_APIGATEWAY_NAME: api.httpApiId,
      NEXT_PUBLIC_COGNITO_USER_POOL_ID: auth.userPoolId,
      NEXT_PUBLIC_COGNITO_APP_CLIENT_ID: auth.userPoolClientId,
      NEXT_PUBLIC_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId ?? "",
      NEXT_PUBLIC_REGION: stack.region
    }
  })

  stack.addOutputs({
    ApiEndpoint: api.url,
    table: emailsTable.tableName
  })

}

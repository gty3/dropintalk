import { DynamoDB, SES } from "aws-sdk"
import { APIGatewayProxyHandlerV2 } from "aws-lambda"
const dynamoDb = new DynamoDB.DocumentClient()
const ses = new SES({ region: 'us-east-1' })

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  console.log("emailsTable", process.env.EMAILS_TABLE)
  if (!event.body) {
    return {
      statusCode: 500,
      body: "No event body",
    }
  }
  if (!process.env.EMAILS_TABLE) {
    return {
      statusCode: 500,
      body: "No table env",
    }
  }

  const { emailAddress }: { emailAddress: string } = JSON.parse(event.body)

  const newEmailParams = {
    Item: { email: emailAddress },
    TableName: process.env.EMAILS_TABLE,
  }
  await dynamoDb.put(newEmailParams).promise()

  const emailParams = {
    Destination: {
      ToAddresses: process.env.
    },
    Message: {
      Body: {
        Text:
          { Data: `open phone ${url}/receiver` }
      },
      Subject: { Data: "Someone is contacting you on Talktree" }
    },
    Source: "Talktree <noreply@talktree.me>"
  }

  const sendEmail = ses.sendEmail(emailParams).promise()

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: "success",
  }
}

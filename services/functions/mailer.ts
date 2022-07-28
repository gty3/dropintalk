import { DynamoDB } from 'aws-sdk'
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
const dynamoDb = new DynamoDB.DocumentClient()

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  console.log('emailsTable', process.env.emailsTable)
  if (!event.body) {
    return {
      statusCode: 500,
      body: 'No event body'
    }
  } 
  if (!process.env.emailsTable) {
    return {
      statusCode: 500,
      body: 'No table env'
    }
  }

  const { emailAddress }: { emailAddress: string } = JSON.parse(event.body)

  const newEmailParams = {
    Item: { email: emailAddress },
    TableName: process.env.emailsTable
  }
  await dynamoDb.put(newEmailParams).promise()

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: 'success'
  }
}

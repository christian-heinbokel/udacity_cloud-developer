import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { deleteTodo } from '../../helpers/todos'
import { createLogger } from '../../utils/logger'

const logger = createLogger('deleteTodo')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('Processing event to delete a todo: ', event)

    const todoId = event.pathParameters.todoId
    const authorizationHeader = event.headers.Authorization
    const jwtToken = authorizationHeader.split(' ')[1]

    await deleteTodo(todoId, jwtToken)

    return {
      statusCode: 204,
      body: ''
    }
  }
)

handler.use(httpErrorHandler()).use(
  cors({
    credentials: true
  })
)

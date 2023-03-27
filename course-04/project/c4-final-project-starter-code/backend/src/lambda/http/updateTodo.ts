import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { updateTodo } from '../../businessLogic/todos'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { createLogger } from '../../utils/logger'

const logger = createLogger('updateTodo')

// DONE: Update a TODO item with the provided id using values in the "updatedTodo" object
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('Processing event to update a todo: ', event)

    const todoId = event.pathParameters.todoId
    const authorizationHeader = event.headers.Authorization
    const jwtToken = authorizationHeader.split(' ')[1]

    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

    const updatedTodoItem = await updateTodo(todoId, updatedTodo, jwtToken)

    return {
      statusCode: 204,
      body: JSON.stringify({
        item: updatedTodoItem
      })
    }
  }
)

handler.use(httpErrorHandler()).use(
  cors({
    credentials: true
  })
)

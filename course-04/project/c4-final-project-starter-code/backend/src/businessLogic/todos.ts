import { TodosAccess } from '../persistenceLayer/todosAcess'
// import { AttachmentUtils } from '../helpers/attachmentUtils'
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import { parseUserId } from '../auth/utils'
import * as uuid from 'uuid'
import * as createError from 'http-errors'

const todosAccess = new TodosAccess()
// const attachmentUtils = new AttachmentUtils()
const logger = createLogger('todos')

export async function getAllTodos(jwtToken: string): Promise<TodoItem[]> {
  const userId = parseUserId(jwtToken)
  return todosAccess.getAllTodos(userId)
}

export async function createTodo(
  createTodoRequest: CreateTodoRequest,
  jwtToken: string
): Promise<TodoItem> {
  const todoId = uuid.v4()
  const userId = parseUserId(jwtToken)
  const createdAt = new Date().toISOString()

  // create a new todo item
  const newTodo: TodoItem = {
    userId,
    todoId,
    createdAt,
    done: false,
    ...createTodoRequest
  }
  logger.info('Creating a new todo item', newTodo)
  return todosAccess.createTodoItem(newTodo)
}

export async function updateTodo(
  todoId: string,
  updateTodoRequest: UpdateTodoRequest,
  jwtToken: string
): Promise<void> {
  const userId = parseUserId(jwtToken)
  const todoItem = await todosAccess.getTodoItem(todoId, userId)
  if (!todoItem) {
    throw new createError.NotFound(`Todo item with id ${todoId} not found`)
  }
  logger.info('Updating a todo item', todoItem)

  await todosAccess.updateTodoItem(todoId, userId, updateTodoRequest)
}

export async function deleteTodo(
  todoId: string,
  jwtToken: string
): Promise<void> {
  const userId = parseUserId(jwtToken)
  const todoItem = await todosAccess.getTodoItem(todoId, userId)
  if (!todoItem) {
    throw new createError.NotFound(`Todo item with id ${todoId} not found`)
  }
  logger.info('Deleting a todo item', todoItem)
  await todosAccess.deleteTodoItem(todoId, userId)
}

export async function setAttachmentUrl(
  todoId: string,
  attachmentUrl: string,
  jwtToken: string
): Promise<void> {
  const userId = parseUserId(jwtToken)
  const todoItem = await todosAccess.getTodoItem(todoId, userId)
  if (!todoItem) {
    throw new createError.NotFound(`Todo item with id ${todoId} not found`)
  }
  logger.info('Setting attachment url for a todo item', todoItem)
  await todosAccess.updateTodoAttachmentUrl(todoId, userId, attachmentUrl)
}

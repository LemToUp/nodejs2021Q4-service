import { FastifyPluginAsync } from 'fastify';
import { response } from '../../common/response';
import { TaskModel } from './task.model';
import {TaskService} from './task.service';
/**
 * @description Tasks CRUD routes
 * @param fastify FastifyInstance
 *
 * @remarks GET / - list
 * @remarks GET /:taskId - one board
 * @remarks POST / - create
 * @remarks PUT /:taskId - update
 * @remarks DELETE /:taskId - delete
 */
export const taskRoute:FastifyPluginAsync = async (fastify) => {
  const taskService = new TaskService();
  /**
   * @description Get Tasks list
   * @param req FastifyRequest
   * @param res FastifyReply
   *
   * @return Response array of TaskModels
   */
  fastify.get('/', {
    preValidation: [ fastify.authenticate ],
    schema: {
      querystring: {
        boardId: { type: 'string' },
      }
    }
  }, async (req, res) => {
    const { boardId } = req.params as { boardId: string };
    const tasks = await taskService.getByBoardId(boardId);
    // map task fields to exclude secret fields like "password"
    return response(res, tasks.map(TaskModel.toResponse));
  })
  /**
   * @description Get Task by Id
   * @param req FastifyRequest
   * @param res FastifyReply
   *
   * @return Response TaskModel | 404
   */
  fastify.get('/:taskId', {
    preValidation: [ fastify.authenticate ],
    schema: {
      querystring: {
        taskId: { type: 'string' },
      }
    }
  }, async (req, res) => {
    const { taskId } = req.params as { taskId: string };
    const task = await taskService.get(taskId);
    // map task fields to exclude secret fields like "password"
    return task ? response(res, TaskModel.toResponse(task)) : response(res,'Task not found', 404);
  })
  /**
   * @description Create Task
   * @param req FastifyRequest
   * @param res FastifyReply
   *
   * @return Response created TaskModel
   */
  fastify.post('/', {
    preValidation: [ fastify.authenticate ],
    schema: {
      querystring: {
        boardId: { type: 'string' },
      }
    }
  }, async (req, res) => {
    const { boardId } = req.params as { boardId: string };
    const { title, order, description, userId, columnId } = req.body as { title: string, order: number, description: string, userId: string, columnId: string };
    const task = await taskService.create(title, order, description, userId, boardId, columnId);

    return task ? response(res, TaskModel.toResponse(task), 201) : response(res,'Task not created', 400);
  })
  /**
   * @description Update Task by id
   * @param req FastifyRequest
   * @param res FastifyReply
   *
   * @return Response updated TaskModel
   */
  fastify.put('/:taskId', {
    preValidation: [ fastify.authenticate ],
    schema: {
      querystring: {
        taskId: { type: 'string' },
        boardId: { type: 'string' },
      }
    }
  }, async (req, res) => {
    const { taskId } = req.params as { taskId: string };
    const { title, order, description, userId, boardId, columnId } = req.body as { title: string, order: number, description: string, userId: string, boardId: string, columnId: string };
    const task = await taskService.updateById(taskId, title, order, description, userId, boardId, columnId);

    return response(res, task ? TaskModel.toResponse(task) : 'Not found', task ? 200 : 404);
  })
  /**
   * @description Delete Task by id
   * @param req FastifyRequest
   * @param res FastifyReply
   *
   * @return Response deleted TaskModel
   */
  fastify.delete('/:taskId', {
    preValidation: [ fastify.authenticate ],
    schema: {
      querystring: {
        taskId: { type: 'string' },
        boardId: { type: 'string' },
      }
    }
  }, async (req, res) => {
    const { taskId } = req.params as { taskId: string };
    const task = await taskService.remove(taskId);
    // map task fields to exclude secret fields like "password"
    return task ? response(res, TaskModel.toResponse(task)) : response(res,'Task not found', 404);
  })
}

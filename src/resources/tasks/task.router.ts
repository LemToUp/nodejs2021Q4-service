import {FastifyPluginAsync} from "fastify";
import { response } from "../../common/response";
import { TaskModel } from "./task.model";
import * as tasksService from './task.service';
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
  fastify.get('/', {
    schema: {
      querystring: {
        boardId: { type: 'string' },
      }
    }

  }, async (req, res) => {
    const { boardId } = req.params as { boardId: string };
    const tasks = await tasksService.getByBoardId(boardId);
    // map task fields to exclude secret fields like "password"
    return response(res, tasks.map(TaskModel.toResponse));
  })

  fastify.get('/:taskId', {
    schema: {
      querystring: {
        taskId: { type: 'string' },
      }
    }
  }, async (req, res) => {
    const { taskId } = req.params as { taskId: string };
    const task = await tasksService.get(taskId);
    // map task fields to exclude secret fields like "password"
    return task ? response(res, TaskModel.toResponse(task)) : response(res,'Task not found', 404);
  })

  fastify.post('/', {
    schema: {
      querystring: {
        boardId: { type: 'string' },
      }
    }
  }, async (req, res) => {
    const { boardId } = req.params as { boardId: string };
    const { title, order, description, userId, columnId } = req.body as { title: string, order: string, description: string, userId: string, columnId: string };
    const task = await tasksService.create(title, order, description, userId, boardId, columnId);

    return response(res, TaskModel.toResponse(task), 201);
  })

  fastify.put('/:taskId', {
    schema: {
      querystring: {
        taskId: { type: 'string' },
        boardId: { type: 'string' },
      }
    }
  }, async (req, res) => {
    const { taskId } = req.params as { taskId: string };
    const { title, order, description, userId, boardId, columnId } = req.body as { title: string, order: string, description: string, userId: string, boardId: string, columnId: string };
    const task = await tasksService.updateById(taskId, title, order, description, userId, boardId, columnId);

    return response(res, task ? TaskModel.toResponse(task) : 'Not found', task ? 200 : 404);
  })

  fastify.delete('/:taskId', {
    schema: {
      querystring: {
        taskId: { type: 'string' },
        boardId: { type: 'string' },
      }
    }
  }, async (req, res) => {
    const { taskId } = req.params as { taskId: string };
    const task = await tasksService.remove(taskId);
    // map task fields to exclude secret fields like "password"
    return task ? response(res, TaskModel.toResponse(task)) : response(res,'Task not found', 404);
  })
}

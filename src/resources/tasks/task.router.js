const Task = require('./task.model');
const tasksService = require('./task.service');
const response = require('../../common/response')

module.exports = async (fastify) => {
  fastify.get('/', {
    schema: {
      querystring: {
        boardId: { type: 'string' },
      }
    }

  }, async (req, res) => {
    const {boardId} = req.params;
    const tasks = await tasksService.getByBoardId(boardId);
    // map task fields to exclude secret fields like "password"
    return response(res, tasks.map(Task.toResponse));
  })

  fastify.get('/:taskId', {
    schema: {
      querystring: {
        taskId: { type: 'string' },
        boardId: { type: 'string' },
      }
    }
  }, async (req, res) => {
    const task = await tasksService.get(req.params.taskId, req.params.boardId);
    // map task fields to exclude secret fields like "password"
    return task ? response(res, Task.toResponse(task)) : response(res,'Task not found', 404);
  })

  fastify.post('/', {
    schema: {
      querystring: {
        boardId: { type: 'string' },
      }
    }
  }, async (req, res) => {
    const {boardId} = req.params;
    const { title, order, description, userId, columnId } = req.body;
    const task = await tasksService.create(title, order, description, userId, boardId, columnId);

    return response(res, Task.toResponse(task), 201);
  })

  fastify.put('/:taskId', {
    schema: {
      querystring: {
        taskId: { type: 'string' },
        boardId: { type: 'string' },
      }
    }
  }, async (req, res) => {
    const { title, order, description, userId, boardId, columnId } = req.body;
    const task = await tasksService.updateById(req.params.taskId, title, order, description, userId, boardId, columnId);

    return response(res, Task.toResponse(task));
  })

  fastify.delete('/:taskId', {
    schema: {
      querystring: {
        taskId: { type: 'string' },
        boardId: { type: 'string' },
      }
    }
  }, async (req, res) => {
    const task = await tasksService.remove(req.params.taskId);
    // map task fields to exclude secret fields like "password"
    return task ? response(res, Task.toResponse(task)) : response(res,'Task not found', 404);
  })

}

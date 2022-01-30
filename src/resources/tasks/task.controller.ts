import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskModel } from './task.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


// /**
//  * @description Tasks CRUD routes
//  * @param fastify FastifyInstance
//  *
//  * @remarks GET / - list
//  * @remarks GET /:taskId - one board
//  * @remarks POST / - create
//  * @remarks PUT /:taskId - update
//  * @remarks DELETE /:taskId - delete
//  */
// export const taskRoute:FastifyPluginAsync = async (fastify) => {
//   const taskService = new TaskService();
//   /**
//    * @description Get Tasks list
//    * @param req FastifyRequest
//    * @param res FastifyReply
//    *
//    * @return Response array of TaskModels
//    */
//   fastify.get('/', {
//     preValidation: [ fastify.authenticate ],
//     schema: {
//       querystring: {
//         boardId: { type: 'string' },
//       }
//     }
//   }, async (req, res) => {
//     const { boardId } = req.params as { boardId: string };
//     const tasks = await taskService.getByBoardId(boardId);
//     // map task fields to exclude secret fields like "password"
//     return response(res, tasks.map(TaskModel.toResponse));
//   })
//   /**
//    * @description Get Task by Id
//    * @param req FastifyRequest
//    * @param res FastifyReply
//    *
//    * @return Response TaskModel | 404
//    */
//   fastify.get('/:taskId', {
//     preValidation: [ fastify.authenticate ],
//     schema: {
//       querystring: {
//         taskId: { type: 'string' },
//       }
//     }
//   }, async (req, res) => {
//     const { taskId } = req.params as { taskId: string };
//     const task = await taskService.get(taskId);
//     // map task fields to exclude secret fields like "password"
//     return task ? response(res, TaskModel.toResponse(task)) : response(res,'Task not found', 404);
//   })
//   /**
//    * @description Create Task
//    * @param req FastifyRequest
//    * @param res FastifyReply
//    *
//    * @return Response created TaskModel
//    */
//   fastify.post('/', {
//     preValidation: [ fastify.authenticate ],
//     schema: {
//       querystring: {
//         boardId: { type: 'string' },
//       }
//     }
//   }, async (req, res) => {
//     const { boardId } = req.params as { boardId: string };
//     const { title, order, description, userId, columnId } = req.body as { title: string, order: number, description: string, userId: string, columnId: string };
//     const task = await taskService.create(title, order, description, userId, boardId, columnId);
//
//     return task ? response(res, TaskModel.toResponse(task), 201) : response(res,'Task not created', 400);
//   })
//   /**
//    * @description Update Task by id
//    * @param req FastifyRequest
//    * @param res FastifyReply
//    *
//    * @return Response updated TaskModel
//    */
//   fastify.put('/:taskId', {
//     preValidation: [ fastify.authenticate ],
//     schema: {
//       querystring: {
//         taskId: { type: 'string' },
//         boardId: { type: 'string' },
//       }
//     }
//   }, async (req, res) => {
//     const { taskId } = req.params as { taskId: string };
//     const { title, order, description, userId, boardId, columnId } = req.body as { title: string, order: number, description: string, userId: string, boardId: string, columnId: string };
//     const task = await taskService.updateById(taskId, title, order, description, userId, boardId, columnId);
//
//     return response(res, task ? TaskModel.toResponse(task) : 'Not found', task ? 200 : 404);
//   })
//   /**
//    * @description Delete Task by id
//    * @param req FastifyRequest
//    * @param res FastifyReply
//    *
//    * @return Response deleted TaskModel
//    */
//   fastify.delete('/:taskId', {
//     preValidation: [ fastify.authenticate ],
//     schema: {
//       querystring: {
//         taskId: { type: 'string' },
//         boardId: { type: 'string' },
//       }
//     }
//   }, async (req, res) => {
//     const { taskId } = req.params as { taskId: string };
//     const task = await taskService.remove(taskId);
//     // map task fields to exclude secret fields like "password"
//     return task ? response(res, TaskModel.toResponse(task)) : response(res,'Task not found', 404);
//   })
// }

@Controller('boards/:boardId/tasks')
export class TaskController {
    constructor(private taskService: TaskService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Param('boardId') boardId: string) {
        const tasks = await this.taskService.getByBoardId(boardId);
        // map task fields to exclude secret fields like "password"
        return tasks.map(TaskModel.toResponse);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':taskId')
    async findOne(@Param('taskId') taskId: string) {
        const task = await this.taskService.get(taskId);

        if (!task) throw new HttpException('Task not found', 404);
        // map task fields to exclude secret fields like "password"
        return TaskModel.toResponse(task);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Param('boardId') boardId: string, @Body() body: { title: string, order: number, description: string, userId: string, columnId: string }) {
        const {
            title,
            order,
            description,
            userId,
            columnId
        } = body as { title: string, order: number, description: string, userId: string, columnId: string };
        const task = await this.taskService.create(title, order, description, userId, boardId, columnId);

        if (!task) throw new HttpException('Task not created', 400);

        return TaskModel.toResponse(task);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':taskId')
    async update(@Param('taskId') taskId: string, @Body() body: { title: string, order: number, description: string, userId: string, boardId: string, columnId: string }) {
        const { title, order, description, userId, boardId, columnId } = body;
        const task = await this.taskService.updateById(taskId, title, order, description, userId, boardId, columnId);

        if (!task) throw new HttpException('Task not found', 404);

        return TaskModel.toResponse(task);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':taskId')
    async delete(@Param('taskId') taskId: string) {
    const task = await this.taskService.remove(taskId);

    if (!task) throw new HttpException('Task not found', 404);
    // map task fields to exclude secret fields like "password"
    return TaskModel.toResponse(task);
    }
}

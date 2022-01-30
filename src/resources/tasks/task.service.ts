import {getCustomRepository} from 'typeorm';
import {TaskRepository} from './task.repository';
import {TaskModel} from './task.model';
import {UserService} from '../users/user.service';
import {BoardService} from '../boards/board.service';
import {ColumnService} from '../column/column.service';

export class TaskService {
    taskRepository: TaskRepository = getCustomRepository(TaskRepository);

    userService: UserService = new UserService();

    boardService: BoardService = new BoardService();

    columnService: ColumnService = new ColumnService();

    getByBoardId(boardId: string) {
        const board = this.boardService.get(boardId);

        return this.taskRepository.find({
            where: { board },
            relations: ['user', 'board', 'column']
        })
    };

    get(id: string) {
        return this.taskRepository.findOne({
            where: { id },
            relations: ['user', 'board', 'column']
        })
    };

    async create(title: string, order: number, description: string, userId: string, boardId: string, columnId: string) {
        const taskModel = new TaskModel();

        taskModel.title = title;
        taskModel.order = order;
        taskModel.description = description;

        const userModel = userId ? await this.userService.get(userId) : false;
        if (userModel) {
            taskModel.user = userModel;
        }

        const boardModel = boardId ? await this.boardService.get(boardId) : false;
        if (boardModel) {
            taskModel.board = boardModel;
        }

        const columnModel = columnId ? await this.columnService.get(columnId) : false;

        if (columnModel) {
            taskModel.column = columnModel;
        }

        const createdModel = await this.taskRepository.save(taskModel);

        return createdModel.id ? this.get(createdModel.id) : false;
    }

    async updateById(
        id: string,
        title: string|undefined = undefined,
        order: number|undefined = undefined,
        description: string|undefined = undefined,
        userId: string|undefined = undefined,
        boardId: string|undefined = undefined,
        columnId: string|undefined = undefined
    ) {
        const taskModel = await this.get(id);

        if (taskModel) {
            const user = userId ? await this.userService.get(userId) : undefined;
            const board = boardId ? await this.boardService.get(boardId): undefined;
            const column = columnId ? await this.columnService.get(columnId): undefined;

            await this.taskRepository.update(id, {
                title: title || taskModel.title,
                order: order || taskModel.order,
                description: description || taskModel.description,
                user: user || taskModel.user,
                board: board || taskModel.board,
                column: column || taskModel.column,
            })

            return this.get(id);
        }

        return false;
    }

    async remove(id: string) {
        const taskModel = await this.get(id);
        await this.taskRepository.delete(id);

        return taskModel;
    };
}

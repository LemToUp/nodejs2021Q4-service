import {FastifyPluginAsync} from "fastify";
import { response } from "../../common/response";
import { BoardModel } from "./board.model";
import * as boardsService from './board.service';

/**
 * @description Boards CRUD routes
 * @param fastify FastifyInstance
 *
 * @remarks GET / - list
 * @remarks GET /:boardId - one board
 * @remarks POST / - create
 * @remarks PUT /:boardId - update
 * @remarks DELETE /:boardId - delete
 */
export const boardRoute:FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async (req, res) => {
    const boards = await boardsService.getAll();
    // map board fields to exclude secret fields like "password"
    return response(res, boards.map(BoardModel.toResponse));
  })

  fastify.get('/:boardId', {
    schema: {
      querystring: {
        boardId: { type: 'string' },
      }
    }
  }, async (req, res) => {
    const { boardId } = req.params as { boardId: string };
    const board = await boardsService.get(boardId);
    // map board fields to exclude secret fields like "password"
    return board ? response(res, BoardModel.toResponse(board)) : response(res,'Board not found', 404);
  })

  fastify.post('/', async (req, res) => {
    const { title, columns } = req.body as { title: string, columns: string };
    const board = await boardsService.create(title, columns);

    return response(res, BoardModel.toResponse(board), 201);
  })

  fastify.put('/:boardId', {
    schema: {
      querystring: {
        boardId: { type: 'string' },
      }
    }
  }, async (req, res) => {
    const { boardId } = req.params as { boardId: string };
    const { title, columns } = req.body as { title: string, columns: string };
    const board = await boardsService.update(boardId, title, columns);

    return response(res, board ? BoardModel.toResponse(board) : 'Not found', board ? 200 : 404);
  })

  fastify.delete('/:boardId', {
    schema: {
      querystring: {
        boardId: { type: 'string' },
      }
    }
  }, async (req, res) => {
    const { boardId } = req.params as { boardId: string };
    const board = await boardsService.remove(boardId);
    // map board fields to exclude secret fields like "password"
    return board ? response(res, BoardModel.toResponse(board)) : response(res,'Board not found', 404);
  })
}

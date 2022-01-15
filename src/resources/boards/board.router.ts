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
  /**
   * @description Get Boards list
   * @param req FastifyRequest
   * @param res FastifyReply
   *
   * @return Response array of BoardModels
   */
  fastify.get('/', async (req, res) => {
    const boards = await boardsService.getAll();
    // map board fields to exclude secret fields like "password"
    return response(res, boards.map(BoardModel.toResponse));
  })
  /**
   * @description Get Board by Id
   * @param req FastifyRequest
   * @param res FastifyReply
   *
   * @return Response BoardModel | 404
   */
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
  /**
   * @description Create Board
   * @param req FastifyRequest
   * @param res FastifyReply
   *
   * @return Response created BoardModel
   */
  fastify.post('/', async (req, res) => {
    const { title, columns } = req.body as { title: string, columns: string };
    const board = await boardsService.create(title, columns);

    return response(res, BoardModel.toResponse(board), 201);
  })
  /**
   * @description Update Board by id
   * @param req FastifyRequest
   * @param res FastifyReply
   *
   * @return Response updated BoardModel
   */
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
  /**
   * @description Delete Board by id
   * @param req FastifyRequest
   * @param res FastifyReply
   *
   * @return Response deleted BoardModel
   */
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

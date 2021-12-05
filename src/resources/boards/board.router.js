const Board = require('./board.model');
const boardsService = require('./board.service');
const response = require('../../common/response')

module.exports = async (fastify) => {
  fastify.get('/', async (req, res) => {
    const boards = await boardsService.getAll();
    // map board fields to exclude secret fields like "password"
    return response(res, boards.map(Board.toResponse));
  })

  fastify.get('/:boardId', {
    schema: {
      querystring: {
        boardId: { type: 'string' },
      }
    }
  }, async (req, res) => {
    const board = await boardsService.get(req.params.boardId);
    // map board fields to exclude secret fields like "password"
    return board ? response(res, Board.toResponse(board)) : response(res,'Board not found', 404);
  })

  fastify.post('/', async (req, res) => {
    const { title, columns } = req.body;
    const board = await boardsService.create(title, columns);

    return response(res, Board.toResponse(board), 201);
  })

  fastify.put('/:boardId', {
    schema: {
      querystring: {
        boardId: { type: 'string' },
      }
    }
  }, async (req, res) => {
    const { title, columns } = req.body;
    const board = await boardsService.update(req.params.boardId, title, columns);

    return response(res, Board.toResponse(board));
  })

  fastify.delete('/:boardId', {
    schema: {
      querystring: {
        boardId: { type: 'string' },
      }
    }
  }, async (req, res) => {
    const board = await boardsService.remove(req.params.boardId);
    // map board fields to exclude secret fields like "password"
    return board ? response(res, Board.toResponse(board)) : response(res,'Board not found', 404);
  })

}

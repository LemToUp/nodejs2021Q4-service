const User = require('./user.model');
const usersService = require('./user.service');
const response = require('../../common/response')

module.exports = async (fastify) => {
  fastify.get('/', async (req, res) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    return response(res, users.map(User.toResponse));
  })

  fastify.get('/:userId', {
    schema: {
      querystring: {
        userId: { type: 'string' },
      }
    }
  }, async (req, res) => {
    const user = await usersService.get(req.params.userId);
    // map user fields to exclude secret fields like "password"
    return user ? response(res, User.toResponse(user)) : response(res,'User not found', 404);
  })

  fastify.post('/', async (req, res) => {
    const { name, login, pass } = req.body;
    const user = await usersService.create(name, login, pass);

    return response(res, User.toResponse(user), 201);
  })

  fastify.put('/:userId', {
    schema: {
      querystring: {
        userId: { type: 'string' },
      }
    }
  }, async (req, res) => {
    const { name, login, pass } = req.body;
    const user = await usersService.update(req.params.userId, name, login, pass);

    return response(res, User.toResponse(user));
  })

  fastify.delete('/:userId', {
    schema: {
      querystring: {
        userId: { type: 'string' },
      }
    }
  }, async (req, res) => {
    const user = await usersService.remove(req.params.userId);
    // map user fields to exclude secret fields like "password"
    return user ? response(res, User.toResponse(user)) : response(res,'User not found', 404);
  })

}

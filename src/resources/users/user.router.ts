import {FastifyPluginAsync, FastifyReply, FastifyRequest} from 'fastify';
import {UserModel} from './user.model';
import { response } from '../../common/response';
import { UserService } from './user.service';

/**
 * @description Users CRUD routes
 * @param fastify FastifyInstance
 *
 * @remarks GET / - list
 * @remarks GET /:userId - one board
 * @remarks POST / - create
 * @remarks PUT /:userId - update
 * @remarks DELETE /:userId - delete
 */
export const userRoute:FastifyPluginAsync = async (fastify) => {
  const userService = new UserService();
  /**
   * @description Get Users list
   * @param req FastifyRequest
   * @param res FastifyReply
   *
   * @return Response array of UserModels
   */
  fastify.get('/', {
    preValidation: [ fastify.authenticate ]
  }, async (req: FastifyRequest, res: FastifyReply) => {
    const users = await userService.getAll();
    // map user fields to exclude secret fields like "password"
    return response(res, users.map(UserModel.toResponse));
  })
  /**
   * @description Get User by Id
   * @param req FastifyRequest
   * @param res FastifyReply
   *
   * @return Response User | 404
   */
  fastify.get('/:userId', {
    preValidation: [ fastify.authenticate ],
    schema: {
      querystring: {
        userId: { type: 'string' },
      }
    }
  }, async (req, res) => {
    const { userId } = req.params as { userId: string };
    const user = await userService.get(userId);
    // map user fields to exclude secret fields like "password"
    return user ? response(res, UserModel.toResponse(user)) : response(res,'User not found', 404);
  })
  /**
   * @description Create User
   * @param req FastifyRequest
   * @param res FastifyReply
   *
   * @return Response created User
   */
  fastify.post('/', {
    preValidation: [ fastify.authenticate ]
  }, async (req, res) => {
    const { name, login, password } = req.body as { name: string, login: string, password: string };
    const user = await userService.create(name, login, password);

    return response(res, UserModel.toResponse(user), 201);
  })
  /**
   * @description Update User by id
   * @param req FastifyRequest
   * @param res FastifyReply
   *
   * @return Response updated User
   */
  fastify.put('/:userId', {
    preValidation: [ fastify.authenticate ],
    schema: {
      querystring: {
        userId: { type: 'string' },
      }
    }
  }, async (req, res) => {
    const { userId } = req.params as { userId: string };
    const { name, login, pass } = req.body as { name: string | undefined, login: string | undefined, pass: string | undefined };
    await userService.update(userId, name, login, pass);

    const user = await userService.get(userId);

    return response(res, user ? UserModel.toResponse(user) : 'Not found', user ? 200 : 404);
  })
  /**
   * @description Delete User by id
   * @param req FastifyRequest
   * @param res FastifyReply
   *
   * @return Response deleted User
   */
  fastify.delete('/:userId', {
    preValidation: [ fastify.authenticate ],
    schema: {
      querystring: {
        userId: { type: 'string' },
      }
    }
  }, async (req, res) => {
    const { userId } = req.params as { userId: string };
    const user = await userService.get(userId);

    if (user) {
      await userService.remove(userId);
    }

    // map user fields to exclude secret fields like "password"
    return user ? response(res, UserModel.toResponse(user)) : response(res,'User not found', 404);
  })
};

import {FastifyPluginAsync, FastifyReply, FastifyRequest} from "fastify";
import {UserModel} from "./user.model";
import { response } from "../../common/response";
import * as usersService from "./user.service";

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
  fastify.get('/', async (req: FastifyRequest, res: FastifyReply) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    return response(res, users.map(UserModel.toResponse));
  })

  fastify.get('/:userId', {
    schema: {
      querystring: {
        userId: { type: 'string' },
      }
    }
  }, async (req, res) => {
    const { userId } = req.params as { userId: string };
    const user = await usersService.get(userId);
    // map user fields to exclude secret fields like "password"
    return user ? response(res, UserModel.toResponse(user)) : response(res,'User not found', 404);
  })

  fastify.post('/', async (req, res) => {
    const { name, login, pass } = req.body as { name: string, login: string, pass: string };
    const user = await usersService.create(name, login, pass);

    return response(res, UserModel.toResponse(user), 201);
  })

  fastify.put('/:userId', {
    schema: {
      querystring: {
        userId: { type: 'string' },
      }
    }
  }, async (req, res) => {
    const { userId } = req.params as { userId: string };
    const { name, login, pass } = req.body as { name: string | undefined, login: string | undefined, pass: string | undefined };
    const user = await usersService.update(userId, name, login, pass);

    return response(res, user ? UserModel.toResponse(user) : 'Not found', user ? 200 : 404);
  })

  fastify.delete('/:userId', {
    schema: {
      querystring: {
        userId: { type: 'string' },
      }
    }
  }, async (req, res) => {
    const { userId } = req.params as { userId: string };
    const user = await usersService.remove(userId);
    // map user fields to exclude secret fields like "password"
    return user ? response(res, UserModel.toResponse(user)) : response(res,'User not found', 404);
  })
};

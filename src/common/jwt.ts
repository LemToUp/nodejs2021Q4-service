import fastifyPlugin from 'fastify-plugin';
import fastifyJwt from 'fastify-jwt';
import {FastifyReply, FastifyRequest} from 'fastify';

export const jwtPlugin = fastifyPlugin(async (fp) => {
    fp.register(fastifyJwt, {
        secret: process.env.SECRET as string
    })

    fp.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await request.jwtVerify()
        } catch (err) {
            reply.send(err)
        }
    })
})

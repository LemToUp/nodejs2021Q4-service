import {FastifyReply, FastifyRequest} from 'fastify';

export const jwtAuth = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify()
    } catch (err) {
        reply.send(err)
    }
};

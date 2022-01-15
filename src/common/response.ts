import { FastifyReply } from 'fastify';

/**
 * @description Add response data to the reply
 *
 * @param res Fastify reply instance
 * @param data Any response data for the Json encode
 * @param code Response status code - number
 *
 * @return Fastify reply instance;
 */
export const response = <T>(res: FastifyReply, data: T, code = 200): FastifyReply => {
    res.type('application/json');
    res.code(code);
    res.send(JSON.stringify(data));

    return res;
}

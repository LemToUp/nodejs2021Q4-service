import {JWT, VerifyPayloadType} from 'fastify-jwt';
import {FastifyReply, FastifyRequest} from 'fastify';

declare module 'fastify' {
    export interface FastifyInstance {
        jwt: JWT;
        authenticate(request: FastifyRequest, reply: FastifyReply): Promise<VerifyPayloadType>|FastifyReply<Error>;
    }
}


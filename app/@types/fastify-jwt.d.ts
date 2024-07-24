import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string;
      iat: number;
      org: {
        id: string;
        name: string
      }
    }
  }
}
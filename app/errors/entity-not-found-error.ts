import { CustomError } from './custom-error';

export class EntityNotFoundError extends CustomError {
  constructor(entity: string) {
    super(`${entity} not found`, { status: 404 });
  }
}
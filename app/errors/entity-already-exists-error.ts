import { CustomError } from './custom-error';

export class EntityAlreadyExistsError extends CustomError {
  constructor(entity: string) {
    super(`${entity} already exists`, { status: 409 });
  }
}
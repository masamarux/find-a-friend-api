import { CustomError } from './custom-error';

export class EntityAlreadyExistsError extends CustomError {
  constructor() {
    super('Entity already exists', { status: 409 });
  }
}
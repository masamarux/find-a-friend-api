import { CustomError } from './custom-error';

export class InvalidCredentialsError extends CustomError {
  constructor() {
    super('Invalid credentials', { status: 401 });
  }
}
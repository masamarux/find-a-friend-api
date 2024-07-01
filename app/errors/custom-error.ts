interface CustomErrorOptions {
  status: number;
}

export class CustomError extends Error {
  status: number;
  constructor(message: string, options: CustomErrorOptions) {
    super(message);
    this.status = options.status;
  }
}
export class SchemaError extends Error {
  type: string;
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

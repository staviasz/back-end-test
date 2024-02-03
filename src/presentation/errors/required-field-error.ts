export class RequiredFieldError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RequiredFieldError';
  }
}

export abstract class AppError extends Error {
  abstract code: string;

  constructor(message?: string) {
    super(message);
    this.name = new.target.name;
  }
}

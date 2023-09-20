export class NotAuthorizedError extends Error {
  constructor() {
    super("you don't have access to this resource");
  }

  handle() {}
}

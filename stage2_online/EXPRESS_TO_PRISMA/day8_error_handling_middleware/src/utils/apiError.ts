export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message); // memanggil cunstructor bawaan class Error
    this.statusCode = statusCode;
    this.name = "ApiError";
  }
}

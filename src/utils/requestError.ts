/* eslint-disable @typescript-eslint/no-explicit-any */
class RequestError extends Error {
  code: number;
  body: any;

  constructor(message: string, code: number, body: any) {
    super(message);
    this.code = code;
    this.body = body;
  }
}

export default RequestError;

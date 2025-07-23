export class HttpErrorModel {
  constructor(
    private reason: string,
    private message: string,
    private status: number,
    private stack: string,
  ) {}
}

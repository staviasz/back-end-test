import { HttpRequest, HttpResponse } from '../types/http';

export interface Controller {
  execute: (httpRequest: HttpRequest) => Promise<HttpResponse>;
}

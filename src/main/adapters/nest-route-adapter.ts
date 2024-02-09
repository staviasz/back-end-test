import type { Request, Response } from 'express';
import type { Controller } from 'src/presentation/contracts/controller';
import { type HttpRequest } from 'src/presentation/types/http';

export class NestRouteAdapter {
  constructor(private readonly controller: Controller) {}

  async adapt(req: Request, res: Response): Promise<void> {
    const httpRequest: HttpRequest = {
      body: req.body,
    };
    const httpResponse = await this.controller.execute(httpRequest.body);
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      res.status(httpResponse.statusCode).json({
        name: httpResponse.body.name,
        error: httpResponse.body.message,
        statusCode: httpResponse.statusCode,
      });
    }
  }
}

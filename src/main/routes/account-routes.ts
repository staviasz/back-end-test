import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { makeAddUserController } from 'src/main/factories/add-account-factory';
import { adaptRoute } from 'src/main/factories/nest-route-adapter-factory';

@Controller('/account')
export class AccountRoutes {
  @Post()
  async addAccount(@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeAddUserController());
    await adaptNest.adapt(req, res);
  }
}

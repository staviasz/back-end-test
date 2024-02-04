import { NestRouteAdapter } from 'src/main/adapters/nest-route-adapter';
import { type Controller } from 'src/presentation/contracts/controller';

export const adaptRoute = (controller: Controller): NestRouteAdapter => {
  return new NestRouteAdapter(controller);
};

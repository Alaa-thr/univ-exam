import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator( //use this deco pour recuperé le user from req to pass it to service for add exams only for this logged user or for recover the exams of the logged user
  (data: unknown, ctx: ExecutionContext) => { //data is the data that we are sending, ExecutionContext permet de requperé le req et le res
    const request = ctx.switchToHttp().getRequest(); // recuperé le req pour recuperé le user qui la fct validate() envoyé
    return request.user;
  },
);

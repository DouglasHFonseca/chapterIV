import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { BalanceMap } from '../../mappers/BalanceMap';
import { GetBalanceUseCase } from './GetBalanceUseCase';

export class GetBalanceController {
  async execute(request: Request, response: Response):Promise<Response> {
    const { id: user_id } = request.user;

    const getBalanceUseCase = container.resolve(GetBalanceUseCase);

    const balance = await getBalanceUseCase.execute({ user_id });

    const balanceDTO = BalanceMap.toDTO(balance);

    return response.json(balanceDTO);
  }
}

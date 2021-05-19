import { Transfer } from '@modules/transfers/entities/Transfer';
import { ITransfersRepository } from '@modules/transfers/repositories/ITransfersRepository';
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { Statement } from "../../entities/Statement";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { GetBalanceError } from "./GetBalanceError";

interface IRequest {
  user_id: string;
}

interface IResponse {
  statement: Statement[];
  transfer: Transfer[];
  balance: number;
}

@injectable()
export class GetBalanceUseCase {
  constructor(
    @inject('StatementsRepository')
    private statementsRepository: IStatementsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TransfersRepository')
    private transfersRepository: ITransfersRepository
  ) { }

  async execute({ user_id }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new GetBalanceError();
    }

    const statement = await this.statementsRepository.getUserBalance({ user_id });

    const transfer = await this.transfersRepository.totalTransfers(user_id);

    const balance = statement.balance - transfer.total;

    const fullStatement = {
      statement: statement.statement,
      transfer: transfer.transfers,
      balance
    }

    return fullStatement as IResponse;
  }
}

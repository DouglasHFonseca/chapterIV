import { IStatementsRepository } from '@modules/statements/repositories/IStatementsRepository';
import { Transfer } from '@modules/transfers/entities/Transfer';
import { ITransfersRepository } from '@modules/transfers/repositories/ITransfersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject } from 'tsyringe';
import { CreateTransferError } from './CreateTransferError';
import { ICreateTransferDTO } from './ICreateTransferDTO';


enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

export class CreateTransferUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject('StatementsRepository')
    private statementsRepository: IStatementsRepository,

    @inject("TransfersRepository")
    private transfersRepository: ITransfersRepository
  ) { }
  async execute({
    sender_id,
    amount,
    description
  }: ICreateTransferDTO,
    recipient: string
  ): Promise<Transfer> {
    const user = await this.usersRepository.findById(sender_id);

    const { balance } = await this.statementsRepository.getUserBalance({ user_id: sender_id });
    if (balance < amount) throw new CreateTransferError.InsufficientFunds()

    const findReceiver = await this.usersRepository.findById(recipient);
    if (!findReceiver) throw new CreateTransferError.UserNotFound();

    await this.statementsRepository.create({
      user_id: recipient,
      amount,
      description: `Transfer received from ${user.name}`,
      type: "deposit" as OperationType
    });

    const transferOperations = await this.transfersRepository.create({
      sender_id,
      amount,
      description,
    });

    return transferOperations;
  }
}

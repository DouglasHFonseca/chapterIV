import { getRepository, Repository } from 'typeorm';
import { Transfer } from '../entities/Transfer';
import { ICreateTransferDTO } from '../useCases/createTransfer/ICreateTransferDTO';
import { ITransfersRepository } from './ITransfersRepository';


class TransfersRepository implements ITransfersRepository {
  private repository: Repository<Transfer>;

  constructor() {
    this.repository = getRepository(Transfer);
  }

  async create({ sender_id, amount, description }: ICreateTransferDTO): Promise<Transfer> {
    const transfer = this.repository.create({
      sender_id,
      amount,
      description,
    });

    return this.repository.save(transfer);
  }

  async totalTransfers(sender_id: string): Promise<{ total: number, transfers: Transfer[] }> {
    const transfers = await this.repository.find({ where: { sender_id } });

    const total = transfers.reduce(
      (acc, operation) =>
        acc + Number(operation.amount), 0);

    return { total, transfers };
  }
}

export { TransfersRepository }

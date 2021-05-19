import { Transfer } from '../entities/Transfer';
import { ICreateTransferDTO } from '../useCases/createTransfer/ICreateTransferDTO';

interface ITransfersRepository {
  create(data: ICreateTransferDTO): Promise<Transfer>;
  totalTransfers(sender_id: string): Promise<{ total: number, transfers: Transfer[] }>
}

export { ITransfersRepository }

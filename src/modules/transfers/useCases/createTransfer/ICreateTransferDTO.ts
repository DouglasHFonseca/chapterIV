import { Transfer } from '@modules/transfers/entities/Transfer';

export type ICreateTransferDTO =
  Pick<
    Transfer,
    "sender_id" |
    "amount" |
    "description" |
    "type"
  >

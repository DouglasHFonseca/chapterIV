import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateTransferUseCase } from './CreateTransferUseCase';

class CreateTransferController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const { id } = request.user;
    const { amount, description } = request.body;

    const createTransferUseCase = container.resolve(CreateTransferUseCase);

    const transfer = await createTransferUseCase.execute(
      {
        amount,
        description,
        sender_id: id,
      },
      user_id
    );

    return response.status(201).send(transfer);
  }
}

export { CreateTransferController }

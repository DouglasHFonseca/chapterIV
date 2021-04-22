
import { AppError } from '../../../../shared/errors/AppError';
import { InMemoryUsersRepository } from '../../../users/repositories/in-memory/InMemoryUsersRepository';
import { ICreateUserDTO } from '../../../users/useCases/createUser/ICreateUserDTO';
import { InMemoryStatementsRepository } from '../../repositories/in-memory/InMemoryStatementsRepository';
import { CreateStatementError } from './CreateStatementError';
import { CreateStatementUseCase } from './CreateStatementUseCase';
import { ICreateStatementDTO } from './ICreateStatementDTO';

let usersRepositoryInMemory: InMemoryUsersRepository;
let statementsRepository: InMemoryStatementsRepository;
let createStatementUseCase: CreateStatementUseCase;

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}
describe("Create Statement", () => {

  beforeAll(async () => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    statementsRepository = new InMemoryStatementsRepository();
    createStatementUseCase = new CreateStatementUseCase(
      usersRepositoryInMemory, statementsRepository);
  });

  it("should be able to create a new user", async () => {
    const user: ICreateUserDTO = {
      name: "Douglas",
      email: "douglas@douglas.com",
      password: "12345"
    }

    const createdUser = await usersRepositoryInMemory.create(user);

    const statement: ICreateStatementDTO = {
      user_id: String(createdUser.id),
      amount: 100,
      description: 'test',
      type: 'deposit' as OperationType
    }

    const result = await createStatementUseCase.execute(statement);
    expect(result).toHaveProperty("user_id");
  });

  it("should not be able to create a statement for a non-existent user", async () => {
    expect(async () => {
      await createStatementUseCase.execute({
        user_id: "user non-existent",
        amount: 100,
        description: 'test',
        type: 'deposit' as OperationType
      });
    }).rejects.toBeInstanceOf(CreateStatementError.UserNotFound);
  })
})

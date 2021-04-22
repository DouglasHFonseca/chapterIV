import { InMemoryUsersRepository } from '../../../users/repositories/in-memory/InMemoryUsersRepository';
import { ICreateUserDTO } from '../../../users/useCases/createUser/ICreateUserDTO';
import { InMemoryStatementsRepository } from '../../repositories/in-memory/InMemoryStatementsRepository';
import { ICreateStatementDTO } from '../createStatement/ICreateStatementDTO';
import { GetStatementOperationUseCase } from './GetStatementOperationUseCase';

let usersRepositoryInMemory: InMemoryUsersRepository;
let statementsRepositoryInMemory: InMemoryStatementsRepository
let getStatementOperationUseCase: GetStatementOperationUseCase;

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

describe("Get Statement Operation", () => {

  beforeAll(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    statementsRepositoryInMemory = new InMemoryStatementsRepository();

    getStatementOperationUseCase = new GetStatementOperationUseCase(
      usersRepositoryInMemory, statementsRepositoryInMemory);
  });

  it("Should be able to see an operation by id", async () => {
    const user: ICreateUserDTO = {
      name: "Douglas",
      email: "douglas@douglas.com",
      password: "12345"
    }

    const createdUser = await usersRepositoryInMemory.create(user);
    const user_id = String(createdUser.id);

    const statement: ICreateStatementDTO = {
      user_id,
      amount: 100,
      description: 'test',
      type: 'deposit' as OperationType
    }
    const createdStatement = await statementsRepositoryInMemory.create(statement);

    const statement_id = String(createdStatement.id);

    const statementOperation = await getStatementOperationUseCase.execute({ user_id, statement_id });

    expect(statementOperation).toHaveProperty("id");
    expect(statementOperation).toHaveProperty("user_id");
  })
})

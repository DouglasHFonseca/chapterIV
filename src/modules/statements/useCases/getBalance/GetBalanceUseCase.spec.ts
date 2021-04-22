import { InMemoryUsersRepository } from '../../../users/repositories/in-memory/InMemoryUsersRepository';
import { ICreateUserDTO } from '../../../users/useCases/createUser/ICreateUserDTO';
import { InMemoryStatementsRepository } from '../../repositories/in-memory/InMemoryStatementsRepository';
import { GetBalanceError } from './GetBalanceError';
import { GetBalanceUseCase } from './GetBalanceUseCase'

let usersRepositoryInMemory: InMemoryUsersRepository;
let statementsRepository: InMemoryStatementsRepository;
let getBalanceUseCase: GetBalanceUseCase;

describe("Get Balance", () => {

  beforeAll(async () => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    statementsRepository = new InMemoryStatementsRepository();
    getBalanceUseCase = new GetBalanceUseCase(statementsRepository, usersRepositoryInMemory)
  })

  it("Should be able to see the balance by id", async () => {
    const user: ICreateUserDTO = {
      name: "Douglas",
      email: "douglas@douglas.com",
      password: "12345"
    }

    const createdUser = await usersRepositoryInMemory.create(user);
    const user_id = String(createdUser.id);

    const result = await getBalanceUseCase.execute({ user_id });

    expect(result).toHaveProperty("statement");
  });

  it("Should not be able to see a statement for a non-existent user", async () => {
    expect(async () => {
      const user_id = "IDIncorrect"
      await getBalanceUseCase.execute({ user_id });
    }).rejects.toBeInstanceOf(GetBalanceError);
  });
});

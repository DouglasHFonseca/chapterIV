
import { AppError } from '../../../../shared/errors/AppError';
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { CreateUserUseCase } from './CreateUserUseCase';

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: InMemoryUsersRepository;

describe("Create User", () => {

  beforeAll(async () => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });


  it("should be able to create a new user", async () => {
    const user = {
      name: "Test1",
      email: "test1@gmail.com",
      password: "12345"
    }

    const response = await createUserUseCase.execute({ name: user.name, email: user.email, password: user.password });

    expect(response).toHaveProperty("id");
  });

  it("should not be able to create more than one user with the same email", async () => {
    expect(async () => {
      const user = {
        name: "test2",
        email: "test2@gmail.com",
        password: "12345"
      }
      await createUserUseCase.execute({ name: user.name, email: user.email, password: user.password });
      await createUserUseCase.execute({ name: user.name, email: user.email, password: user.password });
    }).rejects.toBeInstanceOf(AppError);
  })
})

import { Connection, createConnection } from 'typeorm';
import { UsersRepository } from '../../repositories/UsersRepository';
import { CreateUserUseCase } from './CreateUserUseCase';

let createUserUseCase: CreateUserUseCase;
let usersRepository: UsersRepository;

let connection: Connection;
describe("Create User", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    usersRepository = new UsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  })

  it("should be able to create a new user", async () => {
    const user = {
      name: "douglas",
      email: "douglas@gmail.com",
      password: "12345"
    }

    const response = await createUserUseCase.execute({ name: user.name, email: user.email, password: user.password });

    expect(response).toHaveProperty("id");
  })
})

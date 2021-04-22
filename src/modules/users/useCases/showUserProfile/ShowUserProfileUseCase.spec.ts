import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { ShowUserProfileUseCase } from './ShowUserProfileUseCase';

let showUserProfileUseCase: ShowUserProfileUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: InMemoryUsersRepository


describe("Show User Profile", () => {

  beforeAll(async () => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    showUserProfileUseCase = new ShowUserProfileUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  })

  it("should be able to see a user by id", async () => {
    const user = {
      name: "Test Show User",
      email: "showuser@test.com",
      password: "12345"
    }

    const findUser = await createUserUseCase.execute({ name: user.name, email: user.email, password: user.password });

    const foundUser = await showUserProfileUseCase.execute(String(findUser.id));

    expect(foundUser).toHaveProperty("id");
  });
})

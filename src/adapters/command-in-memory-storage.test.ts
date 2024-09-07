import Command, { CommandEntity } from "../core/command";
import CommandInMemoryStorage from "./command-in-memory-storage";
import Storage from "../ports/storage";

let commandInMemoryStorage: Storage<CommandEntity>;

beforeEach(() => {
  commandInMemoryStorage = new CommandInMemoryStorage();
});

test("find command when command was created", async () => {
  const command: Command = {
    id: "0",
    description: "0",
    command: "0",
  }
  const commandEntity = new CommandEntity(command);
  await commandInMemoryStorage.save(commandEntity);
  const createdCommand = await commandInMemoryStorage.findById(command.id);

  expect(createdCommand).toBe(commandEntity);
});

test("save updates data when command already exists", async () => {
  const command: Command = {
    id: "0",
    description: "0",
    command: "0",
  }
  const commandEntity = new CommandEntity(command);
  await commandInMemoryStorage.save(commandEntity);

  const foundCommand = await commandInMemoryStorage.findById(commandEntity.id);
  foundCommand.description = "1";
  await commandInMemoryStorage.save(foundCommand);

  const updatedCommand = await commandInMemoryStorage.findById(commandEntity.id);

  expect(updatedCommand.description).toBe("1");
  expect(updatedCommand.command).toBe(commandEntity.command);
});

test("doesn't find command when command was deleted", async () => {
  const command: Command = {
    id: "0",
    description: "0",
    command: "0",
  }
  const commandEntity = new CommandEntity(command);
  await commandInMemoryStorage.save(commandEntity);
  await commandInMemoryStorage.delete(commandEntity);
  const createdCommand = await commandInMemoryStorage.findById(command.id);

  expect(createdCommand).toBeFalsy();
});

test("doesn't find command when purged", async () => {
  const command: Command = {
    id: "0",
    description: "0",
    command: "0",
  }
  const commandEntity = new CommandEntity(command);
  await commandInMemoryStorage.save(commandEntity);
  await commandInMemoryStorage.purge();
  const createdCommand = await commandInMemoryStorage.findById(command.id);

  expect(createdCommand).toBeFalsy();
});

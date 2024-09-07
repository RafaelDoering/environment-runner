import Command from "../core/command";
import CommandInMemoryStorage from "./command-in-memory-storage";
import Storage from "../ports/storage";

let commandInMemoryStorage: Storage<Command>;

beforeEach(() => {
  commandInMemoryStorage = new CommandInMemoryStorage();
});

test("find command when command was created", async () => {
  const command: Command = {
    id: 0,
    description: "0",
    command: "0",
  }
  await commandInMemoryStorage.save(command);
  const createdCommand = await commandInMemoryStorage.findById(command.id);

  expect(createdCommand).toBe(command);
});

test("save updates data when command already exists", async () => {
  const command: Command = {
    id: 0,
    description: "0",
    command: "0",
  }
  await commandInMemoryStorage.save(command);

  const foundCommand = await commandInMemoryStorage.findById(command.id);
  foundCommand.description = "1";
  await commandInMemoryStorage.save(foundCommand);

  const updatedCommand = await commandInMemoryStorage.findById(command.id);

  expect(updatedCommand.description).toBe("1");
  expect(updatedCommand.command).toBe(command.command);
});

test("doesn't find command when command was deleted", async () => {
  const command: Command = {
    id: 0,
    description: "0",
    command: "0",
  }
  await commandInMemoryStorage.save(command);
  await commandInMemoryStorage.delete(command);
  const createdCommand = await commandInMemoryStorage.findById(command.id);

  expect(createdCommand).toBeFalsy();
});

test("doesn't find command when purged", async () => {
  const command: Command = {
    id: 0,
    description: "0",
    command: "0",
  }
  await commandInMemoryStorage.save(command);
  await commandInMemoryStorage.purge();
  const createdCommand = await commandInMemoryStorage.findById(command.id);

  expect(createdCommand).toBeFalsy();
});

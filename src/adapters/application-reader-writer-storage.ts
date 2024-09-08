import Application from "../core/application";
import Reader from "../ports/reader";
import Storage from "../ports/storage";
import Writer from "../ports/writer";

export default class ApplicationSequelizeStorage implements Storage<Application> {
  constructor(private reader: Reader, private writer: Writer, private path?: string) { }

  async save(entity: Application) {
    const applications = await this.findAll();

    const application = applications.find((application) => application.id === entity.id);
    if (application) {
      application.id = entity.id;
      application.name = entity.name;
      application.description = entity.description;
      application.commands = entity.commands.map((command, index) => ({ ...command, id: index }));
    } else {
      applications.push({ ...entity, id: applications.length });
    }

    await this.writer.write(JSON.stringify(applications), this.path);

    return application || applications[applications.length - 1];
  }

  async findById(id: number) {
    const applications = await this.findAll();

    return applications.find(application => application.id === id);
  }

  async findAll() {
    const applications = JSON.parse(await this.reader.read(this.path)) as Application[];

    return applications || [];
  }

  async delete(entity: Application) {
    let applications = await this.findAll();

    applications = applications.filter(application => application.id !== entity.id);
  }

  async purge() {
    await this.writer.write(JSON.stringify([]), this.path);
  }
}

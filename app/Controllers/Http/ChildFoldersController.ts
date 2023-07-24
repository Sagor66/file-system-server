// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import ChildFolder from 'App/Models/ChildFolder';

export default class ChildFoldersController {
  public async index({ response }) {
    const childFolders = await ChildFolder.all();

    return response.ok(childFolders);
  }

  public async store({ request, response }) {
    const childFolderSchema = schema.create({
      root_id: schema.number(),
      name: schema.string({ trim: true }, [rules.maxLength(255)]),
    });

    const payload: any = await request.validate({ schema: childFolderSchema });
    const childFolder: ChildFolder = await ChildFolder.create(payload);

    return response.ok(childFolder);
  }

  public async show({ params, response }) {
    const { id }: { id: Number } = params;

    const childFolder: any = await ChildFolder.find(id);
    if (!childFolder) {
      return response.notFound({ message: 'Folder not found' });
    }

    return response.ok(childFolder);
  }

  public async update({ request, params, response }) {
    const childFolderSchema = schema.create({
      root_id: schema.number(),
      name: schema.string({ trim: true }, [rules.maxLength(255)]),
    });

    const payload: any = await request.validate({ schema: childFolderSchema });
    const { id }: { id: Number } = params;

    const childFolder: any = await ChildFolder.find(id);
    if (!childFolder) {
      return response.notFound({ message: 'Folder not found' });
    }

    childFolder.root_id = payload.root_id;
    childFolder.name = payload.name;

    await childFolder.save();

    return response.ok(childFolder);
  }

  public async destroy({ params, response }) {
    const { id }: { id: Number } = params;

    const childFolder: any = await ChildFolder.find(id);
    if (!childFolder) {
      return response.notFound({ message: 'Folder not found' });
    }

    await childFolder.delete();

    return response.ok({ message: 'Folder deleted successfully.' });
  }
}

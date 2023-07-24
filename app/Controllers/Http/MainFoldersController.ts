// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import MainFolder from 'App/Models/MainFolder';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class MainFoldersController {
  public async index({ response }) {
    const mainFolders = await MainFolder.all();

    return response.ok(mainFolders);
  }

  public async store({ request, response }) {
    const mainFolderSchema = schema.create({
      name: schema.string({ trim: true }, [rules.maxLength(255)]),
    });

    const payload: any = await request.validate({ schema: mainFolderSchema });
    const mainFolder: MainFolder = await MainFolder.create(payload);

    return response.ok(mainFolder);
  }

  public async show({ params, response }) {
    const { id }: { id: Number } = params;

    const mainFolder: any = await MainFolder.find(id);
    if (!mainFolder) {
      return response.notFound({ message: 'Folder not found' });
    }

    return response.ok(mainFolder);
  }

  public async update({ request, params, response }) {
    const mainFolderSchema = schema.create({
      name: schema.string({ trim: true }, [rules.maxLength(255)]),
    });

    const payload: any = await request.validate({ schema: mainFolderSchema });

    const { id }: { id: Number } = params;

    const mainFolder: any = await MainFolder.find(id);
    if (!mainFolder) {
      return response.notFound({ message: 'Folder not found' });
    }

    mainFolder.name = payload.name;

    await mainFolder.save();

    return response.ok(mainFolder);
  }

  public async destroy({ params, response }) {
    const { id }: { id: Number } = params;

    const mainFolder: any = await MainFolder.find(id);
    if (!mainFolder) {
      return response.notFound({ message: 'Folder not found' });
    }

    await mainFolder.delete();

    return response.ok({ message: 'Folder deleted successfully.' });
  }
}

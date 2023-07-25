import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm';

export default class ChildFolder extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public root_id: number;

  @column()
  public name: string;

  @belongsTo(() => ChildFolder, {
    foreignKey: 'root_id',
  })
  public root: BelongsTo<typeof ChildFolder>;

  @hasMany(() => ChildFolder, {
    localKey: 'id',
    foreignKey: 'root_id',
    onQuery: (q) => {
      q.whereColumn('id', '!=', 'root_id');
    },
  })
  public children: HasMany<typeof ChildFolder>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}

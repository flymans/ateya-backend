import { Model, Table, Column, DataType, Default } from 'sequelize-typescript';

@Table
export class Product extends Model<Product> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column(DataType.STRING)
  pavilion: string;

  @Column(DataType.STRING)
  equipmentType: string;

  @Column(DataType.STRING)
  comment: string;

  @Column(DataType.STRING)
  responsible: string;

  @Default({})
  @Column(DataType.JSONB)
  previousValues: { pavilion: string; responsible: string };
}

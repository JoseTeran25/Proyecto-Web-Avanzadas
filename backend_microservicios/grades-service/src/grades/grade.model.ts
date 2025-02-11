// grades-service/src/models/grade.model.ts
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'GRADES', timestamps: false })
export class Grade extends Model<Grade> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  courseId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  professorId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  studentId: number;

  @Column({ type: DataType.DECIMAL(5, 2), allowNull: false })
  grade: number;
}

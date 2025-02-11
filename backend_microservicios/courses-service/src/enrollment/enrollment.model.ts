// courses-service/src/models/enrollment.model.ts
import {
    Table,
    Column,
    Model,
    DataType,
  } from 'sequelize-typescript';
  
  @Table({ tableName: 'ENROLLMENTS', timestamps: false })
  export class Enrollment extends Model<Enrollment> {
    @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    })
    id: number;
  
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;   // Referencia lógica a "auth-service"
  
    @Column({ type: DataType.INTEGER, allowNull: false })
    courseId: number;
  }
  
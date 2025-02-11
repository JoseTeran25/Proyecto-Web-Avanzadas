// courses-service/src/models/course.model.ts
import {
    Table,
    Column,
    Model,
    DataType,
  } from 'sequelize-typescript';
  
  @Table({ tableName: 'COURSES', timestamps: false })
  export class Course extends Model<Course> {
    @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    })
    id: number;
  
    @Column({ type: DataType.STRING, allowNull: false })
    title: string;
  
    @Column({ type: DataType.STRING })
    description: string;
  
    // Aunque aquí tengas references en tu base de datos, 
    // en Nest + Microservicios NO solemos hacer 
    // foreign key real a otra DB. Lo guardamos como int.
    @Column({ type: DataType.INTEGER, allowNull: true })
    professorId: number;
  }
  
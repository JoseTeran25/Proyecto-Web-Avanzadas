// auth-service/src/models/user.model.ts
import {
    Table,
    Column,
    Model,
    DataType,
  } from 'sequelize-typescript';
  
  @Table({ tableName: 'USERS', timestamps: false })
  export class User extends Model<User> {
    @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    })
    id: number;
  
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;
  
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;
  
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;
  
    @Column({
      type: DataType.ENUM('student', 'professor'),
      allowNull: false,
      defaultValue: 'student',
    })
    role: 'student' | 'professor';
  }
  
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEnum } from '@turbovets-challenge/data/enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;
  
  @Column()
  name!: string;

  @Column()
  password!: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.VIEWER,
  })
  role!: RoleEnum;

  @Column({ nullable: true })
  organizationId?: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

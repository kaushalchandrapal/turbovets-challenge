import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true })
  parentOrganizationId?: number;
}

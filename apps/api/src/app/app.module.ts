import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User, Task, Organization } from '@turbovets-challenge/data/entities';
import { AuthModule } from '@turbovets-challenge/auth/auth.module';
import { UsersModule } from './users/users.module'; 
import { OrganizationModule } from './organization/organization.module';
import { TaskModule } from './tasks/tasks.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'turbovets_challenge',
      entities: [User, Task, Organization],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([User, Task, Organization]),
    UsersModule,
    OrganizationModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

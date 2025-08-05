import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from '@turbovets-challenge/data/entities/organization.entity';
import { CreateOrganizationDto } from '@turbovets-challenge/data/dtos';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepo: Repository<Organization>,
  ) {}

  async create(dto: CreateOrganizationDto): Promise<Organization> {
    const organization = this.organizationRepo.create(dto);
    return this.organizationRepo.save(organization);
  }

  async findAll(): Promise<Organization[]> {
    const organizations = await this.organizationRepo.find();
    return organizations.map(org => ({ ...org }));
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateApplicantDto } from '../dtos';
import { ApplicantService } from '../services';

@Controller('applicants')
export class ApplicantController {
  constructor(private applicantService: ApplicantService) {}

  @Post()
  create(@Body() data: CreateApplicantDto) {
    return this.applicantService.create(data);
  }

  @Get()
  findAll() {
    return this.applicantService.findAll();
  }
}

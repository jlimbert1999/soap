import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateApplicantDto } from '../dtos';
import { ApplicantService } from '../services';

@Controller('applicants')
export class ApplicantController {
  constructor(private applicantService: ApplicantService) {}

  @Post()
  create(@Body() data: CreateApplicantDto) {
    return this.applicantService.create(data);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() data: CreateApplicantDto) {
    return this.applicantService.update(id, data);
  }

  @Post('upload')
  upload(@Body() data: any) {
    return this.applicantService.uploadData(data);
  }

  @Post('accept/:id')
  acept(@Body() data: any, @Param('id') id: string) {
    return this.applicantService.acept(id, data);
  }

  @Get()
  findAll() {
    return this.applicantService.findAll();
  }

  @Get('jobs/:term')
  searchJobs(@Param('term') term: string) {
    return this.applicantService.searchAvailableJob(term);
  }

  @Get('endorser/:id')
  searchByEndorser(@Param('id') id_endorser: string) {
    return this.applicantService.searchByEndorser(id_endorser);
  }
}

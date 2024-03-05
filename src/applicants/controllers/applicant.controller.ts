import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateApplicantDto, UpdateOfficer } from '../dtos';
import { ApplicantService } from '../services';
import { PaginationParamsDto } from 'src/common/dtos';

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

  @Put('approve/:id')
  approve(@Param('id') id: string) {
    return this.applicantService.approve(id);
  }

  @Post('accept/:id')
  acept(@Body() data: any, @Param('id') id: string) {
    return this.applicantService.acept(id, data);
  }

  @Get()
  findAll(@Query() params: PaginationParamsDto) {
    return this.applicantService.findAll(params);
  }

  @Get('approved')
  getApproved(@Query() params: PaginationParamsDto) {
    return this.applicantService.getApproved(params);
  }

  @Get('search/:term')
  searc(@Param('term') term: string, @Query() params: PaginationParamsDto) {
    return this.applicantService.search(term, params);
  }

  @Get('jobs/:term')
  searchJobs(@Param('term') term: string) {
    return this.applicantService.searchAvailableJob(term);
  }

  @Get('endorser/:id')
  searchByEndorser(@Param('id') id_endorser: string) {
    return this.applicantService.searchByEndorser(id_endorser);
  }

  @Put('officer/:id')
  updateOfficers(@Param('id') id: string, @Body() body: UpdateOfficer) {
    return this.applicantService.updateOfficer(id, body);
  }
}

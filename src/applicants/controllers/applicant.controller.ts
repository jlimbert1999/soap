import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateApplicantDto, CreateOfficer, GetAplicantParamsDto, UpdateApplicantDto, UpdateOfficer } from '../dtos';
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
  update(@Param('id') id: string, @Body() data: UpdateApplicantDto) {
    return this.applicantService.update(id, data);
  }

  @Post('upload')
  upload(@Body() data: any) {
    return this.applicantService.uploadData(data);
  }

  @Put('approve/:id')
  toggleAproved(@Param('id') id: string) {
    return this.applicantService.toggleAproved(id);
  }

  @Post('accept/:id')
  acept(@Body() data: CreateOfficer, @Param('id') id: string) {
    return this.applicantService.accept(id, data);
  }

  @Get()
  findAll(@Query() params: GetAplicantParamsDto) {
    return this.applicantService.findAll(params);
  }

  @Get('search/:term')
  search(@Param('term') term: string, @Query() params: GetAplicantParamsDto) {
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

  @Get('completed/:date')
  getCompleted(@Param('date') date: string, @Query() param: PaginationParamsDto) {
    return this.applicantService.getCompleted(param.limit, param.offset, +date);
  }

  @Put('officer/:id')
  updateOfficers(@Param('id') id: string, @Body() body: UpdateOfficer) {
    return this.applicantService.updateOfficer(id, body);
  }
}

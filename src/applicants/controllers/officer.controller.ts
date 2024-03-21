import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { OfficerService } from '../services';
import { PaginationParamsDto } from 'src/common/dtos';

@Controller('officers')
export class OfficerController {
  constructor(private officerService: OfficerService) {}
  @Get()
  findAll(@Query() params: PaginationParamsDto) {
    return this.officerService.findAll(params);
  }

  @Get('search/:term')
  search(@Param('term') term: string, @Query() params: PaginationParamsDto) {
    return this.officerService.search(term, params);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.officerService.updateOfficer(id, data);
  }

  @Post('upload')
  upload(@Body() data: any) {
    return this.officerService.upload(data);
  }

  @Get('endorsers/:id')
  searchByEndorser(@Param('id') id: string) {
    return this.officerService.searchByEndorser(id);
  }
}

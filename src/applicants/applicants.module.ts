import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicantService, EndorserService, OrganizationService } from './services';
import { ApplicantController, EndorserController, OrganizationController } from './controllers';
import { Applicant, ApplicantSchema, Endorser, EndorserSchema, Organization, OrganizationSchema } from './schemas';
import { Officer, OfficerSchema } from './schemas/officer.schema';
import { Job, JobSchema } from './schemas/job.schema';
import { Employed, EmployedSchema } from './schemas/employed.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organization.name, schema: OrganizationSchema },
      { name: Endorser.name, schema: EndorserSchema },
      { name: Applicant.name, schema: ApplicantSchema },
      { name: Employed.name, schema: EmployedSchema },
      { name: Officer.name, schema: OfficerSchema },
      { name: Job.name, schema: JobSchema },
    ]),
  ],
  controllers: [OrganizationController, EndorserController, ApplicantController],
  providers: [OrganizationService, EndorserService, ApplicantService],
})
export class ApplicantsModule {}

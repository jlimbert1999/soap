import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicantService, EndorserService, OfficerService, OrganizationService } from './services';
import { ApplicantController, EndorserController, OfficerController, OrganizationController } from './controllers';
import {
  Applicant,
  ApplicantSchema,
  Endorser,
  EndorserSchema,
  Organization,
  OrganizationSchema,
  Officer,
  OfficerSchema,
  Job,
  JobSchema,
  Level,
  LevelSchema,
} from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      // { name: Employed.name, schema: EmployedSchema },
      { name: Organization.name, schema: OrganizationSchema },
      { name: Endorser.name, schema: EndorserSchema },
      { name: Applicant.name, schema: ApplicantSchema },
      { name: Officer.name, schema: OfficerSchema },
      { name: Job.name, schema: JobSchema },
      { name: Level.name, schema: LevelSchema },
    ]),
  ],
  controllers: [OrganizationController, EndorserController, ApplicantController, OfficerController],
  providers: [OrganizationService, EndorserService, ApplicantService, OfficerService],
})
export class ApplicantsModule {}

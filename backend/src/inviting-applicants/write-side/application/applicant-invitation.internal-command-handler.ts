import { ApplicantInvitationInternalCommand } from './applicant-invitation.internal-command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TIME_PROVIDER } from '@coders-board-library/time-provider';
import { Inject } from '@nestjs/common';
import {
  APPLICANT_INVITATION_REPOSITORY,
  ApplicantInvitationRepository,
} from '../domain/applicant-invitation.repository';
import { TimeProviderPort } from '../../../shared-kernel/write-side/domain/time-provider.port';
import { ApplicantInvitation } from '../domain/applicant-invitation.aggregate-root';
import { ApplicantInvitationId } from '../domain/applicant-invitation-id.valueobject';
import { PersonalEmail } from '../domain/personal-email.valueobject';
import { FirstName } from '../domain/first-name.value-object';
import { LastName } from '../domain/last-name.value-object';

export namespace ApplicantInvitationInternalCommandHandler {
  @CommandHandler(ApplicantInvitationInternalCommand.InviteApplicant)
  class InviteApplicantToAssociation
    implements
      ICommandHandler<ApplicantInvitationInternalCommand.InviteApplicant> {
    constructor(
      @Inject(TIME_PROVIDER) private readonly timeProvider: TimeProviderPort,
      @Inject(APPLICANT_INVITATION_REPOSITORY)
      private readonly repository: ApplicantInvitationRepository,
    ) {}

    async execute({
      firstName,
      lastName,
      personalEmail,
    }: ApplicantInvitationInternalCommand.InviteApplicant): Promise<string> {
      const invitation = new ApplicantInvitation(this.timeProvider);
      const id = ApplicantInvitationId.generate();
      invitation.invite(id, {
        personalEmail: PersonalEmail.from(personalEmail),
        firstName: FirstName.from(firstName),
        lastName: LastName.from(lastName),
      });
      return this.repository.save(invitation).then(() => id.raw);
    }
  }

  @CommandHandler(ApplicantInvitationInternalCommand.CancelApplicantInvitation)
  class CancelApplicantInvitation
    implements
      ICommandHandler<
        ApplicantInvitationInternalCommand.CancelApplicantInvitation
      > {
    constructor(
      @Inject(APPLICANT_INVITATION_REPOSITORY)
      private readonly repository: ApplicantInvitationRepository,
    ) {}

    async execute({
      applicantInvitationId,
    }: ApplicantInvitationInternalCommand.CancelApplicantInvitation) {
      return executeCommand(
        this.repository,
        ApplicantInvitationId.of(applicantInvitationId),
        invitation => invitation.cancel(),
      );
    }
  }

  const executeCommand = async (
    repository: ApplicantInvitationRepository,
    targetId: ApplicantInvitationId,
    command: (target: ApplicantInvitation) => void,
  ): Promise<void> => {
    const aggregate = await repository.findById(targetId);
    if (!aggregate) {
      throw new Error(`Applicant invitation with id ${targetId} not found!`);
    }
    command(aggregate);
    return repository.save(aggregate);
  };

  export const All = [InviteApplicantToAssociation, CancelApplicantInvitation];
}

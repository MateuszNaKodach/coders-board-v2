import uuid = require('uuid');
import { AggregateId } from '../../shared-kernel/domain/aggregate-id.valueobject';

export class ApplicantInvitationId implements AggregateId {
  private readonly TYPE = 'ApplicantInvitationId';

  private constructor(readonly raw: string) {}

  static generate() {
    return new ApplicantInvitationId(uuid.v4());
  }

  static of(raw: string) {
    return new ApplicantInvitationId(raw);
  }

  toString() {
    return this.raw;
  }
}

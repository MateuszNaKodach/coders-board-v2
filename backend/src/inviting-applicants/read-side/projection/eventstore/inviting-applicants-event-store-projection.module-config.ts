import {ProjectionName} from "./projection-name";

export const PROJECTIONS = Symbol("PROJECTIONS");

export type InvitingApplicantsEventStoreProjectionModuleConfig = {
  projectionsDir: string;
  projections: ProjectionName[],
}
import {ProjectionSources} from "../../projection/eventstore/projection-sources";
import * as fs from "fs";

export class ResourcesProjectionSources implements ProjectionSources {

  projectionQuerySource(name: string): string {
    return fs.readFileSync(`./resources/inviting-applicants/read-side/projection/eventstore/${name}.projection.ts`, {encoding: "utf-8"})
  }

}
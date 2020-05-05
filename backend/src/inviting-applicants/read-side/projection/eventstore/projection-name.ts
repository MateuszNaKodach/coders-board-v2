export class ProjectionName {
  private readonly TYPE = 'ProjectionName';

  readonly id: string;
  readonly version: number;

  private constructor(id: string, version: number) {
    this.id = id;
    this.version = version;
  }

  static from(id: string, version: number) {
    if (!id || id === "") {
      throw new Error("Projection id cannot be empty!")
    }
    if (!version || version < 1 || !this.isInteger(version)) {
      throw new Error("Projection version must be integer greater or equal to 1!")
    }
    return new ProjectionName(id, version);
  }

  static fromProps(props: { id: string, version: number }) {
    return this.from(props.id, props.version);
  }

  private static isInteger(n) {
    return n % 1 === 0;
  }

  get raw() {
    return `${this.id}_v${this.version}`;
  }
}
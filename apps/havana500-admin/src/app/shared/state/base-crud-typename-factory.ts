export class BaseCrudActionTypeNameFactory {
  typeName: string;

  constructor(public type: { new (): any }) {
    this.typeName = new type().constructor.name;
  }

  get Create(): string {
    return `[${this.typeName}] Create`;
  }

  get CreateSuccess(): string {
    return `[${this.typeName}] Create Success`;
  }

  get CreateFailed(): string {
    return `[${this.typeName}] Create Failed`;
  }

  get GetById(): string {
    return `[${this.typeName}] Get By Id`;
  }

  get GetByIdSuccess(): string {
    return `[${this.typeName}] Get By Id Success`;
  }

  get GetByIdFailed(): string {
    return `[${this.typeName}] Get By Id Failed`;
  }

  get GetAll(): string {
    return `[${this.typeName}] Get All`;
  }

  get GetAllSuccess(): string {
    return `[${this.typeName}] Get All Success`;
  }

  get GetAllFailed(): string {
    return `[${this.typeName}] Get All Failed`;
  }

  get Update(): string {
    return `[${this.typeName}] Update`;
  }

  get UpdateSuccess(): string {
    return `[${this.typeName}] Update Success`;
  }

  get UpdateFailed(): string {
    return `[${this.typeName}] Update Failed`;
  }

  get Delete(): string {
    return `[${this.typeName}] Delete`;
  }

  get DeleteSuccess(): string {
    return `[${this.typeName}] Delete Success`;
  }

  get DeleteFailed(): string {
    return `[${this.typeName}] Delete Failed`;
  }
}

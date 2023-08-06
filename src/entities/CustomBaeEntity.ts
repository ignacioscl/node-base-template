import { BaseEntity } from 'typeorm';

export class CustomBaseEntity  {
  toJSON(): any {
    return Object.assign({}, this);
  }
}
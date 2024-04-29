import { DeepPartial } from 'typeorm';

export interface ICrudInterface<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  create(createDto: DeepPartial<T>): Promise<T>;
  update(id: number, updateDto: DeepPartial<T>): Promise<T>;
  delete(id: number): Promise<boolean>;
}

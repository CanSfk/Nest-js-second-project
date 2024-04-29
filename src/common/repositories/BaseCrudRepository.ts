import { HttpException, HttpStatus } from '@nestjs/common';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { ICrudInterface } from '../interfaces/Crud.interface';

export class BaseCrudRepository<T> implements ICrudInterface<T> {
  protected readonly repository: Repository<T>;
  protected readonly repositoryName: string;

  constructor(repository: Repository<T>, repositoryName: string) {
    this.repository = repository;
    this.repositoryName = repositoryName;
  }

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findById(id: any): Promise<T | null> {
    const item = await this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
    });

    if (item) return item;

    throw new HttpException(
      `${this.repositoryName} verisi bulunamadı.`,
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateDto: DeepPartial<T>): Promise<T> {
    const item = await this.findById(id);

    Object.assign(item, updateDto);
    const updatedItem = await this.repository.save(item);

    if (updatedItem) return updatedItem;

    throw new HttpException(
      `${this.repositoryName} güncelleme işlemi başarısız.`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async delete(id: number): Promise<boolean> {
    await this.findById(id);

    const result = await this.repository.delete(id);

    if (result.affected === 0)
      throw new HttpException(
        `${this.repositoryName} silme işlemi başarısız.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return true;
  }

  async create(entityData: DeepPartial<T>): Promise<T> {
    const createItem = await this.repository.create(entityData);

    const newItem = await this.repository.save(createItem);

    if (newItem) return newItem;

    throw new HttpException(
      `${this.repositoryName} verisi ekleme işlemi başarısız`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

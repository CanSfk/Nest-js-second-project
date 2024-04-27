import { Column, Entity, PrimaryGeneratedColumn, Table } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number;

  @Column({ name: 'user_name', nullable: true, default: '' })
  userName: string;

  @Column({ name: 'email', nullable: true, default: '' })
  email: string;

  @Column({ name: 'password', nullable: true, default: '' })
  password: string;
}

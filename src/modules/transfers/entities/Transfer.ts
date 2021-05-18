import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { User } from '@modules/users/entities/User';

@Entity("transfers")
export class Transfer {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column("uuid")
  sender_id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sender_id' })
  user: User;

  @Column("decimal", { precision: 5, scale: 2 })
  amount: number;

  @Column()
  description: string;

  @Column()
  type?: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.type = "transfer"
    }
  }
}

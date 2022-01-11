import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;
  @Column({ name: 'full_name', type: 'varchar' })
  name: string;
  @Column({ name: 'mobile_no', type: 'varchar' })
  mobileNo: string;
  @Column({ name: 'dob', type: 'date' })
  dateOfBirth: Date;
  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;
  @UpdateDateColumn({ name: 'modified_date' })
  modifiedDate: Date;
}

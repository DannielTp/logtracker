import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm'

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Index({ unique: true })
  @Column({ name: 'api_key' })
  apiKey!: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Project } from './project.entity'

@Entity('error_groups')
@Index('idx_error_groups_project_fingerprint', ['project', 'fingerprint'], {
  unique: true,
})
export class ErrorGroup {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project!: Project

  @Column()
  fingerprint!: string

  @Column()
  message!: string

  @Column({ nullable: true })
  type?: string

  @Column({ default: 1 })
  count!: number

  @CreateDateColumn({ name: 'first_seen' })
  firstSeen!: Date

  @UpdateDateColumn({ name: 'last_seen' })
  lastSeen!: Date
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm'
import { Project } from './project.entity'
import { ErrorGroup } from './error-group.entity'

@Entity('error_events')
export class ErrorEventEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Index('idx_error_events_project')
  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project!: Project

  @Index('idx_error_events_group')
  @ManyToOne(() => ErrorGroup, { nullable: true })
  @JoinColumn({ name: 'error_group_id' })
  errorGroup?: ErrorGroup

  @Column()
  environment!: string

  @Column()
  service!: string

  @Column()
  timestamp!: string

  @Column({ type: 'jsonb' })
  payload!: unknown

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date
}

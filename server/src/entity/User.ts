import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  PHONE_NUMBER: string;

  @Column("text")
  LOCATION: string;
}
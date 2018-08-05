import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Category } from "./Category";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  PHONE_NUMBER: string;

  @Column("text")
  LOCATION: string;
}
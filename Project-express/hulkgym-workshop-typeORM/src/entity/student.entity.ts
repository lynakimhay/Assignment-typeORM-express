import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity("students")
@Unique(["email"])
export class Student {
    @PrimaryGeneratedColumn()
    student_id: number;

    @Column({ type: "varchar", length: 50 })
    first_name: string;

    @Column({ type: "varchar", length: 50 })
    last_name: string;

    @Column ({ type: "varchar", length: 100 })
    fullName : string
    
    @Column({ type: "varchar", length: 100, unique: true })
    email: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    phone?: string;

    @Column({ type: "date", nullable: true })
    birth_date?: Date;

    @Column({ type: "varchar", length: 10, nullable: false })
    gender: "Male" | "Female" | "Other";

    @Column({ type: "text", nullable: true })
    address?: string;
}

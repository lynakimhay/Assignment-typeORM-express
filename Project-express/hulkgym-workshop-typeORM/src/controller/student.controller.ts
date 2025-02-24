import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source"; 
import { Student } from "../entity/student.entity"; 

export const createStudent = async (req: Request, res: Response) => {
    try {
        console.log("Received request:", req.body);

        const { first_name, last_name, fullName, email, phone, birth_date, gender, address } = req.body;

        // Create a new student entity
        const studentRepository = AppDataSource.getRepository(Student);
        const student = studentRepository.create({
            first_name,
            last_name,
            fullName,
            email,
            phone,
            birth_date,
            gender,
            address
        });

        // Save the student to the database
        await studentRepository.save(student);

        console.log("Student created successfully:", student);
        return res.status(201).json({ message: "Student created successfully", student });
    } catch (err) {
        console.error("Error creating student:", err);
        return res.status(500).json({ message: "Internal server error!" });
    }
};



export const getStudent = async (req: Request, res: Response) => {
    try {
        const student_id = parseInt(req.params.id); // Assuming the student ID is passed as a parameter

        // Find the student by ID
        const studentRepository = AppDataSource.getRepository(Student);
        const student = await studentRepository.findOne({ where: { student_id } });

        if (!student) {
            return res.status(404).json({ message: "Student not found!" });
        }

        console.log("Student retrieved successfully:", student);
        return res.status(200).json({ student });
    } catch (err) {
        console.error("Error fetching student:", err);
        return res.status(500).json({ message: "Internal server error!" });
    }
};

export const getAllStudents = async (req: Request, res: Response) => {
    try {
        // Find all students
        const studentRepository = AppDataSource.getRepository(Student);
        const students = await studentRepository.find();

        console.log("Students retrieved successfully:", students);
        return res.status(200).json({ students });
    } catch (err) {
        console.error("Error fetching students:", err);
        return res.status(500).json({ message: "Internal server error!" });
    }
};
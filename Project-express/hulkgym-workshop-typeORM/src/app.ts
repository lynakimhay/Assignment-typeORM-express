import express, { Request, Response } from "express";
import dotenv from "dotenv";
import "reflect-metadata"
import { AppDataSource , } from "./config/data-source";
import telegramBot from "node-telegram-bot-api";
import { Student } from "./entity/student.entity";
import { Teacher } from "./entity/teacher.entity";
import { Class } from "./entity/class.entity";


const token = process.env.TELEGRAM_TOKEN;
if (!token) {
  throw new Error("Telegram Bot Token not provided!");
}

const bot = new telegramBot(token, {polling: true});

const commands = [
  { command: "/start", description: "Start the bot and get command list" },
  { command: "/student", description: "Get list of students" },
  { command: "/teacher", description: "Get list of teachers" },
  { command: "/class", description: "Get list of class" },
];

bot
  .setMyCommands(commands)
  .then(() => console.log("Commands set successfully"));

// Handle /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  let response = "Hello from gdavid_Bot, how can I help you?\n\n";
  commands.forEach((cmd) => {
    response += `${cmd.command} - ${cmd.description}\n`;
  });
  bot.sendMessage(chatId, response);
});

// Handle other commands
bot.onText(/\/student/, async (msg) => {
  const studentRepo = AppDataSource.getRepository(Student);
  const students = await studentRepo.find({
    take: 10,
  });

  const studentList = students
    .map((student, index) => {
      return `${index + 1}. ${student.first_name} ${student.last_name}`;
    })
    .join("\n");

  bot.sendMessage(
    msg.chat.id,
    `Students Name📝\n\n${studentList}` || "No students found."
  );
});

bot.onText(/\/teacher/, async (msg) => {
  const teacherRepo = AppDataSource.getRepository(Teacher);
  const teachers = await teacherRepo.find({
    take: 10,
  });
  const teacherList = teachers
    .map((teacher, index) => {
      return `${index + 1}. ${teacher.first_name} ${teacher.last_name}`;
    })
    .join("\n");
  bot.sendMessage(msg.chat.id, `Teachers Name📝\n\n${teacherList}`);
});

bot.onText(/\/class/, async (msg) => {
  const classRepo = AppDataSource.getRepository(Class);
  const classes = await classRepo.find({
    take: 10,
    });
    const classList = classes
    .map((cls, index) => {
      return `${index + 1}. ${cls.class_name}`;
      })
      .join("\n");
      bot.sendMessage(msg.chat.id, `Class Name📝\n\n${classList}`)
      });

  


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log("✅ Database connected successfully!");

        // Start your bot after DB connection is established
        bot.startPolling();
    })
    .catch((error) => console.log("❌ Database connection error: ", error));

// Default Route
app.get("/", (req: Request, res: Response) => {
  res.send(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

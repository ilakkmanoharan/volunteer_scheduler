import * as fs from "fs";
import * as readline from "readline";
import { Task } from "./task";
import { Volunteer } from "./volunteer";

const loadTasks = async (filename: string): Promise<Record<number, Task>> => {
  const tasks: Record<number, Task> = {};

  const reader = readline.createInterface({
    input: fs.createReadStream(filename),
  });

  let isFirstLine = true;
  for await (const line of reader) {
    if (isFirstLine) {
      isFirstLine = false;
      continue;
    }

    const [idStr, title, description] = line.split(",");
    const taskId = parseInt(idStr);

    if (isNaN(taskId)) continue;

    tasks[taskId] = new Task(taskId, title.trim(), description.trim());
  }

  return tasks;
};

const loadVolunteers = async (
  filename: string,
  tasks: Record<number, Task>
): Promise<Record<number, Volunteer>> => {
  const volunteers: Record<number, Volunteer> = {};

  const reader = readline.createInterface({
    input: fs.createReadStream(filename),
  });

  let isFirstLine = true;
  for await (const line of reader) {
    if (isFirstLine) {
      isFirstLine = false;
      continue;
    }

    const [idStr, name, email, preferredStr, acceptableStr] = line.split(",");

    const id = parseInt(idStr);
    if (isNaN(id)) continue;

    const preferredIds = preferredStr
      ? preferredStr.trim().split(" ").map(Number).filter(n => !isNaN(n))
      : [];

    const acceptableIds = acceptableStr
      ? acceptableStr.trim().split(" ").map(Number).filter(n => !isNaN(n))
      : [];

    const volunteer = new Volunteer(id, name.trim(), email.trim());

    for (const taskId of preferredIds) {
      if (tasks[taskId]) {
        volunteer.addPreferredTask(tasks[taskId]);
      }
    }

    for (const taskId of acceptableIds) {
      if (tasks[taskId]) {
        volunteer.addAcceptableTask(tasks[taskId]);
      }
    }

    volunteers[id] = volunteer;
  }

  return volunteers;
};

export { loadTasks, loadVolunteers };


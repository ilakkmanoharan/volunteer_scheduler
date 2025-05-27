import { Task } from "./task";

export class Volunteer {
  id: number;
  name: string;
  email: string;
  preferredTasks: Task[] = [];
  acceptableTasks: Task[] = [];
  assignedTasks: Task[] = [];

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  addPreferredTask(task: Task) {
    this.preferredTasks.push(task);
  }

  addAcceptableTask(task: Task) {
    this.acceptableTasks.push(task);
  }

  assignTask(task: Task) {
    this.assignedTasks.push(task);
  }

  isInterested(task: Task): boolean {
    // For example, interested if in preferred or acceptable
    return this.preferredTasks.includes(task) || this.acceptableTasks.includes(task);
  }

  getTopPreferences(): Task[] {
    // Return preferred tasks sorted or filtered as needed
    return this.preferredTasks;
  }

  getAllInterestedTasks(): Task[] {
    // Combine preferred and acceptable without duplicates
    const all = [...this.preferredTasks, ...this.acceptableTasks];
    return Array.from(new Set(all));
  }
}

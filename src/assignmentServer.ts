import { Task } from "./task";
import { Volunteer } from "./volunteer";

class AssignmentServer {
  tasks: Record<number, Task>;
  volunteers: Record<number, Volunteer>;
  assignments: Map<Task, Volunteer[]>;
  notifications: string[];

  constructor(
    tasks: Record<number, Task>,
    volunteers: Record<number, Volunteer>
  ) {
    this.tasks = tasks;
    this.volunteers = volunteers;
    this.assignments = new Map();
    this.notifications = [];
  }

  getInterestedVolunteers(task: Task): Volunteer[] {
    return Object.values(this.volunteers).filter((volunteer) =>
      volunteer.isInterested(task)
    );
  }

  getTopPreferenceTasks(volunteer: Volunteer): Task[] {
    // Replace with the correct method or implement getTopPreferences in Volunteer
    // Example: if the method is getTopPreferenceTasks, use that
    return volunteer.getTopPreferences(); // Make sure Volunteer has getTopPreferences(): Task[]
  }

  /**
   * Assigns tasks using Option B: Round Robin based on volunteer preferences.
   */
  assignTasksOptionB() {
    const unassignedTasks = new Set(Object.values(this.tasks));
    const volunteerQueue = Object.values(this.volunteers);
    const assignmentCounts: Map<number, number> = new Map();

    for (const v of volunteerQueue) {
      assignmentCounts.set(v.id, 0);
    }

    let round = 0;
    while (unassignedTasks.size > 0 && round < 10) {
      for (const volunteer of volunteerQueue) {
        const topPrefs = this.getTopPreferenceTasks(volunteer);
        let assigned = false;

        for (const task of topPrefs) {
          if (unassignedTasks.has(task)) {
            this.assignToTask(task, volunteer);
            unassignedTasks.delete(task);
            assignmentCounts.set(volunteer.id, assignmentCounts.get(volunteer.id)! + 1);
            assigned = true;
            break;
          }
        }

        if (!assigned) {
          const allPrefs = volunteer.getAllInterestedTasks();
          for (const task of allPrefs) {
            if (unassignedTasks.has(task)) {
              this.assignToTask(task, volunteer);
              unassignedTasks.delete(task);
              assignmentCounts.set(volunteer.id, assignmentCounts.get(volunteer.id)! + 1);
              assigned = true;
              break;
            }
          }
        }

        if (!assigned && unassignedTasks.size > 0) {
          const task = Array.from(unassignedTasks)[0];
          this.assignToTask(task, volunteer);
          unassignedTasks.delete(task);
          assignmentCounts.set(volunteer.id, assignmentCounts.get(volunteer.id)! + 1);
        }
      }
      round++;
    }

    if (unassignedTasks.size > 0) {
      this.notifications.push(`The following tasks remain unassigned: ${Array.from(unassignedTasks).map(t => t.title).join(", ")}`);
    }
  }

  assignToTask(task: Task, volunteer: Volunteer) {
    if (!this.assignments.has(task)) {
      this.assignments.set(task, []);
    }
    this.assignments.get(task)!.push(volunteer);
  }

  /**
   * Detects and notifies about stalled or incomplete tasks.
   */
  detectStalledTasks(thresholdInDays: number) {
    const now = new Date();
    for (const task of Object.values(this.tasks)) {
      if (
        task.status !== "completed" &&
        now.getTime() - task.lastUpdated.getTime() > thresholdInDays * 86400000
      ) {
        this.notifications.push(`Task "${task.title}" is stalled. Please reassign or follow up.`);
      }
    }
  }

  volunteerBackout(volunteer: Volunteer) {
    for (const [task, volunteers] of this.assignments.entries()) {
      if (volunteers.includes(volunteer)) {
        this.assignments.set(task, volunteers.filter(v => v !== volunteer));
        this.notifications.push(`Volunteer ${volunteer.name} backed out of task "${task.title}". Please reassign.`);
      }
    }
  }

  printAssignments() {
    for (const task of Object.values(this.tasks)) {
      const assignees = this.assignments.get(task);
      console.log(`${task}`);
      if (assignees && assignees.length > 0) {
        console.log(`\tAssigned to: ${assignees.map(a => a.name).join(", ")}`);
      } else {
        console.log("\tUnassigned");
      }
      console.log();
    }
  }

  printNotifications() {
    if (this.notifications.length > 0) {
      console.log("Notifications:");
      for (const note of this.notifications) {
        console.log(`- ${note}`);
      }
    }
  }
}

export { AssignmentServer };
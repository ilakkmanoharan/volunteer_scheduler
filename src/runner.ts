import { AssignmentServer } from "./assignmentServer"; // assuming runner.ts and assignmentServer.ts are both in src/
import { loadTasks, loadVolunteers } from "./util";

const main = async () => {
  const tasks = await loadTasks("tasks.csv");
  const volunteers = await loadVolunteers("volunteers.csv", tasks);
  const server = new AssignmentServer(tasks, volunteers);

  server.assignTasksOptionB();  // Use the correct method name
  server.printAssignments();
  server.printNotifications();
};

main();

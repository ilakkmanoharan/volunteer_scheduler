# Task List

You may do these tasks in any order, but take note that they are listed in the order your team has prioritized completing them.

Reminder that you are NOT expected to complete all tasks. You are expected to write clean, readable code. Remember to add comments explaining what you were working on if you run out of time in the middle of a task.


## Task 1

Implement logic that evaluates the quality of the task assignments. After the assignments are made, the program should calculate a single overall satisfaction score and then print the score.

The overall satisfaction score should be computed as follows:

For each task assigned to a volunteer, give it a score: 4 points for a top-preferred task, 3 points for a second-choice task, 2 points for a third-choice task, and 1 point for any other task the volunteer is interested in. If a volunteer is assigned to a task that they are not interested in, the score is -1.

The overall satisfaction score is the sum of all individual task scores.


## Task 2

Implement support for multi-person tasks. Some tasks are sophisticated and require more than one person to complete. For these tasks, ensure that they are assigned to multiple people.


## Task 3

Some volunteers have expressed dissatisfaction with the tasks they've been assigned. Suggest and implement changes to the algorithm for assigning tasks to volunteers so that the assignment yields a better assignment of tasks.

What counts as "better" is up to you. You might consider one or more of the following criteria: a higher overall volunteer satisfaction score, a more even distribution of tasks, ensuring that all volunteers get to participate, or other criteria of your choosing.

Note that we are not looking for a perfect solution; our clients would prefer one or two completed minor improvements to the current algorithm over an "optimal" solution that is buggy or incomplete.

You are welcome to add any helper methods, implement any algorithm and/or use any underlying data structures you like, but you are encouraged to make sure your decisions are well documented and your code is appropriately decomposed.


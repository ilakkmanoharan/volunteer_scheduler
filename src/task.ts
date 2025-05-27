export class Task {
  id: number;
  title: string;
  status: string; // e.g. 'completed', 'pending', etc.
  lastUpdated: Date;

  constructor(
    id: number,
    title: string,
    status: string = 'pending',
    lastUpdated: Date = new Date()
  ) {
    this.id = id;
    this.title = title;
    this.status = status;
    this.lastUpdated = lastUpdated;
  }

  // Optional: Update status and refresh lastUpdated
  updateStatus(newStatus: string) {
    this.status = newStatus;
    this.lastUpdated = new Date();
  }

  // Optional: Factory method to create a Task from CSV line fields
  static fromCSVLine(fields: string[]): Task | null {
    // Expect fields: [id, title, status, lastUpdated]
    if (fields.length < 4) return null;

    const id = parseInt(fields[0]);
    if (isNaN(id)) return null;

    const title = fields[1].trim();
    const status = fields[2].trim();

    // Parse date, fallback to now if invalid
    const lastUpdated = new Date(fields[3].trim());
    if (isNaN(lastUpdated.getTime())) {
      return new Task(id, title, status, new Date());
    }

    return new Task(id, title, status, lastUpdated);
  }
}


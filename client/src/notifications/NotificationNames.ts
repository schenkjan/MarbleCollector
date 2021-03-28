export class NotificationNames {
  static prefix = {
    assignment: "Assignment",
    grant: "grant",
  };
  static parent = {
    heartbeat: "Heartbeat",
    assignmentUpdated: "AssignmentUpdated",
    assignmentDeleted: "AssignmentDeleted",
    receiveMessage: "ReceiveMessage",
  };
  static child = {
    heartbeat: "Heartbeat",
    assignmentCreated: "AssignmentCreated",
    assignmentUpdated: "AssignmentUpdated",
    assignmentDeleted: "AssignmentDeleted",
    updateFigures: "UpdateFigures",
  };
}

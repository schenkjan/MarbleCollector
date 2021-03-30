export class NotificationNames {
  static prefix = {
    assignment: "Assignment",
    grant: "Grant",
  };
  static parent = {
    heartbeat: "Heartbeat",
    assignmentUpdated: "AssignmentUpdated",
    assignmentDeleted: "AssignmentDeleted",
    grantUpdated: "GrantUpdated",
    grantDeleted: "GrantDeleted",
    receiveMessage: "ReceiveMessage",
  };
  static child = {
    heartbeat: "Heartbeat",
    assignmentCreated: "AssignmentCreated",
    assignmentUpdated: "AssignmentUpdated",
    assignmentDeleted: "AssignmentDeleted",
    grantCreated: "GrantCreated",
    grantUpdated: "GrantUpdated",
    grantDeleted: "GrantDeleted",
    updateFigures: "UpdateFigures",
  };
}

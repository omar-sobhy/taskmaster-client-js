interface Task {
  _id: string
  name: string
  description: string
  dueDate: Date
  assignee: string
  created: Date
  updated: Date

  watchers: string[]
  checklistItems: string[]
  comments: string[]
  historyItems: string[]
  tags: string[]
}

export default Task;

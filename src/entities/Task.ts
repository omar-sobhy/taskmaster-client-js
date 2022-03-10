import ChecklistItem from './ChecklistItem';
import HistoryItem from './HistoryItem';
import Tag from './Tag';

interface Task {
  _id: string
  name: string
  description: string
  dueDate: Date
  assignee: string
  created: Date
  updated: Date

  watchers: string[]
  checklistItems: ChecklistItem[]
  comments: Comment[]
  historyItems: HistoryItem[]
  tags: Tag[]
}

export default Task;

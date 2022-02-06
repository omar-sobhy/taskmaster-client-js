interface ChecklistItem {
  _id: string
  description: string
  status: 'DONE' | 'IN_PROGRESS'
}

export default ChecklistItem;

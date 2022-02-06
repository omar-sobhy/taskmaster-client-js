interface HistoryItem {
  _id: string
  detail: string
  datetime: Date
  type: 'CREATE' | 'ASSIGN' | 'UPDATE'
}

export default HistoryItem;

export interface Category {
  category_id: number
  user_id: number
  name: string
  type: 'expense' | 'income'
}
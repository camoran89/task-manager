export interface ITask {
  id: string;
  userName: string;
  title: string;
  description: string;
  category: string;
  completed: boolean;
  finishDate: Date;
  createdAt: Date;
}
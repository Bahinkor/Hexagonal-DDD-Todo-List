export class UserWithTodosDto {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  todos: {
    id: string;
    title: string;
    description: string;
    status: string;
    createdAt: Date;
  }[];
}

export class Todo {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly status: string,
    public readonly userId: string,
    public readonly createdAt: Date,
    public readonly updatedAt?: Date,
  ) {}
}

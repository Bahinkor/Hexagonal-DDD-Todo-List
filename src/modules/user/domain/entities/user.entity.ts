export class User {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly password: string,
    public readonly createdAt: Date,
    public readonly updatedAt?: Date,
  ) {}
}

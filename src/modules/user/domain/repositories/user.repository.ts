import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findOneById(id: string): Promise<User | null>;
  abstract findOneByUsername(username: string): Promise<User | null>;
}

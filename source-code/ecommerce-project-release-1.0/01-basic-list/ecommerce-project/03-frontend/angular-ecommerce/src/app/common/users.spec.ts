import { Users, newUser } from './users';

describe('Users', () => {
  it('should create a new Users instance', () => {
    const user = new Users(
      1,
      'test@example.com',
      'password123',
      'John',
      'Doe',
      'photo.jpg',
      true
    );

    expect(user.id).toBe(1);
    expect(user.email).toBe('test@example.com');
    expect(user.password).toBe('password123');
    expect(user.firstName).toBe('John');
    expect(user.lastName).toBe('Doe');
    expect(user.photos).toBe('photo.jpg');
    expect(user.enabled).toBe(true);
  });
  it('should create a new newUser instance', () => {
    const user = new newUser('test@example.com', 'password123', 'John', 'Doe');

    expect(user.email).toBe('test@example.com');
    expect(user.password).toBe('password123');
    expect(user.firstName).toBe('John');
    expect(user.lastName).toBe('Doe');
  });
});

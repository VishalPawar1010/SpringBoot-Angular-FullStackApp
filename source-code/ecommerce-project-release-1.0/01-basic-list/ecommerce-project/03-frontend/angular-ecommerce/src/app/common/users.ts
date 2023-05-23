export class Users {
  constructor(
    public id: number,
    public email: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public roles: string,
    public enabled: string,
    public photos: string
  ) {}
}
export class newUser {
  constructor(
    public email: string,
    public password: string,
    public firstName: string,
    public lastName: string
  ) {}
}

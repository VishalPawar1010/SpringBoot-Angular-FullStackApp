export class Users {
  constructor(
    public id: number,
    public email: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    // public roles: string,
    public photos: string,
    public enabled: boolean
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

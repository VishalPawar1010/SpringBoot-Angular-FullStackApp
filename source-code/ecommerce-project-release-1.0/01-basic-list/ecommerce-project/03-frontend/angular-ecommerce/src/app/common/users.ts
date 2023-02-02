export class Users {
  constructor(
    public email: string,
    public firstName: string,
    public lastName: string,
    public roles: string,
    public enabled: string,
    public photos: string
  ) {}
}

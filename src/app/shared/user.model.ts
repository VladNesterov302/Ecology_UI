export class User {
  UserName: string;
  Password: string;
}
export class UserReg {
  constructor(
    public Id: string,
    public Created: string,
    public Email: string,

    public Password: string,
    public UserName: string,
    public RoleId: string,
    public RoleName: string,
    public Name: string,
    public Surname: string,

  ) { }
}

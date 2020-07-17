export interface IUser {
  id?: any;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default class User implements IUser {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public id?: any,
  ) { }
}

// export default interface User extends Document {
//   id?: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
// }

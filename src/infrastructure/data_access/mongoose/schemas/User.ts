import * as mongoose from "mongoose";
import { IUser } from './../../../../domain/entities/User';

export interface UserModel extends IUser, mongoose.Document { }

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});


export default mongoose.model<UserModel>("User", userSchema);


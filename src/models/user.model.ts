import mongoose from "mongoose";

interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    role: string;
}

const userSchema = new mongoose.Schema<IUser>({
    name: { required: true, type: String },
    email: { required: true, type: String },
    password: { required: true, type: String },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
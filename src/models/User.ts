import mongoose, {model, Model, Schema} from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  roles: string[];
  password: string;
}

// Define the schema
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  roles: { type: [String], required: true },
  password: { type: String, required: true },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Check if model already exists to avoid OverwriteModelError in development
const User: Model<IUser> = mongoose.models.User || model<IUser>('User', userSchema);

export default User;

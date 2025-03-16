import dbConnect from "@/lib/mongoose";
import User, {IUser} from "@/models/User";
import {NextResponse} from "next/server";
import {Types} from "mongoose";

export async function getUsers(): Promise<NextResponse<IUser[] | {error: string}>> {
  try {
    await dbConnect();
    const users = await User.find({}).lean();
    return NextResponse.json<IUser[]>(users);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching users.' + error }, { status: 500 });
  }
}

export async function getUserById(userId: string): Promise<IUser | null> {
  await dbConnect();
  // Convert string to ObjectId for querying
  const user = await User.findById(new Types.ObjectId(userId)).lean();
  return user as IUser;
}

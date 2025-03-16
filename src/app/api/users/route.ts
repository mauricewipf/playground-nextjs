import {NextRequest, NextResponse} from 'next/server';
import User from '../../../models/User';
import dbConnect from "@/lib/mongoose";
import {verifySession} from "@/lib/session";
import {getUsers} from "@/services/user-service";

// POST: Create a new user
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    const user = new User(body);
    await user.save();

    return NextResponse.json({ message: 'User created', user }, { status: 201 });
  } catch (error: any) {
    // Check if the error is a duplicate key error (code 11000)
    if (error.name === 'MongoServerError' && error.code === 11000) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Error creating user.' + error }, { status: 500 });
  }
}

// GET: Fetch all users
export async function GET() {
  const session = await verifySession()

  if (!session?.isAuth) {
    // User is not authenticated
    return NextResponse.json(
      { error: `Access denied.` },
      { status: 401 }
    );
  }

  // Check if the user has the 'admin' role
  if (!session?.user?.roles?.includes('admin')) {
    // User is authenticated but does not have the right permissions
    return NextResponse.json(
      { error: `Access denied. Roles ${JSON.stringify(session.roles)} are not sufficient.` },
      { status: 500 }
    );
  }

  return await getUsers();
}

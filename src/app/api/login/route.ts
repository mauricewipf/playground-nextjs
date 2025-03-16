import {NextRequest, NextResponse} from 'next/server';
import User from '../../../models/User';
import bcrypt from 'bcrypt';
import dbConnect from "@/lib/mongoose";
import {createSession} from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = {...user.toObject(), _id: user._id.toString()};

    // Create user session
    const sessionToken = await createSession(userWithoutPassword);

    // Return user data (excluding password)
    return NextResponse.json({
      message: 'Login successful',
      user: userWithoutPassword,
      sessionToken
    });
  } catch (error) {
    return NextResponse.json({ error: 'Error during login' + error }, { status: 500 });
  }
}

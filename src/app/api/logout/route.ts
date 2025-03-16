import {deleteSession} from "@/lib/session";
import {NextResponse} from "next/server";

export async function GET() {
  try {

    await deleteSession();
    return NextResponse.json({
      message: 'Logout successful',
      status: 200
    });

  } catch (error) {
    return NextResponse.json({
      error: 'Error during logout' + error,
      status: 500
    });
  }

}

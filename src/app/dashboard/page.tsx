import {verifySession} from "@/lib/session";

export default async function Dashboard() {
  const session = await verifySession()
  const isAuth: boolean = session?.isAuth;

  if (isAuth) {
    return <>Your are logged in. Your session is: {JSON.stringify(session)}</>;
  } else {
    return <>No session found.</>;
  }
}
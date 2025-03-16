import {verifySession} from "@/lib/session";
import {getUsers} from "@/services/user-service";
import {IUser} from "@/models/User";

export const dynamic = 'force-dynamic'

export default async function UsersPage() {
  let users: IUser[] = [];
  try {
    const {isAuth} = await verifySession()
    if (isAuth) {
      const data = await getUsers();
      users = await data.json();
    }
  }  catch (e) {
    console.error('API Fetch error', e);
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user: IUser) => (
          <li key={user._id}>
            {user.name} - {user.email} - {user._id}
          </li>
        ))}
      </ul>
    </div>
  );
}

import 'server-only'
import {jwtVerify, SignJWT} from 'jose'
import {cookies} from "next/headers";
import {cache} from "react";
import {IUser} from "@/models/User";

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
const sessionCookieName = 'playground-nextjs-session'

export async function encrypt(payload: {user: Omit<IUser, 'password'>, expiresAt: Date}): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined) {
  if (!session) return null;

  try {
    const jwt = await jwtVerify<{user: Omit<IUser, 'password'>}>(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return jwt?.payload
  } catch (error) {
    console.log('Failed to verify session:', error)
    return null
  }
}

export async function createSession(user: Omit<IUser, 'password'>) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const sessionToken = await encrypt({ user, expiresAt})
  const cookieStore = await cookies()

  cookieStore.set(sessionCookieName, sessionToken, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })

  return sessionToken;
}

export async function updateSession() {
  const session = (await cookies()).get(sessionCookieName)?.value
  const payload = await decrypt(session)

  if (!session || !payload) {
    return null
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  const cookieStore = await cookies()
  cookieStore.set(sessionCookieName, session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
}

export const verifySession: () => Promise<any> = cache(async () => {
  const cookie = (await cookies()).get(sessionCookieName)?.value
  const session = await decrypt(cookie)

  if (!session?.user?._id || (session?.expiresAt && session.expiresAt < new Date())) {
    return {
      isAuth: false,
    }

  }

  return {
    ...session,
    isAuth: true,
  }
})

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete(sessionCookieName)
}

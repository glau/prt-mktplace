import { http, HttpResponse } from 'msw';
import { addUser, findUserByEmail, getSession, putSession, seedDefaultUserOnce, type StoredUser } from './authStore';

function createToken(email: string): string {
  const raw = `${email}.${Date.now()}.${Math.random().toString(36).slice(2)}`;
  if (typeof btoa !== 'undefined') return btoa(raw);
  try { return Buffer.from(raw).toString('base64'); } catch { return raw; }
}

async function readJson<T>(request: Request): Promise<T | null> {
  try {
    return (await request.json()) as T;
  } catch {
    return null;
  }
}

function extractBearer(req: Request): string | undefined {
  const auth = req.headers.get('authorization') || req.headers.get('Authorization');
  if (!auth) return undefined;
  const [type, token] = auth.split(' ');
  if (type?.toLowerCase() !== 'bearer') return undefined;
  return token || undefined;
}

export const authHandlers = [
  // Register new user
  http.post('*/api/auth/register', async ({ request }) => {
    seedDefaultUserOnce();
    const body = await readJson<{ email?: string; password?: string }>(request);
    const email = body?.email?.trim().toLowerCase();
    const password = body?.password ?? '';
    if (!email || !password) {
      return HttpResponse.json({ message: 'email and password required' }, { status: 400 });
    }

    const existing = findUserByEmail(email);
    if (existing) {
      return HttpResponse.json({ message: 'email already registered' }, { status: 409 });
    }

    const user: StoredUser = { email, password };
    addUser(user);

    const token = createToken(email);
    putSession(token, email);

    return HttpResponse.json({ user: { email }, token }, { status: 201 });
  }),

  // Login
  http.post('*/api/auth/login', async ({ request }) => {
    seedDefaultUserOnce();
    const body = await readJson<{ email?: string; password?: string }>(request);
    const email = body?.email?.trim().toLowerCase();
    const password = body?.password ?? '';
    if (!email || !password) {
      return HttpResponse.json({ message: 'email and password required' }, { status: 400 });
    }

    const user = findUserByEmail(email);
    if (!user || user.password !== password) {
      return HttpResponse.json({ message: 'invalid credentials' }, { status: 401 });
    }

    const token = createToken(email);
    putSession(token, email);
    return HttpResponse.json({ user: { email }, token }, { status: 200 });
  }),

  // Session validation
  http.get('*/api/auth/session', async ({ request }) => {
    seedDefaultUserOnce();
    const token = extractBearer(request);
    if (!token) {
      return HttpResponse.json({ message: 'missing token' }, { status: 401 });
    }
    const sess = getSession(token);
    if (!sess) {
      return HttpResponse.json({ message: 'invalid token' }, { status: 401 });
    }
    return HttpResponse.json({ user: { email: sess.email } }, { status: 200 });
  }),
];

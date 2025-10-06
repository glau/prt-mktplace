import { describe, it, expect, beforeEach } from '@/test';

const BASE = '';

async function post(path: string, body: any, token?: string) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  const data = await (async () => {
    try { return await res.json(); } catch { return null; }
  })();
  return { res, data } as const;
}

async function get(path: string, token?: string) {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  const data = await (async () => {
    try { return await res.json(); } catch { return null; }
  })();
  return { res, data } as const;
}

describe('MSW auth handlers', () => {
  const defaultUser = { email: 'teste@teste.com', password: '1234' };

  beforeEach(() => {
    // Clear session token between tests
    if (typeof sessionStorage !== 'undefined') sessionStorage.clear();
  });

  it('allows login with seeded default user and returns a token', async () => {
    const { res, data } = await post('/api/auth/login', defaultUser);
    expect(res.status).toBe(200);
    expect(data).toHaveProperty('token');
    expect(data).toHaveProperty('user');
    expect(data.user.email).toBe(defaultUser.email);
  });

  it('registers a new user, then validates session with returned token', async () => {
    const email = `user${Math.random().toString(16).slice(2)}@test.com`;
    const password = 'pass';

    const reg = await post('/api/auth/register', { email, password });
    expect([200, 201]).toContain(reg.res.status);
    expect(reg.data).toHaveProperty('token');
    expect(reg.data.user.email).toBe(email);

    const token = reg.data.token as string;
    const sess = await get('/api/auth/session', token);
    expect(sess.res.status).toBe(200);
    expect(sess.data.user.email).toBe(email);
  });

  it('rejects duplicate registration with 409', async () => {
    const email = `dupe${Math.random().toString(16).slice(2)}@test.com`;
    const password = 'x';

    const first = await post('/api/auth/register', { email, password });
    expect([200, 201]).toContain(first.res.status);

    const second = await post('/api/auth/register', { email, password });
    expect(second.res.status).toBe(409);
  });

  it('rejects bad credentials with 401 on login', async () => {
    const { res } = await post('/api/auth/login', { email: defaultUser.email, password: 'wrong' });
    expect(res.status).toBe(401);
  });

  it('rejects missing/invalid token on session endpoint', async () => {
    const noToken = await get('/api/auth/session');
    expect([400, 401]).toContain(noToken.res.status);

    const badToken = await get('/api/auth/session', 'invalid.token');
    expect([400, 401]).toContain(badToken.res.status);
  });
});

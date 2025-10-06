// Storage abstraction for auth data used by MSW handlers
// - In browser (JSDOM/window), persists to sessionStorage under namespaced keys
// - In Node (Vitest + MSW node server), falls back to in-memory module state

const USERS_KEY = 'msw:auth:users';
const SESSIONS_KEY = 'msw:auth:sessions';
const SEED_KEY = 'msw:auth:seeded';

export type StoredUser = {
  email: string;
  password: string;
};

export type SessionMap = Record<string, { email: string; createdAt: number }>; // token -> session info

let memoryUsers: StoredUser[] = [];
let memorySessions: SessionMap = {};
let memorySeeded = false;

function hasSessionStorage(): boolean {
  try {
    return typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined';
  } catch {
    return false;
  }
}

function readUsers(): StoredUser[] {
  if (hasSessionStorage()) {
    try {
      const raw = window.sessionStorage.getItem(USERS_KEY);
      return raw ? (JSON.parse(raw) as StoredUser[]) : [];
    } catch { return []; }
  }
  return memoryUsers;
}

function writeUsers(users: StoredUser[]): void {
  if (hasSessionStorage()) {
    try { window.sessionStorage.setItem(USERS_KEY, JSON.stringify(users)); } catch {}
    return;
  }
  memoryUsers = users;
}

function readSessions(): SessionMap {
  if (hasSessionStorage()) {
    try {
      const raw = window.sessionStorage.getItem(SESSIONS_KEY);
      return raw ? (JSON.parse(raw) as SessionMap) : {};
    } catch { return {}; }
  }
  return memorySessions;
}

function writeSessions(sessions: SessionMap): void {
  if (hasSessionStorage()) {
    try { window.sessionStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions)); } catch {}
    return;
  }
  memorySessions = sessions;
}

function getSeeded(): boolean {
  if (hasSessionStorage()) {
    try { return window.sessionStorage.getItem(SEED_KEY) === '1'; } catch { return false; }
  }
  return memorySeeded;
}

function setSeeded(): void {
  if (hasSessionStorage()) {
    try { window.sessionStorage.setItem(SEED_KEY, '1'); } catch {}
    return;
  }
  memorySeeded = true;
}

export function seedDefaultUserOnce(): void {
  if (getSeeded()) return;
  const users = readUsers();
  const exists = users.some(u => u.email === 'teste@teste.com');
  if (!exists) {
    users.push({ email: 'teste@teste.com', password: '1234' });
    writeUsers(users);
  }
  setSeeded();
}

export function findUserByEmail(email: string): StoredUser | undefined {
  return readUsers().find(u => u.email === email);
}

export function addUser(user: StoredUser): void {
  const users = readUsers();
  users.push(user);
  writeUsers(users);
}

export function putSession(token: string, email: string): void {
  const sessions = readSessions();
  sessions[token] = { email, createdAt: Date.now() };
  writeSessions(sessions);
}

export function getSession(token: string | undefined): { email: string } | null {
  if (!token) return null;
  const sessions = readSessions();
  const s = sessions[token];
  return s ? { email: s.email } : null;
}

export function clearAllAuthData(): void {
  writeUsers([]);
  writeSessions({});
  if (hasSessionStorage()) {
    try { window.sessionStorage.removeItem(SEED_KEY); } catch {}
  } else {
    memorySeeded = false;
  }
}

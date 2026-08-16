// Thin wrapper around localStorage for WhereAmI.
// NOTE: This is client-side, unencrypted storage meant for learning purposes.
// It is NOT secure auth — do not use this pattern for a real production app.

const USERS_KEY = "whereami_users";
const SESSION_KEY = "whereami_session";

function isBrowser() {
  return typeof window !== "undefined";
}

/** Very light obfuscation so passwords aren't sitting in plain text.
 * This is NOT real security — a proper app would hash + salt server-side. */
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return `h_${hash}`;
}

export function getUsers() {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  if (!isBrowser()) return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function findUserByUsername(username) {
  const normalized = username.trim().toLowerCase();
  return getUsers().find((u) => u.username.toLowerCase() === normalized);
}

export function createUser({ name, username, password }) {
  const users = getUsers();
  if (findUserByUsername(username)) {
    return { ok: false, error: "That username is already taken." };
  }
  const newUser = {
    name: name.trim(),
    username: username.trim(),
    passwordHash: simpleHash(password),
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  saveUsers(users);
  return { ok: true, user: newUser };
}

export function verifyUser({ username, password }) {
  const user = findUserByUsername(username);
  if (!user) return { ok: false, error: "No account found with that username." };
  if (user.passwordHash !== simpleHash(password)) {
    return { ok: false, error: "Incorrect password." };
  }
  return { ok: true, user };
}

export function setSession(username) {
  if (!isBrowser()) return;
  localStorage.setItem(SESSION_KEY, JSON.stringify({ username, at: Date.now() }));
}

export function getSession() {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  if (!isBrowser()) return;
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser() {
  const session = getSession();
  if (!session) return null;
  const user = findUserByUsername(session.username);
  return user || null;
}

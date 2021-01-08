import { createNamespace } from 'cls-hooked';
import { IUser } from '../types';

// This module sets up a session to keep info about a loggedIn user
// throughout the lifetime of a request
export const session = createNamespace('request-session');
const LOGGED_IN_USER = 'loggedInUser';

export function setLoggedInUser(payload: Partial<IUser>) {
	session.set(LOGGED_IN_USER, payload);
}

export function getLoggedInUser(): Partial<IUser> {
	return session.get(LOGGED_IN_USER);
}

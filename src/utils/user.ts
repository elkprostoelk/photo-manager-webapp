export function isUserLoggedIn() {
    const user = getLoggedInUser();
    return user
        && user.id !== null
        && user.id !== undefined
        && (Date.now() / 1000) < user.expired;
}

export function getLoggedInUser(): LoggedInUser | null {
    const storedValue = localStorage.getItem("jwt");
    if (!storedValue) {
        return null;
    }
    const parsedValue = JSON.parse(atob(storedValue.split('.')[1]));
    return {
        id: parsedValue['sub'],
        name: parsedValue['name'],
        role: parsedValue['typ'],
        expired: parsedValue['exp'],
    };
}

export function logoutUser() {
    localStorage.removeItem('jwt');
}

export interface LoggedInUser {
    id: string;
    name: string;
    role: string;
    expired: number;
}
// Authentication utilities

class Auth {
    static getToken() {
        return localStorage.getItem('token');
    }

    static setToken(token) {
        localStorage.setItem('token', token);
    }

    static getUser() {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }

    static setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    static isAuthenticated() {
        return !!this.getToken();
    }

    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/admin';
    }

    static async login(username, password) {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Login failed');
        }

        const data = await response.json();
        this.setToken(data.token);
        this.setUser(data.user);
        return data;
    }

    static checkAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = '/admin';
            return false;
        }
        return true;
    }
}

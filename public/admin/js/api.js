// API client utilities
const API_URL = 'http://localhost:3000/api';

class API {
    static async request(endpoint, options = {}) {
        // Check if Auth is available when the method is called, not when the class is defined
        const token = (typeof Auth !== 'undefined') ? Auth.getToken() : null;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers
        });

        if (response.status === 401 && typeof Auth !== 'undefined') {
            Auth.logout();
            throw new Error('Session expired');
        }

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Request failed');
        }

        return await response.json();
    }

    // Agrupaciones
    static async getAgrupaciones() {
        return this.request('/agrupaciones');
    }

    static async getAgrupacion(id) {
        return this.request(`/agrupaciones/${id}`);
    }

    static async createAgrupacion(data) {
        return this.request('/agrupaciones', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    static async updateAgrupacion(id, data) {
        return this.request(`/agrupaciones/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    static async deleteAgrupacion(id) {
        return this.request(`/agrupaciones/${id}`, {
            method: 'DELETE'
        });
    }

    // Integrantes
    static async getIntegrantes() {
        return this.request('/integrantes');
    }

    static async getIntegrante(id) {
        return this.request(`/integrantes/${id}`);
    }

    static async createIntegrante(data) {
        return this.request('/integrantes', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    static async updateIntegrante(id, data) {
        return this.request(`/integrantes/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    static async deleteIntegrante(id) {
        return this.request(`/integrantes/${id}`, {
            method: 'DELETE'
        });
    }

    // Eventos
    static async getEventos() {
        return this.request('/eventos');
    }

    static async getEvento(id) {
        return this.request(`/eventos/${id}`);
    }

    static async createEvento(data) {
        return this.request('/eventos', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    static async updateEvento(id, data) {
        return this.request(`/eventos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    static async deleteEvento(id) {
        return this.request(`/eventos/${id}`, {
            method: 'DELETE'
        });
    }
}

// Utility functions
function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;

    const container = document.querySelector('.main-content') || document.body;
    container.insertBefore(alertDiv, container.firstChild);

    setTimeout(() => alertDiv.remove(), 5000);
}

function showLoading() {
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    spinner.id = 'loading-spinner';
    document.body.appendChild(spinner);
}

function hideLoading() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) spinner.remove();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-UY', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function confirmDelete(message = '¿Estás seguro de que deseas eliminar este elemento?') {
    return confirm(message);
}

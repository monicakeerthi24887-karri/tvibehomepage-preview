const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

class ApiClient {
  constructor() {
    this.token = null;
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('tvibe_token');
    }
  }

  setToken(token) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('tvibe_token', token);
      } else {
        localStorage.removeItem('tvibe_token');
      }
    }
  }

  async request(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const config = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(`${API_URL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.message || 'API request failed');
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  // --- AUTHENTICATION ---
  async register(email, password, fullName, phone, city) {
    const { data, error } = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, full_name: fullName, phone, city }),
    });
    
    if (data?.access_token) {
      this.setToken(data.access_token);
    }
    return { data, error };
  }

  async login(email, password) {
    const { data, error } = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (data?.access_token) {
      this.setToken(data.access_token);
    }
    return { data, error };
  }

  logout() {
    this.setToken(null);
  }

  async getMe() {
    return this.request('/auth/me', { method: 'GET' });
  }

  async getTransactions() {
    return this.request('/auth/transactions', { method: 'GET' });
  }

  async getUserBadges() {
    return this.request('/auth/badges', { method: 'GET' });
  }

  // --- OTP FLOW ---
  async sendOtp(phone, email) {
    return this.request('/auth/otp/send', {
      method: 'POST',
      body: JSON.stringify({ phone, email }),
    });
  }

  async verifyOtp(phone, email, phoneCode, emailCode) {
    const { data, error } = await this.request('/auth/otp/verify', {
      method: 'POST',
      body: JSON.stringify({ phone, email, phone_code: phoneCode, email_code: emailCode }),
    });

    if (data?.access_token) {
      this.setToken(data.access_token);
    }
    return { data, error };
  }

  // --- LUCKY DRAWS ---
  async getDraws() {
    return this.request('/draws', { method: 'GET' });
  }

  async createDraw(drawData) {
    return this.request('/draws', {
      method: 'POST',
      body: JSON.stringify(drawData),
    });
  }

  async enterDraw(drawId, answers = {}) {
    return this.request(`/draws/${drawId}/enter`, {
      method: 'POST',
      body: JSON.stringify({ answers }),
    });
  }

  // --- VOTING ---
  async castVote(targetId, targetType) {
    return this.request('/vote', {
      method: 'POST',
      body: JSON.stringify({ target_id: targetId, target_type: targetType }),
    });
  }

  async getTrending() {
    return this.request('/trending', { method: 'GET' });
  }

  // --- ANALYTICS ---
  async getHeatmap() {
    return this.request('/analytics/heatmap', { method: 'GET' });
  }

  // --- VENDOR ---
  async createVendorGame(gameData) {
    return this.request('/vendor/games', {
      method: 'POST',
      body: JSON.stringify(gameData)
    });
  }

  async getUserVotes(userId) {
    return this.request(`/votes?user_id=${userId}`, { method: 'GET' });
  }

  // --- COLLABORATION HUB ---
  async requestCollab(targetEmail, message, budget) {
    return this.request('/collabs/request', {
      method: 'POST',
      body: JSON.stringify({ target_email: targetEmail, message, budget }),
    });
  }

  async negotiateCollab(collabId, message, proposedBudget) {
    return this.request('/collabs/negotiate', {
      method: 'POST',
      body: JSON.stringify({ collab_id: collabId, message, proposed_budget: proposedBudget }),
    });
  }

  async actionCollab(collabId, action) {
    return this.request('/collabs/action', {
      method: 'POST',
      body: JSON.stringify({ collab_id: collabId, action }),
    });
  }

  async getCollabs() {
    return this.request('/collabs', { method: 'GET' });
  }

  // --- TICKETING & WALLET ---
  async getPricing() {
    return this.request('/tickets/pricing', { method: 'GET' });
  }

  async purchaseTicket(tier) {
    return this.request('/tickets/purchase', {
      method: 'POST',
      body: JSON.stringify({ tier }),
    });
  }

  async getMyTickets() {
    return this.request('/tickets/my-ticket', { method: 'GET' });
  }

  async scanWallet(userQrToken, amountToDeduct) {
    return this.request('/wallet/scan', {
      method: 'POST',
      body: JSON.stringify({ user_qr_token: userQrToken, amount_to_deduct: amountToDeduct }),
    });
  }

  // --- ADMIN ---
  async getAdminUsers() {
    return this.request('/admin/users', { method: 'GET' });
  }
}

export const api = new ApiClient();

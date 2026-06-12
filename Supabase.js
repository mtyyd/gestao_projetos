// ============================================================
// supabase.js — Configuração do cliente Supabase
// Substitua os valores abaixo com os do seu projeto:
// Supabase → Settings → API
// ============================================================

const SUPABASE_URL = 'https://uvldmqhdosdfbwlvbxlc.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Txr2b4sZOOxk6MlNoQMbxg_dmj5jJO0';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_KEY);

// ============================================================
// SESSÃO
// ============================================================

const Sessao = {
  _chave: 'gq_usuario',

  salvar(usuario) {
    try {
      localStorage.setItem(this._chave, JSON.stringify(usuario));
    } catch(e) {
      console.error('Erro ao salvar sessão:', e);
    }
  },

  obter() {
    try {
      const raw = localStorage.getItem(this._chave);
      if (!raw) return null;
      const u = JSON.parse(raw);
      // Validar que tem os campos mínimos
      if (!u || !u.id || !u.usuario) return null;
      return u;
    } catch {
      return null;
    }
  },

  encerrar() {
    try { localStorage.removeItem(this._chave); } catch(e) {}
    window.location.href = 'login.html';
  },

  exigir() {
    const u = this.obter();
    if (!u) {
      window.location.href = 'login.html';
      return null;
    }
    return u;
  },

  exigirAdmin() {
    const u = this.exigir();
    if (u && u.perfil !== 'admin') {
      window.location.href = 'dashboard.html';
      return null;
    }
    return u;
  }
};

// ============================================================
// supabase.js — Configuração do cliente Supabase
// Substitua os valores abaixo com os do seu projeto:
// Supabase → Settings → API
// ============================================================

const SUPABASE_URL  = 'https://uvldmqhdosdfbwlvbxlc.supabase.co';
const SUPABASE_KEY  = 'sb_publishable_Txr2b4sZOOxk6MlNoQMbxg_dmj5jJO0';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_KEY);

// ============================================================
// SESSÃO — armazena o usuário logado no localStorage
// ============================================================

const Sessao = {
    salvar(usuario) {
        localStorage.setItem('gq_sessao', JSON.stringify(usuario));
    },
    obter() {
        try {
            return JSON.parse(localStorage.getItem('gq_sessao'));
        } catch { return null; }
    },
    encerrar() {
        localStorage.removeItem('gq_sessao');
        window.location.href = 'login.html';
    },
    exigir() {
        const u = this.obter();
        if (!u) window.location.href = 'login.html';
        return u;
    },
    exigirAdmin() {
        const u = this.exigir();
        if (u.perfil !== 'admin') window.location.href = 'dashboard.html';
        return u;
    }
};
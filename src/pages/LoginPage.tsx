import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const loginUrl = (typeof window !== 'undefined' && window.location.hostname === 'localhost') ? 'http://localhost:4000/login' : '/.netlify/functions/login';
      const res = await fetch(loginUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) throw new Error("Usuário ou senha inválidos");
      const data = await res.json();
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("isAdminAuthenticated", "true");
      navigate("/admin");
    } catch (err) {
      setError("Usuário ou senha inválidos");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-rosalex-pink-50 px-2">
      <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-8 rounded-lg shadow max-w-xs sm:max-w-sm w-full space-y-6 animate-fade-in">
        <h2 className="text-xl sm:text-2xl font-bold text-rosalex-pink-800 mb-3 sm:mb-4 text-center">Área Administrativa</h2>
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        <div>
          <label className="block text-rosalex-pink-700 mb-1">Usuário</label>
          <input
            type="text"
            className="w-full border border-rosalex-pink-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rosalex-pink-400 text-base"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-rosalex-pink-700 mb-1">Senha</label>
          <input
            type="password"
            className="w-full border border-rosalex-pink-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rosalex-pink-400 text-base"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-rosalex-pink-600 text-white py-2 rounded font-semibold hover:bg-rosalex-pink-700 transition-all duration-200"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
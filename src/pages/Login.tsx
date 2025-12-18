import { login } from "@/services/LoginService";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginPageProps {
  onLogin?: (email: string, password: string) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Informe um e‑mail válido.";
    if (!password) return "Informe sua senha.";
    return null;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const msg = await login(email, password);
      localStorage.setItem("token", msg.data.token);
      console.log(msg);
      if (msg?.data?.token) {
        navigate(`/${msg?.data?.user?.id}`);
      }
    }
    catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md overflow-hidden">
        <div
          className="p-6 text-white"
          style={{
            background: "linear-gradient(90deg,#0f9e9a 0%,#30c2b7 60%)",
            backgroundImage: "linear-gradient(90deg,#0f9e9a 0%,#30c2b7 60%), url('/mnt/data/fea41130-e289-4cd1-abd2-629c95917c8c.png')",
            backgroundBlendMode: "overlay",
          }}
        >
          <h2 className="text-2xl font-semibold">Entrar</h2>
          <p className="mt-1 opacity-90 text-sm">Acesse sua conta e descubra o que esta acontecendo de bom perto de você</p>
        </div>

        <form className="p-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">E‑mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-teal-300"
                placeholder="seu@exemplo.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-teal-300"
                placeholder="Sua senha"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember((v) => !v)}
                  className="mr-2 rounded text-teal-600 focus:ring-teal-300"
                />
                Lembrar-me
              </label>

              <button
                type="button"
                className="text-sm text-teal-600 underline"
                onClick={() => alert("Fluxo de recuperação de senha (placeholder)")}
              >
                Esqueci a senha
              </button>
            </div>

            {error && <div className="text-sm text-rose-600">{error}</div>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg bg-teal-600 text-white font-medium shadow hover:opacity-95 disabled:opacity-60"
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>
            </div>

            <div className="text-center text-sm text-gray-500">
              <span>Não tem conta? </span>
              <a onClick={() => navigate("/create-account")} className="text-teal-600 underline ml-1">
                Criar conta
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

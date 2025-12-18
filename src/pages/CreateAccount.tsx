import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "@/services/RegisterService";

export interface UserProfile {
  name: string;
  email: string;
  password: string;
  interests: string[];
}

interface RegisterFormProps {
  onSubmit?: (profile: UserProfile) => void;
}


const ALL_INTERESTS = [
  "Tecnologia",
  "Esportes",
  "Cultura",
  "Música",
  "Leitura",
  "Gastronomia",
  "Voluntariado",
];

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [msgReturn, setMsgReturn] = useState<any>();

  useEffect(() => {
    const savedName = localStorage.getItem("redondeza_nickname");

    // Vamos colocar um log para você ver no Console (F12) se está achando algo
    console.log("Valor encontrado no localStorage:", savedName);

    if (savedName) {
      setName(savedName);
    }

  }, []);

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const validate = () => {
    if (!name.trim()) return "Informe o seu nome.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Informe um e-mail válido.";
    if (password.length < 6) return "A senha deve ter ao menos 6 caracteres.";
    return null;
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    console.log(e);
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError(null);
    setLoading(true);

    const profile: UserProfile = { name: name.trim(), email: email.trim(), password, interests };
    console.log(profile);
    if (profile) {
      registerDatas(profile);
    }
  };

  const registerDatas = async (profile: UserProfile) => {
    const lati = localStorage.getItem("latitude");
    const long = localStorage.getItem("longitude");
    try {
      const msg = await register(profile.name, profile.email, profile.password, profile.interests, lati, long);
      setMsgReturn(msg);
    }
    catch (error) {
      console.error("Erro na requisição:", error);
    }
    finally {
      localStorage.setItem("redondeza_nickname", name);
      navigate('/');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Header com gradiente inspirado na imagem do seu site */}
        <div
          className="p-8 pb-12"
          style={{
            background: "linear-gradient(90deg,#0f9e9a 0%,#30c2b7 60%)",
            backgroundImage:
              "linear-gradient(90deg,#0f9e9a 0%,#30c2b7 60%), url('/mnt/data/fea41130-e289-4cd1-abd2-629c95917c8c.png')",
            backgroundBlendMode: "overlay",
            color: "white",
          }}
        >
          <h1 className="text-2xl font-semibold">Crie sua conta</h1>
          <p className="mt-1 opacity-90">Junte-se à comunidade e descubra eventos perto de você</p>
          <p>{msgReturn?.response?.data?.error ? msgReturn?.response?.data?.error : ''}</p>
        </div>


        <form className="p-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                className="mt-1 block w-full rounded-lg border border-gray-200 shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-teal-300"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">E-mail</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-lg border border-gray-200 shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-teal-300"
                placeholder="seu@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Senha</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-lg border border-gray-200 shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-teal-300"
                placeholder="No mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Interesses</label>
              <p className="text-xs text-gray-500 mt-1">Escolha alguns interesses para personalizar sua experiência</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {ALL_INTERESTS.map((i) => {
                  const active = interests.includes(i);
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => toggleInterest(i)}
                      className={`px-3 py-1.5 rounded-full border transition-all text-sm font-medium focus:outline-none shadow-sm ${active
                        ? "bg-teal-100 border-teal-300 text-teal-800"
                        : "bg-white border-gray-200 text-gray-700"
                        }`}
                    >
                      {i}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {error && <div className="mt-4 text-sm text-rose-600">{error}</div>}

          <div className="mt-6 flex items-center justify-between">
            <div>
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-teal-600 text-white font-medium shadow hover:opacity-95 disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Cadastrando..." : "Criar conta"}
              </button>
            </div>

            <div className="text-sm text-gray-500">
              <span>Já tem conta? </span>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-teal-600 underline ml-1"
              >
                Entrar
              </button>
            </div>
          </div>

          <div className="mt-6 text-xs text-gray-400">
            Ao criar a conta você concorda com os nossos termos e políticas.
          </div>
        </form>
      </div>
    </div>
  );
}

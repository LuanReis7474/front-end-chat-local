import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerRoom } from "@/services/RoomService";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
    sub: string;
    email: string;
    name?: string;
    exp: number;
}

const CATEGORIES_OPTIONS = [
    "Segurança e Alertas",
    "Eventos Locais",
    "Serviços Locais",
    "Meio Ambiente",
    "Infraestrutura",
    "Educação",
    "Vagas de Emprego",
    "Compra e Venda",
    "Imóveis e Aluguel",
    "Problemas Urbanos",
    "Esportes e Atividades Físicas",
    "Artesanato e Produção Local",
    "História e Memória do Bairro",
    "Política",
    "Tecnologia e Internet",
    "Clima e Previsão do Tempo",
    "Economia",
    "Economia Local",
    "Voluntariado e Ação Social",
    "Achados e Perdidos",
    "Academia & Fitness",
    "Ajuda Mútua",
    "Animes & Mangás",
    "Artes",
    "Cerveja Artesanal",
    "Cinema & TV",
    "Design & UX",
    "Direito & Cidadania",
    "Empreendedorismo",
    "Festas & Eventos",
    "Filosofia",
    "Fotografia",
    "Futebol",
    "Games",
    "Gastronomia",
    "Gastronomia Local",
    "Hardware",
    "História",
    "Inteligência Artificial",
    "Jogos de Tabuleiro",
    "Livros & Literatura",
    "Marketing Digital",
    "Moda",
    "Música",
    "Nutrição",
    "Pets",
    "Programação",
    "Relacionamentos",
    "Religião & Espiritualidade",
    "Saúde",
    "Saúde Mental",
    "Startups",
    "Viagens",
    "Yoga & Meditação",
    "Novidades por perto"
];


export const CreateRoom: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [datasUser, setDatasUser] = useState<any>(null)
    // Estado do Formulário
    const [formData, setFormData] = useState({
        roomName: '',
        description: '',
        capacity: 10,
        roomType: '',
        tags: [] as string[]
    });

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const token = localStorage.getItem("token");
                if (token) {

                    const datasUser = jwtDecode<TokenPayload>(token);

                    setDatasUser(datasUser);
                }
            } catch (error) {
                console.error("Token inválido:", error);
            }
        }
    }, []);
    // Atualiza inputs de texto e select
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedType = e.target.value;
        setFormData(prev => ({ ...prev, roomType: selectedType }));
    };

    // Lógica inteligente de Tags (Máximo 2)
    const toggleTag = (tag: string) => {
        setFormData(prev => {
            const isSelected = prev.tags.includes(tag);

            // 1. Se já tem a tag, remove (sempre permitido)
            if (isSelected) {
                return { ...prev, tags: prev.tags.filter(t => t !== tag) };
            }

            // 2. Se não tem, verifica se já atingiu o limite de 2
            if (prev.tags.length < 2) {
                return { ...prev, tags: [...prev.tags, tag] };
            }

            // 3. Se tentar adicionar a 3ª, não faz nada
            return prev;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {

        if (formData.tags.length === 0) {
            setError("Selecione pelo menos uma categoria.");
            return;
        }

        setIsLoading(true);

        try {
            const msg = registerRoom(datasUser.sub, formData.roomName, formData.roomType, formData.description, Number(formData.capacity), formData.tags);
            console.log(msg);
        } catch (err: any) {
            setError(err.message || "Erro desconhecido");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans p-4">

            {/* Card Principal */}
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">

                {/* Header Verde Teal */}
                <div className="bg-teal-700 p-8 text-white">
                    <h2 className="text-2xl font-bold mb-2">Criar nova sala</h2>
                    <p className="text-teal-100 text-sm">Crie um espaço para debater seus tópicos favoritos</p>
                </div>

                <div className="p-8">
                    {error && (
                        <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-6 text-sm text-center border border-red-200">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* 1. Nome da Sala */}
                        <div>
                            <label htmlFor="roomName" className="block text-sm font-semibold text-gray-700 mb-2">
                                Nome da Sala
                            </label>
                            <input
                                type="text"
                                id="roomName"
                                name="roomName"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                                placeholder="Ex: Toca dos Devs"
                                value={formData.roomName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* 2. Tipo e Capacidade (Lado a Lado) */}
                        <div className="flex flex-col md:flex-row gap-4">

                            {/* Select Tipo */}
                            <div className="w-full md:w-1/2">
                                <label htmlFor="roomType" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Tipo da Sala
                                </label>
                                <div className="relative">
                                    <select
                                        id="roomType"
                                        name="roomType"
                                        value={formData.roomType} // Adicione isso para controlar o input
                                        onChange={handleChangeType} // Passa apenas a referência da função
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none bg-white transition cursor-pointer"
                                    >
                                        <option value="" disabled>Selecione...</option> {/* Adicionei uma opção padrão */}
                                        <option value="discussion">🗣️ Sala de Debate</option>
                                        <option value="event">📅 Evento</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Input Capacidade */}
                            <div className="w-full md:w-1/2">
                                <label htmlFor="capacity" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Capacidade Máxima
                                </label>
                                <input
                                    type="number"
                                    id="capacity"
                                    name="capacity"
                                    min="2"
                                    max="50"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                                    value={formData.capacity}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* 3. Descrição */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                                Descrição
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition resize-none"
                                placeholder="Sobre o que vamos conversar?"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>

                        {/* 4. Categorias com Scroll e Limite */}
                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Categorias
                                    </label>
                                    <span className="block text-xs text-gray-500">
                                        Selecione até 2 assuntos principais
                                    </span>
                                </div>
                                <span className={`text-xs font-bold ${formData.tags.length === 2 ? 'text-teal-600' : 'text-gray-400'}`}>
                                    {formData.tags.length}/2 selecionados
                                </span>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-4 max-h-60 overflow-y-auto bg-gray-50 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                                <div className="flex flex-wrap gap-2">
                                    {CATEGORIES_OPTIONS.map(tag => {
                                        const isSelected = formData.tags.includes(tag);
                                        const isLimitReached = !isSelected && formData.tags.length >= 2;

                                        return (
                                            <button
                                                type="button"
                                                key={tag}
                                                onClick={() => toggleTag(tag)}
                                                disabled={isLimitReached}
                                                className={`
                          px-3 py-1.5 rounded-full text-xs font-medium transition border
                          ${isSelected
                                                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                                                        : 'bg-white text-gray-600 border-gray-300 hover:border-teal-400'}
                          
                          ${isLimitReached ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-teal-50'}
                        `}
                                            >
                                                {tag}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            {/* Aviso de Limite */}
                            {formData.tags.length === 2 && (
                                <p className="text-[10px] text-orange-500 mt-1 text-right">
                                    Limite de categorias atingido. Desmarque uma para trocar.
                                </p>
                            )}
                        </div>

                        {/* Botão Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-teal-700 text-white font-bold py-3.5 rounded-lg hover:bg-teal-800 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                        >
                            {isLoading ? "Criando sala..." : "Criar Sala"}
                        </button>

                    </form>

                    <p className="mt-6 text-xs text-gray-400 text-center">
                        Ao criar uma sala você concorda com as <a href="#" className="text-teal-600 hover:underline">regras da comunidade</a>.
                    </p>
                </div>
            </div>
        </div>
    );
};
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ConteudoNemesis,
  nemesisCarregar,
  nemesisSalvar,
  nemesisRestaurarPadrao,
} from "@/lib/nemesis-conteudo";

// Senha só de "porta fechada" — troque aqui pela que quiser.
// IMPORTANTE: como isso roda no navegador, qualquer pessoa que veja o
// código-fonte consegue ler essa senha. Não é segurança de verdade, é só
// pra impedir cliques por acidente. Pra proteção real, isso precisaria de
// um login com servidor (ex: NextAuth + uma tabela de admins no Prisma).
const SENHA = "nemesis2026";

const campo =
  "w-full bg-[#080808] border border-[rgba(193,18,31,0.22)] text-[#eaeaea] font-[Rajdhani] text-sm px-3.5 py-2.5 focus:outline-none focus:border-[#C1121F]";
const rotuloCampo =
  "block text-xs tracking-[0.08em] uppercase text-[#9a9a9a] mb-2";
const botaoSecundario =
  "font-semibold tracking-[0.05em] uppercase text-xs px-5 py-2.5 border border-[rgba(193,18,31,0.22)] text-[#9a9a9a] hover:text-white hover:border-[#C1121F] transition-colors";
const blocoEditor =
  "border border-[rgba(193,18,31,0.22)] bg-[#151516] p-6 mb-5";

export default function PaginaAdmin() {
  const [autenticado, setAutenticado] = useState(false);
  const [senhaDigitada, setSenhaDigitada] = useState("");
  const [erro, setErro] = useState("");
  const [estado, setEstado] = useState<ConteudoNemesis | null>(null);
  const [status, setStatus] = useState("");

  function entrar() {
    if (senhaDigitada === SENHA) {
      setAutenticado(true);
      setEstado(nemesisCarregar());
    } else {
      setErro("Senha incorreta.");
    }
  }

  function avisar(msg: string) {
    setStatus(msg);
    setTimeout(() => setStatus((atual) => (atual === msg ? "" : atual)), 4000);
  }

  function salvar() {
    if (!estado) return;
    nemesisSalvar(estado);
    avisar("Alterações salvas neste navegador.");
  }

  function restaurarPadrao() {
    if (!confirm("Isso apaga suas edições e volta pro conteúdo padrão. Continuar?")) return;
    nemesisRestaurarPadrao();
    setEstado(nemesisCarregar());
    avisar("Conteúdo padrão restaurado.");
  }

  function exportarJson() {
    if (!estado) return;
    const blob = new Blob([JSON.stringify(estado, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "nemesis-conteudo.json";
    link.click();
  }

  function importarJson(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;
    const leitor = new FileReader();
    leitor.onload = () => {
      try {
        const dados = JSON.parse(leitor.result as string);
        setEstado((atual) => ({
          website: dados.website ?? atual!.website,
          divisoes: Array.isArray(dados.divisoes) ? dados.divisoes : atual!.divisoes,
        }));
        avisar('Arquivo importado. Clique em "Salvar alterações" pra confirmar.');
      } catch {
        avisar("Esse arquivo não é um JSON válido.");
      }
    };
    leitor.readAsText(arquivo);
  }

  if (!autenticado) {
    return (
      <main className="min-h-screen bg-[#080808] text-[#eaeaea] px-[6vw] pt-40 pb-24 flex justify-center">
        <div className="w-full max-w-sm border border-[rgba(193,18,31,0.22)] bg-[#0f0f10] p-9">
          <h1 className="font-[Audiowide] text-lg text-center mb-6">
            Painel de Edição
          </h1>
          <label className={rotuloCampo}>Senha</label>
          <input
            type="password"
            className={campo}
            value={senhaDigitada}
            onChange={(e) => setSenhaDigitada(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && entrar()}
          />
          <button
            onClick={entrar}
            className="w-full mt-5 bg-[#C1121F] text-[#080808] font-semibold uppercase tracking-[0.05em] text-sm py-3 hover:bg-[#e0182a] transition-colors"
          >
            Entrar
          </button>
          {erro && <div className="text-[#C1121F] text-xs mt-3">{erro}</div>}
        </div>
      </main>
    );
  }

  if (!estado) return null;

  return (
    <main className="min-h-screen bg-[#080808] text-[#eaeaea] px-[6vw] pt-40 pb-24 max-w-3xl mx-auto">
      <Link
        href="/"
        className="inline-block text-xs tracking-[0.08em] uppercase text-[#9a9a9a] hover:text-[#C1121F] mb-9"
      >
        ← Voltar pra home
      </Link>

      <h1 className="font-[Audiowide] text-2xl mb-2">Painel de Edição</h1>
      <p className="text-[#9a9a9a] mb-6">
        Edite o conteúdo das páginas Website e Divisões.
      </p>

      <div className="border border-[rgba(193,18,31,0.22)] bg-[rgba(193,18,31,0.06)] text-sm text-[#9a9a9a] leading-relaxed p-5 mb-8">
        <strong className="text-white">Como isso funciona:</strong> não existe
        backend/banco de dados por trás disso — é salvo no{" "}
        <strong className="text-white">localStorage deste navegador</strong>.
        Outras pessoas que visitarem o site em outro dispositivo não vão ver
        essa mudança, a não ser que você use <strong className="text-white">Exportar</strong>{" "}
        e me peça pra aplicar o JSON exportado direto no código
        (<code>nemesis-conteudo.ts</code>), ou que a gente monte uma tabela de
        verdade no Prisma pra isso.
      </div>

      <div className={blocoEditor}>
        <h2 className="font-[Audiowide] text-xs text-[#C1121F] tracking-wide mb-4">
          PÁGINA WEBSITE — CABEÇALHO
        </h2>
        <div className="mb-4">
          <label className={rotuloCampo}>Título</label>
          <input
            className={campo}
            value={estado.website.titulo}
            onChange={(e) =>
              setEstado({
                ...estado,
                website: { ...estado.website, titulo: e.target.value },
              })
            }
          />
        </div>
        <div>
          <label className={rotuloCampo}>Subtítulo</label>
          <input
            className={campo}
            value={estado.website.subtitulo}
            onChange={(e) =>
              setEstado({
                ...estado,
                website: { ...estado.website, subtitulo: e.target.value },
              })
            }
          />
        </div>
      </div>

      <div className={blocoEditor}>
        <h2 className="font-[Audiowide] text-xs text-[#C1121F] tracking-wide mb-4">
          PÁGINA WEBSITE — CARTÕES
        </h2>
        {estado.website.cartoes.map((c, i) => (
          <div key={i} className="border border-[rgba(193,18,31,0.22)] bg-[#0f0f10] p-5 mb-4">
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className={rotuloCampo}>Ícone</label>
                <input
                  className={campo}
                  value={c.icone}
                  onChange={(e) => {
                    const cartoes = [...estado.website.cartoes];
                    cartoes[i] = { ...c, icone: e.target.value };
                    setEstado({ ...estado, website: { ...estado.website, cartoes } });
                  }}
                />
              </div>
              <div>
                <label className={rotuloCampo}>Título</label>
                <input
                  className={campo}
                  value={c.titulo}
                  onChange={(e) => {
                    const cartoes = [...estado.website.cartoes];
                    cartoes[i] = { ...c, titulo: e.target.value };
                    setEstado({ ...estado, website: { ...estado.website, cartoes } });
                  }}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className={rotuloCampo}>Descrição</label>
              <textarea
                rows={2}
                className={campo}
                value={c.descricao}
                onChange={(e) => {
                  const cartoes = [...estado.website.cartoes];
                  cartoes[i] = { ...c, descricao: e.target.value };
                  setEstado({ ...estado, website: { ...estado.website, cartoes } });
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className={rotuloCampo}>Link (URL ou rota interna)</label>
                <input
                  className={campo}
                  value={c.url}
                  onChange={(e) => {
                    const cartoes = [...estado.website.cartoes];
                    cartoes[i] = { ...c, url: e.target.value };
                    setEstado({ ...estado, website: { ...estado.website, cartoes } });
                  }}
                />
              </div>
              <div>
                <label className={rotuloCampo}>Texto do botão</label>
                <input
                  className={campo}
                  value={c.rotulo}
                  onChange={(e) => {
                    const cartoes = [...estado.website.cartoes];
                    cartoes[i] = { ...c, rotulo: e.target.value };
                    setEstado({ ...estado, website: { ...estado.website, cartoes } });
                  }}
                />
              </div>
            </div>
            <button
              className={`${botaoSecundario} border-[#8B0000] text-[#C1121F]`}
              onClick={() => {
                const cartoes = estado.website.cartoes.filter((_, idx) => idx !== i);
                setEstado({ ...estado, website: { ...estado.website, cartoes } });
              }}
            >
              Remover cartão
            </button>
          </div>
        ))}
        <button
          className={botaoSecundario}
          onClick={() =>
            setEstado({
              ...estado,
              website: {
                ...estado.website,
                cartoes: [
                  ...estado.website.cartoes,
                  { icone: "✦", titulo: "NOVO", descricao: "", url: "", rotulo: "Acessar" },
                ],
              },
            })
          }
        >
          + Adicionar cartão
        </button>
      </div>

      <div className={blocoEditor}>
        <h2 className="font-[Audiowide] text-xs text-[#C1121F] tracking-wide mb-4">
          PÁGINA DIVISÕES
        </h2>
        {estado.divisoes.map((d, i) => (
          <div key={i} className="border border-[rgba(193,18,31,0.22)] bg-[#0f0f10] p-5 mb-4">
            <div className="mb-3">
              <label className={rotuloCampo}>Nome da divisão</label>
              <input
                className={campo}
                value={d.nome}
                onChange={(e) => {
                  const divisoes = [...estado.divisoes];
                  divisoes[i] = { ...d, nome: e.target.value };
                  setEstado({ ...estado, divisoes });
                }}
              />
            </div>
            <div className="mb-3">
              <label className={rotuloCampo}>Descrição</label>
              <textarea
                rows={2}
                className={campo}
                value={d.descricao}
                onChange={(e) => {
                  const divisoes = [...estado.divisoes];
                  divisoes[i] = { ...d, descricao: e.target.value };
                  setEstado({ ...estado, divisoes });
                }}
              />
            </div>
            <button
              className={`${botaoSecundario} border-[#8B0000] text-[#C1121F]`}
              onClick={() =>
                setEstado({
                  ...estado,
                  divisoes: estado.divisoes.filter((_, idx) => idx !== i),
                })
              }
            >
              Remover divisão
            </button>
          </div>
        ))}
        <button
          className={botaoSecundario}
          onClick={() =>
            setEstado({
              ...estado,
              divisoes: [...estado.divisoes, { nome: "NOVA DIVISÃO", descricao: "" }],
            })
          }
        >
          + Adicionar divisão
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={salvar}
          className="bg-[#C1121F] text-[#080808] font-semibold uppercase tracking-[0.05em] text-xs px-6 py-3 hover:bg-[#e0182a] transition-colors"
        >
          Salvar alterações
        </button>
        <button className={botaoSecundario} onClick={restaurarPadrao}>
          Restaurar padrão
        </button>
        <button className={botaoSecundario} onClick={exportarJson}>
          Exportar (.json)
        </button>
        <label className={`${botaoSecundario} cursor-pointer`}>
          Importar (.json)
          <input type="file" accept="application/json" className="hidden" onChange={importarJson} />
        </label>
      </div>
      {status && <div className="text-[#C1121F] text-xs mt-4">{status}</div>}
    </main>
  );
                }

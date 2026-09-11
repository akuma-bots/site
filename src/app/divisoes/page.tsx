"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ConteudoNemesis, nemesisCarregar } from "@/lib/nemesis-conteudo";

export default function PaginaDivisoes() {
  const [conteudo, setConteudo] = useState<ConteudoNemesis | null>(null);

  useEffect(() => {
    setConteudo(nemesisCarregar());
  }, []);

  if (!conteudo) return null;

  return (
    <main className="min-h-screen bg-[#080808] text-[#eaeaea] px-[6vw] pt-40 pb-24">
      <Link
        href="/"
        className="inline-block text-xs tracking-[0.08em] uppercase text-[#9a9a9a] hover:text-[#C1121F] mb-9"
      >
        ← Voltar pra home
      </Link>

      <div className="max-w-xl mb-14">
        <h1 className="font-[Audiowide] text-2xl md:text-4xl leading-tight">
          Divisões da NÊMESIS
        </h1>
        <p className="mt-4 text-[#9a9a9a] leading-relaxed">
          Como a estrutura interna é organizada, área por área.
        </p>
      </div>

      {conteudo.divisoes.length === 0 ? (
        <div className="text-[#9a9a9a] text-center py-12 border border-dashed border-[rgba(193,18,31,0.22)]">
          Nenhuma divisão cadastrada ainda.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(193,18,31,0.22)] border border-[rgba(193,18,31,0.22)]">
          {conteudo.divisoes.map((d, i) => (
            <div key={i} className="bg-[#0f0f10] p-8">
              <div className="font-[Audiowide] text-[0.7rem] text-[#C1121F] tracking-[0.12em] mb-3">
                DIVISÃO {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-[Audiowide] text-base tracking-wide mb-3">
                {d.nome}
              </h3>
              <p className="text-[#9a9a9a] text-sm leading-relaxed">
                {d.descricao}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

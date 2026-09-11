"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ConteudoNemesis, nemesisCarregar } from "@/lib/nemesis-conteudo";

export default function PaginaWebsite() {
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
          {conteudo.website.titulo}
        </h1>
        <p className="mt-4 text-[#9a9a9a] leading-relaxed">
          {conteudo.website.subtitulo}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(193,18,31,0.22)] border border-[rgba(193,18,31,0.22)]">
        {conteudo.website.cartoes.map((c, i) => {
          const externo = /^https?:\/\//.test(c.url);
          const conteudoCartao = (
            <>
              <span className="text-2xl drop-shadow-[0_0_10px_rgba(193,18,31,0.35)]">
                {c.icone}
              </span>
              <h3 className="font-[Audiowide] text-sm mt-4 tracking-wide">
                {c.titulo}
              </h3>
              <p className="text-[#9a9a9a] text-sm leading-relaxed mt-3 flex-1">
                {c.descricao}
              </p>
              <span className="text-xs tracking-[0.08em] uppercase text-[#C1121F] mt-4 inline-block">
                {c.rotulo} →
              </span>
            </>
          );
          const classe =
            "bg-[#0f0f10] hover:bg-[#151516] transition-colors p-8 flex flex-col";

          return externo ? (
            <a
              key={i}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className={classe}
            >
              {conteudoCartao}
            </a>
          ) : (
            <Link key={i} href={c.url} className={classe}>
              {conteudoCartao}
            </Link>
          );
        })}
      </div>
    </main>
  );
}

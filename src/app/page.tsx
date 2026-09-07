import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center justify-center gap-6 px-6 text-center">
        <span className="rounded-full border border-nemesis-red/50 px-4 py-1 font-display text-xs uppercase tracking-[0.3em] text-nemesis-red">
          O HUB do competitivo
        </span>
        <h1 className="font-display text-5xl font-black uppercase tracking-wide neon-text md:text-7xl">
          N̷ - N̷ÊMESIS
        </h1>
        <p className="max-w-xl text-white/60">
          Rankings, equipes, partidas InHouse, eventos e economia própria — tudo em um só lugar,
          com login único via Discord.
        </p>
        <div className="mt-4 flex gap-4">
          <Link href="/login" className="btn-primary">
            Entrar com Discord
          </Link>
          <Link href="/rankings" className="btn-outline">
            Ver rankings
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 pb-24 md:grid-cols-3">
        {[
          { title: "Ranking & MMR", desc: "Progrida em patentes conforme joga partidas InHouse." },
          { title: "Equipes", desc: "Crie ou entre em uma equipe com tag, ícone e convite próprio." },
          { title: "Economia interna", desc: "Ganhe NX Coins jogando e troque por itens na loja." }
        ].map((f) => (
          <div key={f.title} className="stat-card">
            <h3 className="mb-2 font-display text-lg font-bold text-nemesis-red">{f.title}</h3>
            <p className="text-sm text-white/60">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

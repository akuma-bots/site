import { db } from "@/lib/db";

export default async function TeamsPage() {
  const teams = await db.team.findMany({
    include: { members: { select: { id: true } } },
    orderBy: { createdAt: "asc" }
  });

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-black uppercase neon-text">Equipes</h1>
        <button className="btn-primary text-xs">Criar equipe</button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {teams.map((t) => (
          <div key={t.id} className="stat-card">
            <p className="font-display text-lg font-bold text-nemesis-red">
              [{t.tag}] {t.name}
            </p>
            <p className="mt-1 text-xs text-white/40">{t.members.length} membro(s)</p>
          </div>
        ))}
        {teams.length === 0 && <p className="text-white/40">Nenhuma equipe criada ainda.</p>}
      </div>
    </div>
  );
}

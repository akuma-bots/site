import { db } from "@/lib/db";

export default async function RankingsPage() {
  const players = await db.user.findMany({
    orderBy: { mmr: "desc" },
    take: 50,
    select: { id: true, username: true, displayName: true, mmr: true, rank: true, avatar: true }
  });

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-8 font-display text-3xl font-black uppercase neon-text">Rankings</h1>
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-card text-white/40">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Jogador</th>
              <th className="px-4 py-3">Patente</th>
              <th className="px-4 py-3 text-right">MMR</th>
            </tr>
          </thead>
          <tbody>
            {players.map((p, i) => (
              <tr key={p.id} className="border-t border-border/60 hover:bg-card/60">
                <td className="px-4 py-3 text-white/40">{i + 1}</td>
                <td className="px-4 py-3">{p.displayName ?? p.username}</td>
                <td className="px-4 py-3 text-nemesis-red">{p.rank}</td>
                <td className="px-4 py-3 text-right font-display font-bold">{p.mmr}</td>
              </tr>
            ))}
            {players.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-white/40">
                  Ainda não há jogadores rankeados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

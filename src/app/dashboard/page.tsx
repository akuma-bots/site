import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id as string | undefined;

  const user = userId
    ? await db.user.findUnique({ where: { id: userId }, include: { team: true } })
    : null;

  if (!user) {
    return <div className="mx-auto max-w-6xl px-6 py-16 text-white/60">Carregando perfil...</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 flex items-center gap-4">
        {user.avatar && (
          <img src={user.avatar} alt={user.username} className="h-16 w-16 rounded-full neon-border" />
        )}
        <div>
          <h1 className="font-display text-2xl font-black uppercase neon-text">
            {user.displayName ?? user.username}
          </h1>
          <p className="text-sm text-white/50">{user.team ? `Equipe: ${user.team.name}` : "Sem equipe"}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="stat-card">
          <p className="text-xs uppercase text-white/40">MMR</p>
          <p className="font-display text-2xl font-bold">{user.mmr}</p>
        </div>
        <div className="stat-card">
          <p className="text-xs uppercase text-white/40">Patente</p>
          <p className="font-display text-2xl font-bold text-nemesis-red">{user.rank}</p>
        </div>
        <div className="stat-card">
          <p className="text-xs uppercase text-white/40">NX Coins</p>
          <p className="font-display text-2xl font-bold">{user.kvCoins}</p>
        </div>
        <div className="stat-card">
          <p className="text-xs uppercase text-white/40">Cargo</p>
          <p className="font-display text-2xl font-bold">{user.role}</p>
        </div>
      </div>
    </div>
  );
}

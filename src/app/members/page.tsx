import { db } from "@/lib/db";

export default async function MembersPage() {
  const members = await db.user.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, username: true, displayName: true, avatar: true, role: true, team: { select: { name: true } } }
  });

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="mb-8 font-display text-3xl font-black uppercase neon-text">Members</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {members.map((m) => (
          <div key={m.id} className="stat-card flex items-center gap-3">
            {m.avatar && <img src={m.avatar} className="h-10 w-10 rounded-full" alt={m.username} />}
            <div>
              <p className="font-display font-bold">{m.displayName ?? m.username}</p>
              <p className="text-xs text-white/40">{m.team?.name ?? "Sem equipe"} · {m.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

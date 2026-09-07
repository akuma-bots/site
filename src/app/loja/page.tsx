export default function LojaPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="mb-4 font-display text-3xl font-black uppercase neon-text">Loja</h1>
      <p className="text-white/60">
        Troque seus NX Coins por itens visuais. NX Coins não têm valor monetário, não podem ser
        comprados com dinheiro nem sacados.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {["Ícone Neon", "Borda Vermelha", "Título Especial", "Emblema"].map((item) => (
          <div key={item} className="stat-card text-center">
            <div className="mx-auto mb-3 h-16 w-16 rounded-full border border-nemesis-red/50 shadow-neonSoft" />
            <p className="text-sm font-bold">{item}</p>
            <p className="text-xs text-white/40">Em breve</p>
          </div>
        ))}
      </div>
    </div>
  );
}

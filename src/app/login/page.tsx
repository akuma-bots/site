"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="font-display text-3xl font-black uppercase neon-text">Acesso único</h1>
      <p className="text-sm text-white/60">
        Sua conta do servidor já é seu login. Nenhuma senha é armazenada — usamos OAuth do
        Discord.
      </p>
      <button onClick={() => signIn("discord", { callbackUrl: "/dashboard" })} className="btn-primary w-full">
        Entrar com Discord
      </button>
    </div>
  );
}

# N̷ - N̷ÊMESIS — Hub Competitivo

Plataforma competitiva comunitária: login via Discord, rankings/MMR, equipes, partidas InHouse,
economia interna (NX Coins), loja, streaming e creators. Stack: Next.js 14 (App Router) +
Prisma + PostgreSQL (Supabase) + NextAuth (Discord OAuth) + Tailwind (tema preto/vermelho/neon).

## Configuração

1. `npm install`
2. Copie `.env.example` para `.env` e preencha com seus dados (Supabase, Discord OAuth, NextAuth)
3. `npx prisma migrate deploy`
4. `npm run dev`

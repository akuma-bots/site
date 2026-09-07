import Link from "next/link";

const links = [
  { href: "/", label: "NÊMESIS" },
  { href: "/members", label: "Members" },
  { href: "/loja", label: "Loja" },
  { href: "/streams", label: "Streaming" },
  { href: "/creators", label: "Creators" }
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-void/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl font-black tracking-widest neon-text">
          N̷ - N̷ÊMESIS
        </Link>
        <ul className="hidden gap-8 font-display text-sm uppercase tracking-wider text-white/70 md:flex">
          {links.slice(1).map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition hover:text-nemesis-red">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/login" className="btn-outline text-xs">
          Entrar
        </Link>
      </nav>
    </header>
  );
}

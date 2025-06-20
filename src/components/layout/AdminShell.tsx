// 📁 src/components/layout/AdminShell.tsx
import { PropsWithChildren } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-16 px-6 border-b flex items-center justify-between bg-white">
        <Link href="/admin">
          <Image src="/logo.svg" alt="PrepBuddy Admin" width={120} height={40} />
        </Link>
        <nav className="text-sm text-slate-600">Admin Panel</nav>
      </header>

      <main className="flex-1 bg-slate-50 px-6 py-8">{children}</main>
    </div>
  );
}
v
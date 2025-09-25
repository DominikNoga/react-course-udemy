import Header from "@/components/header";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Header />
      <p>🔥 Let&apos;s get started! 🔥</p>
      <p>
        Go to the <Link href="/about">About Page</Link>
      </p>
    </main>
  );
}

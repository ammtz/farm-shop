import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">Welcome to Our Butcher Shop</h1>
        <p className="mt-3 text-2xl">Quality meats, delivered to your doorstep</p>
        <div className="flex mt-6 space-x-4">
          <Button asChild>
            <Link href="/order">Order Online</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/loyalty">Join Loyalty Program</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}


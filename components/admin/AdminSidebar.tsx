import Link from "next/link"
import { BarChart, Package, Users, ShoppingCart } from "lucide-react"

export function AdminSidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <nav className="space-y-2">
        <Link href="/admin" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
          <BarChart size={20} />
          <span>Sales Dashboard</span>
        </Link>
        <Link href="/admin/inventory" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
          <Package size={20} />
          <span>Inventory</span>
        </Link>
        <Link href="/admin/loyalty" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
          <Users size={20} />
          <span>Customer Loyalty</span>
        </Link>
        <Link href="/admin/order" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
          <ShoppingCart size={20} />
          <span>In-shop Ordering</span>
        </Link>
      </nav>
    </aside>
  )
}


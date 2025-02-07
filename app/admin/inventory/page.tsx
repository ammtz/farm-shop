import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const inventoryItems = [
  { id: 1, name: "Ribeye Steak", quantity: 50, price: 15.99 },
  { id: 2, name: "Ground Beef", quantity: 100, price: 5.99 },
  { id: 3, name: "Pork Chops", quantity: 75, price: 8.99 },
  { id: 4, name: "Chicken Breast", quantity: 120, price: 6.99 },
]

export default function InventoryDashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Inventory Dashboard</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventoryItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>${item.price.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


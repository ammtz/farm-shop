import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const loyaltyCustomers = [
  { id: 1, name: "John Doe", points: 500, lastPurchase: "2023-05-15" },
  { id: 2, name: "Jane Smith", points: 750, lastPurchase: "2023-05-20" },
  { id: 3, name: "Bob Johnson", points: 300, lastPurchase: "2023-05-18" },
  { id: 4, name: "Alice Brown", points: 1000, lastPurchase: "2023-05-22" },
]

export default function LoyaltyDashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Customer Loyalty Dashboard</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Points</TableHead>
            <TableHead>Last Purchase</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loyaltyCustomers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.points}</TableCell>
              <TableCell>{customer.lastPurchase}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


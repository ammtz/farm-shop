"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface InventoryItem {
  id: number
  name: string
  pricePerKg: number
}

interface OrderItem extends InventoryItem {
  weight: number
}

interface Customer {
  id: number
  name: string
  address: string
  phone: string
}

// Simulated customer data - replace with API call
const customers: Customer[] = [
  { id: 1, name: "John Doe", address: "123 Main St", phone: "555-0123" },
  { id: 2, name: "Jane Smith", address: "456 Oak Ave", phone: "555-0456" },
]

const inventoryItems: InventoryItem[] = [
  { id: 1, name: "Ribeye Steak", pricePerKg: 15.99 },
  { id: 2, name: "Ground Beef", pricePerKg: 5.99 },
  { id: 3, name: "Pork Chops", pricePerKg: 8.99 },
  { id: 4, name: "Chicken Breast", pricePerKg: 6.99 },
]

export default function AdminOrdering() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("")
  const [newCustomer, setNewCustomer] = useState(false)
  const [customerName, setCustomerName] = useState("")
  const [customerAddress, setCustomerAddress] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [addToLoyalty, setAddToLoyalty] = useState(true)

  const addToOrder = (item: InventoryItem) => {
    setOrderItems(currentItems => {
      const existingItem = currentItems.find(orderItem => orderItem.id === item.id)
      
      if (existingItem) {
        return currentItems.map(orderItem => 
          orderItem.id === item.id 
            ? { ...orderItem, weight: orderItem.weight + 1 }
            : orderItem
        )
      }
      
      return [...currentItems, { ...item, weight: 1 }]
    })
  }

  const removeFromOrder = (itemId: number) => {
    setOrderItems(orderItems.filter((item) => item.id !== itemId))
  }

  const updateWeight = (itemId: number, newWeight: number) => {
    const adjustedWeight = Math.max(0, newWeight)
    setOrderItems(orderItems.map((item) => 
      item.id === itemId ? { ...item, weight: adjustedWeight } : item
    ))
  }

  const calculateItemTotal = (item: OrderItem) => {
    return item.pricePerKg * item.weight
  }

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + calculateItemTotal(item), 0)
  }

  const handleCustomerSelect = (value: string) => {
    if (value === "new") {
      setNewCustomer(true)
      setSelectedCustomerId("")
      setCustomerName("")
      setCustomerAddress("")
      setCustomerPhone("")
    } else {
      setNewCustomer(false)
      setSelectedCustomerId(value)
      const customer = customers.find(c => c.id.toString() === value)
      if (customer) {
        setCustomerName(customer.name)
        setCustomerAddress(customer.address)
        setCustomerPhone(customer.phone)
      }
    }
  }

  const placeOrder = () => {
    console.log("Order placed:", {
      customer: {
        id: selectedCustomerId || "new",
        name: customerName,
        address: customerAddress,
        phone: customerPhone,
        addToLoyalty: newCustomer ? addToLoyalty : false
      },
      items: orderItems,
      total: calculateTotal()
    })
    setOrderItems([])
    setCustomerName("")
    setCustomerAddress("")
    setCustomerPhone("")
    setSelectedCustomerId("")
    setNewCustomer(false)
    setAddToLoyalty(true)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">In-shop Ordering</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-2">Available Items</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price per kg</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>${item.pricePerKg.toFixed(2)}/kg</TableCell>
                  <TableCell>
                    <Button onClick={() => addToOrder(item)}>Add</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Customer Information</h2>
          <div className="space-y-4">
            <div>
              <Label>Select Customer</Label>
              <Select value={selectedCustomerId} onValueChange={handleCustomerSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New Customer</SelectItem>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id.toString()}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {(newCustomer || selectedCustomerId) && (
              <>
                <div>
                  <Label htmlFor="customerName">Name</Label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    disabled={!newCustomer && !!selectedCustomerId}
                  />
                </div>
                <div>
                  <Label htmlFor="customerAddress">Address</Label>
                  <Input
                    id="customerAddress"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    disabled={!newCustomer && !!selectedCustomerId}
                  />
                </div>
                <div>
                  <Label htmlFor="customerPhone">Phone</Label>
                  <Input
                    id="customerPhone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    disabled={!newCustomer && !!selectedCustomerId}
                  />
                </div>
              </>
            )}
          </div>

          <h2 className="text-xl font-semibold mt-6 mb-2">Order Items</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Weight (kg)</TableHead>
                <TableHead>Price</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={item.weight}
                      onChange={(e) => updateWeight(item.id, parseFloat(e.target.value))}
                      min="0"
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>${calculateItemTotal(item).toFixed(2)}</TableCell>
                  <TableCell>
                    <Button variant="destructive" onClick={() => removeFromOrder(item.id)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4">
            <p className="text-xl font-semibold">Total: ${calculateTotal().toFixed(2)}</p>
            <div className="flex items-center space-x-2 mt-2 mb-2">
              {newCustomer && (
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="loyalty"
                    checked={addToLoyalty}
                    onCheckedChange={(checked) => setAddToLoyalty(checked as boolean)}
                  />
                  <Label htmlFor="loyalty" className="text-sm">
                    Add customer to loyalty program
                  </Label>
                </div>
              )}
            </div>
            <Button
              onClick={placeOrder}
              className="mt-2"
              disabled={
                orderItems.length === 0 || 
                (!selectedCustomerId && !newCustomer) || 
                !customerName || 
                !customerAddress || 
                !customerPhone
              }
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


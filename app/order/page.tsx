"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface InventoryItem {
  id: number
  name: string
  pricePerKg: number
}

interface OrderItem extends InventoryItem {
  weight: number
}

const inventoryItems: InventoryItem[] = [
  { id: 1, name: "MOLIDA PREMIUM", pricePerKg: 189.99 },
  { id: 2, name: "CORTADILLO PREMIUM", pricePerKg: 199.99 },
  { id: 3, name: "MILANESA PREMIUM", pricePerKg: 209.99 },
  { id: 4, name: "DESHEBRADA PREMIUM", pricePerKg: 199.99 },
  { id: 5, name: "BISTEC DEL 7", pricePerKg: 179.99 },
  { id: 6, name: "BRISKET", pricePerKg: 169.99 },
  { id: 7, name: "CHAMBARETE", pricePerKg: 149.99 },
  { id: 8, name: "MOLIDA", pricePerKg: 159.99 },
  { id: 9, name: "CORTADILLO", pricePerKg: 169.99 },
  { id: 10, name: "MILANESA SIRLOIN", pricePerKg: 189.99 },
  { id: 11, name: "DESHEBRADA", pricePerKg: 179.99 },
  { id: 12, name: "BISTEC S/H", pricePerKg: 169.99 },
  { id: 13, name: "RIBEYE PREMIUM", pricePerKg: 299.99 },
  { id: 14, name: "AGUJA", pricePerKg: 159.99 },
  { id: 15, name: "ARRACHERA NATURAL", pricePerKg: 259.99 },
  { id: 16, name: "PORTERHOUSE", pricePerKg: 289.99 },
  { id: 17, name: "T BONE", pricePerKg: 279.99 },
  { id: 18, name: "SHORT RIB", pricePerKg: 239.99 },
  { id: 19, name: "TOP SIRLOIN", pricePerKg: 219.99 },
  { id: 20, name: "COSTILLA NORTEÑA", pricePerKg: 189.99 },
  { id: 21, name: "FLECHA", pricePerKg: 179.99 },
  { id: 22, name: "NEW YORK", pricePerKg: 269.99 },
  { id: 23, name: "RIBEYE", pricePerKg: 289.99 },
  { id: 24, name: "ARRACHERA MARINADA", pricePerKg: 269.99 },
  { id: 25, name: "FILETE", pricePerKg: 299.99 },
  { id: 26, name: "TUETANO", pricePerKg: 129.99 },
  { id: 27, name: "COLA DE RES", pricePerKg: 149.99 },
  { id: 28, name: "COSTILLA RIBEYE", pricePerKg: 249.99 },
  { id: 29, name: "COSTILLA PILON", pricePerKg: 199.99 },
  { id: 30, name: "HIGADO", pricePerKg: 119.99 },
  { id: 31, name: "HUESO RODILLA", pricePerKg: 79.99 },
  { id: 32, name: "HUESO PERICO", pricePerKg: 69.99 }
]

export default function OnlineOrdering() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [customerName, setCustomerName] = useState("")
  const [customerAddress, setCustomerAddress] = useState("")

  const addToOrder = (item: InventoryItem) => {
    setOrderItems(currentItems => {
      const existingItem = currentItems.find(orderItem => orderItem.id === item.id)
      
      if (existingItem) {
        // If item exists, increase weight by 0.5kg
        return currentItems.map(orderItem => 
          orderItem.id === item.id 
            ? { ...orderItem, weight: orderItem.weight + 0.5 }
            : orderItem
        )
      }
      
      // If item doesn't exist, add it with initial weight of 0.5kg
      return [...currentItems, { ...item, weight: 1 }]
    })
  }

  const removeFromOrder = (itemId: number) => {
    setOrderItems(orderItems.filter((item) => item.id !== itemId))
  }

  const updateWeight = (itemId: number, newWeight: number) => {
    // Ensure weight is not less than 0
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

  const placeOrder = () => {
    // Here you would typically send the order to a backend API
    console.log("Order placed:", { customerName, customerAddress, items: orderItems, total: calculateTotal() })
    setOrderItems([])
    setCustomerName("")
    setCustomerAddress("")
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Online Ordering</h1>
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
          <h2 className="text-xl font-semibold mb-2">Your Order</h2>
          <div className="space-y-2">
            <Label htmlFor="customerName">Name</Label>
            <Input
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div className="space-y-2 mt-2">
            <Label htmlFor="customerAddress">Delivery Address</Label>
            <Input
              id="customerAddress"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              placeholder="Enter your address"
            />
          </div>
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
                      min="0.5"
                      step="0.5"
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
            <Button
              onClick={placeOrder}
              className="mt-2"
              disabled={orderItems.length === 0 || !customerName || !customerAddress}
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


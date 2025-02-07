"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const inventoryItems = [
  { id: 1, name: "Ribeye Steak", price: 15.99 },
  { id: 2, name: "Ground Beef", price: 5.99 },
  { id: 3, name: "Pork Chops", price: 8.99 },
  { id: 4, name: "Chicken Breast", price: 6.99 },
]

export default function OnlineOrdering() {
  const [orderItems, setOrderItems] = useState([])
  const [customerName, setCustomerName] = useState("")
  const [customerAddress, setCustomerAddress] = useState("")

  const addToOrder = (item) => {
    setOrderItems([...orderItems, { ...item, quantity: 1 }])
  }

  const removeFromOrder = (itemId) => {
    setOrderItems(orderItems.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId, newQuantity) => {
    setOrderItems(orderItems.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
  }

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
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
                <TableHead>Price</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
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
                <TableHead>Quantity</TableHead>
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
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value))}
                      min="1"
                      className="w-16"
                    />
                  </TableCell>
                  <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
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


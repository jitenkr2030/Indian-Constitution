'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Shield, Phone } from 'lucide-react'

export default function ConsumerProtectionHub() {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Consumer Protection Hub</h1>
        <p className="text-gray-600">Protect your rights as a consumer</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>File Consumer Complaint</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full">
            <ShoppingCart className="h-4 w-4 mr-2" />
            File New Complaint
          </Button>
          <Button variant="outline" className="w-full">
            <Phone className="h-4 w-4 mr-2" />
            Consumer Helpline: 1800-11-4000
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
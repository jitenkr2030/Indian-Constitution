"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tractor, Phone, Shield } from "lucide-react"

export default function AgricultureFarmerRights() {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Agriculture & Farmer Rights</h1>
        <p className="text-gray-600">Support for farmers and agricultural rights</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Farmer Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full">
            <Tractor className="h-4 w-4 mr-2" />
            Farmer Rights Information
          </Button>
          <Button variant="outline" className="w-full">
            <Phone className="h-4 w-4 mr-2" />
            Kisan Call Center: 1800-180-1551
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

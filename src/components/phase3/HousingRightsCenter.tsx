"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Phone, Shield } from "lucide-react"

export default function HousingRightsCenter() {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Housing Rights</h1>
        <p className="text-gray-600">Know your housing and property rights</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Housing Assistance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full">
            <Home className="h-4 w-4 mr-2" />
            Housing Rights Information
          </Button>
          <Button variant="outline" className="w-full">
            <Phone className="h-4 w-4 mr-2" />
            Housing Helpline: 1800-11-3377
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

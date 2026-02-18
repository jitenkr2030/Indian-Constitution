"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Phone, Shield } from "lucide-react"

export default function HealthcareRightsNavigator() {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Healthcare Rights</h1>
        <p className="text-gray-600">Know your healthcare rights and entitlements</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Healthcare Assistance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full">
            <Heart className="h-4 w-4 mr-2" />
            Report Healthcare Issue
          </Button>
          <Button variant="outline" className="w-full">
            <Phone className="h-4 w-4 mr-2" />
            Health Helpline: 104
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

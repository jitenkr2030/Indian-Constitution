"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, Phone, Shield } from "lucide-react"

export default function BusinessRightsHub() {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Business Rights Hub</h1>
        <p className="text-gray-600">Support for businesses and entrepreneurs</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Business Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full">
            <Briefcase className="h-4 w-4 mr-2" />
            Business Rights Information
          </Button>
          <Button variant="outline" className="w-full">
            <Phone className="h-4 w-4 mr-2" />
            Business Helpline: 1800-11-3388
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

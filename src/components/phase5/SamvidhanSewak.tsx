"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Users, Award } from "lucide-react"

export default function SamvidhanSewak() {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Samvidhan Sewak</h1>
        <p className="text-gray-600">Constitution protector and volunteer platform</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Join as Constitution Protector</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full">
            <Users className="h-4 w-4 mr-2" />
            Register as Sewak
          </Button>
          <Button variant="outline" className="w-full">
            <Award className="h-4 w-4 mr-2" />
            View Training Programs
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

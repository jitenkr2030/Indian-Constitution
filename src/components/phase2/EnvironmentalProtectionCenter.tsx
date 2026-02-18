"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tree, Phone, AlertTriangle } from "lucide-react"

export default function EnvironmentalProtectionCenter() {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Environmental Protection</h1>
        <p className="text-gray-600">Protect our environment and report violations</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Environment Protection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Report Environmental Violation
          </Button>
          <Button variant="outline" className="w-full">
            <Phone className="h-4 w-4 mr-2" />
            Pollution Control Board: 1800-11-6182
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

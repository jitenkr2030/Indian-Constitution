"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Smartphone, Lock } from "lucide-react"

export default function DigitalRightsHub() {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Digital Rights Hub</h1>
        <p className="text-gray-600">Protect your digital rights and privacy</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cybersecurity & Privacy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full">
            <Lock className="h-4 w-4 mr-2" />
            Report Cyber Crime
          </Button>
          <Button variant="outline" className="w-full">
            <Smartphone className="h-4 w-4 mr-2" />
            Digital Privacy Guide
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

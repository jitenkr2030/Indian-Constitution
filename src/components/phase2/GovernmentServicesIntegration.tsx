"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building, Globe, FileText } from "lucide-react"

export default function GovernmentServicesIntegration() {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Government Services</h1>
        <p className="text-gray-600">Access government services online</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Digital Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full">
            <Globe className="h-4 w-4 mr-2" />
            Access Digital India Services
          </Button>
          <Button variant="outline" className="w-full">
            <FileText className="h-4 w-4 mr-2" />
            Download Government Forms
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

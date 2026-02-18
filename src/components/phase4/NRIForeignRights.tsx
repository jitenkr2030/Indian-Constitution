"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe, Phone, Shield } from "lucide-react"

export default function NRIForeignRights() {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">NRI & Foreign Rights</h1>
        <p className="text-gray-600">Support for NRIs and foreign nationals</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>NRI Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full">
            <Globe className="h-4 w-4 mr-2" />
            NRI Rights Information
          </Button>
          <Button variant="outline" className="w-full">
            <Phone className="h-4 w-4 mr-2" />
            NRI Helpline: 1800-11-3090
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Phone, Shield } from "lucide-react"

export default function WomensRightsEmpowerment() {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Women's Rights Empowerment</h1>
        <p className="text-gray-600">Know and protect women's rights</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Women's Helpline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full">
            <Shield className="h-4 w-4 mr-2" />
            Report Women's Rights Violation
          </Button>
          <Button variant="outline" className="w-full">
            <Phone className="h-4 w-4 mr-2" />
            Women Helpline: 1091
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

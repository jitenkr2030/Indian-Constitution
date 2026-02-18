"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Phone, Shield } from "lucide-react"

export default function BankingRightsNavigator() {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Banking Rights Navigator</h1>
        <p className="text-gray-600">Know your banking and financial rights</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Banking Assistance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full">
            <CreditCard className="h-4 w-4 mr-2" />
            Report Banking Issue
          </Button>
          <Button variant="outline" className="w-full">
            <Phone className="h-4 w-4 mr-2" />
            Banking Ombudsman: 1800-11-0001
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

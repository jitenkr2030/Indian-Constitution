'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, Shield, AlertTriangle, Clock } from 'lucide-react'

export default function LegalEmergencyAssistant() {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Legal Emergency Assistant</h1>
        <p className="text-gray-600">24/7 legal help for emergency situations</p>
      </div>

      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Emergency Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <h4 className="font-semibold">Police Emergency</h4>
                <p className="text-sm text-gray-600">For immediate police assistance</p>
              </div>
              <Button variant="destructive">
                <Phone className="h-4 w-4 mr-2" />
                100
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div>
                <h4 className="font-semibold">Legal Aid</h4>
                <p className="text-sm text-gray-600">Free legal assistance</p>
              </div>
              <Button variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                1512
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <h4 className="font-semibold">Women Helpline</h4>
                <p className="text-sm text-gray-600">24/7 women assistance</p>
              </div>
              <Button variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                1091
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Emergency Rights Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-2" />
              Rights During Police Arrest
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Search & Seizure Rights
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Clock className="h-4 w-4 mr-2" />
              Bail Process Information
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
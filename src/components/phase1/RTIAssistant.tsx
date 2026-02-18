'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Download, Search, HelpCircle } from 'lucide-react'

export default function RTIAssistant() {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">RTI Assistant</h1>
        <p className="text-gray-600">Right to Information - File and track RTI applications</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>File RTI Application</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <Button className="w-full">
              <FileText className="h-4 w-4 mr-2" />
              Create New RTI Application
            </Button>
            <Button variant="outline" className="w-full">
              <Search className="h-4 w-4 mr-2" />
              Search RTI Applications
            </Button>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download RTI Templates
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>RTI Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-semibold mb-1">Step 1: Identify Information</h4>
              <p className="text-sm text-gray-600">Clearly specify what information you need</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-semibold mb-1">Step 2: Fill Application</h4>
              <p className="text-sm text-gray-600">Use prescribed form or write in plain paper</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <h4 className="font-semibold mb-1">Step 3: Submit and Track</h4>
              <p className="text-sm text-gray-600">Submit to PIO and track response</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Help & Support</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full">
            <HelpCircle className="h-4 w-4 mr-2" />
            RTI Helpline: 011-23632727
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
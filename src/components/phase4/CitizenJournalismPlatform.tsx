"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, Mic, FileText } from "lucide-react"

export default function CitizenJournalismPlatform() {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Citizen Journalism</h1>
        <p className="text-gray-600">Report news and share community stories</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report News</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full">
            <Camera className="h-4 w-4 mr-2" />
            Submit News Story
          </Button>
          <Button variant="outline" className="w-full">
            <Mic className="h-4 w-4 mr-2" />
            Voice Report
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

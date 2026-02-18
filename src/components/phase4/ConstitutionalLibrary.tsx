"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Search, Download } from "lucide-react"

export default function ConstitutionalLibrary() {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Constitutional Library</h1>
        <p className="text-gray-600">Complete constitutional knowledge repository</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Knowledge Repository</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full">
            <BookOpen className="h-4 w-4 mr-2" />
            Browse Constitution
          </Button>
          <Button variant="outline" className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Download Constitution PDF
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

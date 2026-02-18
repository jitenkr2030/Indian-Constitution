"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Phone, GraduationCap } from "lucide-react"

export default function EducationRightsPortal() {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Education Rights</h1>
        <p className="text-gray-600">Know your right to education</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Education Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full">
            <GraduationCap className="h-4 w-4 mr-2" />
            Education Rights Information
          </Button>
          <Button variant="outline" className="w-full">
            <Phone className="h-4 w-4 mr-2" />
            Education Helpline: 1800-11-6888
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Search, BookOpen, Headphones, Scale, GraduationCap, Shield } from 'lucide-react'

export default function IndianConstitutionApp() {
  const [searchQuery, setSearchQuery] = useState('')

  const features = [
    { icon: BookOpen, title: 'Browse Articles', desc: 'Complete Constitution access', color: 'bg-blue-500' },
    { icon: Search, title: 'Smart Search', desc: 'AI-powered search', color: 'bg-green-500' },
    { icon: Headphones, title: 'Simplified', desc: 'Easy explanations', color: 'bg-purple-500' },
    { icon: Scale, title: 'Case Laws', desc: 'Important judgments', color: 'bg-orange-500' },
    { icon: Shield, title: 'Rights Guide', desc: 'Emergency help', color: 'bg-red-500' },
    { icon: GraduationCap, title: 'Student Mode', desc: 'Exam preparation', color: 'bg-indigo-500' }
  ]

  const recentArticles = [
    { id: '21', title: 'Right to Life', desc: 'Protection of life and personal liberty' },
    { id: '14', title: 'Equality Before Law', desc: 'Equality before law and equal protection' },
    { id: '19', title: 'Freedom of Speech', desc: 'Protection of certain rights regarding freedom' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 via-white-to-green-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">भा</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
              संविधान
            </span>
          </div>
          <span className="text-sm text-gray-600">Indian Constitution App</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
            Indian Constitution
          </h1>
          <p className="text-gray-600 mb-6">Your Rights, Your Voice, Your Constitution</p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <input
              type="text"
              placeholder="Search articles, rights, or ask a question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="flex justify-center gap-4 mb-8">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">448 Articles</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">25 Parts</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">12 Schedules</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">105 Amendments</span>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className={`w-12 h-12 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-center mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-center text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Recent Articles */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Popular Articles</h2>
          <div className="grid gap-4">
            {recentArticles.map((article) => (
              <div key={article.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-2">Article {article.id}</h3>
                <p className="text-gray-600">{article.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 p-6 text-center">
        <p className="text-gray-600">© 2024 Indian Constitution App. All rights reserved.</p>
      </footer>
    </div>
  )
}
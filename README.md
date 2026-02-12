# 🇮🇳 Indian Constitution Mobile App

A comprehensive mobile-first web application that provides complete access to the Indian Constitution with AI-powered assistance, multilingual support, and citizen-friendly features.

## 🌟 Features

### 📱 Core Features
- **Complete Constitution Access** - Full text of all 448 Articles, 25 Parts, 12 Schedules
- **AI Constitution Assistant** - Chat with AI expert about constitutional rights and laws
- **Smart Search** - Real-time search across articles, amendments, and emergency guides
- **Multilingual Support** - English, Hindi, Tamil (with framework for 11 languages)
- **Emergency Rights Guide** - Step-by-step guidance for police arrest, search, legal aid
- **Student & Exam Mode** - MCQs, quizzes, and study materials for UPSC/Judiciary exams
- **Fundamental Rights Dashboard** - Visual cards with explanations and examples
- **Mobile-First Design** - Native app experience with bottom navigation

### 🎯 User Benefits
- **Citizen Empowerment** - Understand your rights and duties
- **Legal Awareness** - Know what to do in legal emergencies
- **Educational Excellence** - Complete resource for students and professionals
- **Accessibility** - Designed for users of all technical backgrounds
- **Offline Capability** - Works without internet connection (planned)

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (New York style)
- **Icons**: Lucide React
- **State Management**: React Hooks

### Backend
- **API**: Next.js API Routes
- **Database**: Prisma ORM with SQLite
- **AI**: z-ai-web-dev-sdk (LLM, TTS, ASR skills)
- **Authentication**: Ready for NextAuth.js integration

### Architecture
- **Mobile-First**: Responsive design optimized for mobile devices
- **Progressive Web App**: PWA-ready architecture
- **Type Safety**: Full TypeScript implementation
- **Performance**: Optimized for speed and accessibility

## 📊 Database Schema

### Core Models
- **Users** - Multi-role authentication (citizen, student, teacher, lawyer, admin)
- **Parts** - Constitution parts with multilingual titles
- **Articles** - Complete articles with content in multiple languages
- **Simplified Explanations** - Citizen-friendly explanations with examples
- **Amendments** - All constitutional amendments with details
- **Case Laws** - Landmark Supreme Court and High Court judgments
- **Emergency Guides** - Step-by-step emergency procedures
- **MCQs** - Quiz questions for exam preparation
- **User Interactions** - Bookmarks, highlights, search history

### Multilingual Support
- **Languages**: English, Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Assamese
- **Content**: All articles, explanations, and guides in multiple languages
- **UI**: Localized interface elements

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Bun or npm/yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jitenkr2030/Indian-Constitution.git
   cd Indian-Constitution
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Initialize database**
   ```bash
   bun run db:push
   ```

5. **Load sample data**
   ```bash
   # Start the development server first
   bun run dev
   
   # Then visit the app and click "Load Sample Data"
   # Or use the API directly:
   curl -X POST http://localhost:3000/api/seed
   ```

6. **Start development server**
   ```bash
   bun run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage Guide

### For Citizens
1. **Know Your Rights** - Browse Fundamental Rights to understand your constitutional protections
2. **Emergency Help** - Use Emergency Rights Guide for police arrest, search procedures
3. **Ask AI** - Chat with AI Assistant for any constitutional questions
4. **Search** - Find specific articles or rights using smart search

### For Students
1. **Exam Preparation** - Use Student Mode for MCQs and quizzes
2. **Study Notes** - Access simplified explanations of complex articles
3. **Previous Questions** - Practice with UPSC and Judiciary exam questions
4. **Case Laws** - Study landmark judgments and their implications

### For Professionals
1. **Quick Reference** - Search specific articles and amendments
2. **Case Research** - Access related case laws and judgments
3. **Client Education** - Use simplified explanations to help clients
4. **Stay Updated** - Track latest amendments and legal developments

## 🔧 Development

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── constitution/  # Constitution data API
│   │   ├── search/        # Search API
│   │   ├── ai-assistant/  # AI chat API
│   │   └── seed/          # Data seeding API
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utilities
│   ├── db.ts            # Database client
│   └── seed-data.ts     # Sample data
├── prisma/              # Database schema
│   └── schema.prisma    # Prisma schema
└── skills/              # AI skill implementations
```

### Available Scripts
```bash
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run ESLint
bun run db:push      # Push database schema
bun run db:studio    # Open Prisma Studio
```

### API Endpoints

#### Constitution Data
- `GET /api/constitution?lang=en` - Get all parts and articles
- `GET /api/constitution?lang=hi` - Get data in Hindi

#### Search
- `GET /api/search?q=Article+21&lang=en` - Search articles
- `GET /api/search?q=freedom&type=articles` - Search specific types

#### AI Assistant
- `POST /api/ai-assistant` - Chat with AI
- `GET /api/ai-assistant?userId=xxx` - Get chat history

#### Data Management
- `POST /api/seed` - Load sample data

## 🎨 Design System

### Colors
- **Primary**: Saffron-Orange to Green gradient (Indian national colors)
- **Secondary**: Blue, Purple, Red for different features
- **Accessibility**: WCAG 2.1 AA compliant

### Components
- **Mobile-First**: Bottom navigation, touch-friendly
- **Responsive**: Works on all screen sizes
- **Dark Mode**: Planned implementation
- **Accessibility**: Screen reader support, keyboard navigation

## 🔒 Privacy & Security

### Data Protection
- **No Personal Data Collection** - Demo app without user tracking
- **Local Storage** - User preferences stored locally
- **Secure APIs** - Input validation and sanitization
- **AI Privacy** - Chat queries processed securely

### Legal Compliance
- **Educational Purpose** - For informational use only
- **Not Legal Advice** - Always consult lawyers for specific cases
- **Source Attribution** - All content properly attributed
- **Government Guidelines** - Follows Digital India initiatives

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Process
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Contribution Areas
- **Additional Languages** - Help translate to more Indian languages
- **New Features** - Suggest and implement new constitutional features
- **Bug Fixes** - Report and fix issues
- **Documentation** - Improve guides and documentation
- **Accessibility** - Enhance accessibility features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Constitution of India** - Source of all constitutional content
- **Government of India** - For making constitution publicly available
- **Legal Experts** - For simplified explanations and guidance
- **Educational Institutions** - For exam preparation materials
- **Open Source Community** - For the amazing tools and libraries

## 📞 Contact

- **Issues**: [GitHub Issues](https://github.com/jitenkr2030/Indian-Constitution/issues)
- **Discussions**: [GitHub Discussions](https://github.com/jitenkr2030/Indian-Constitution/discussions)
- **Email**: [Your Email]

## 🗺️ Roadmap

### Phase 1 (Current) ✅
- [x] Basic constitution browsing
- [x] AI assistant
- [x] Search functionality
- [x] Multilingual support (3 languages)
- [x] Mobile-first design

### Phase 2 (Next 3 Months)
- [ ] Complete 11 language support
- [ ] TTS (Text-to-Speech) integration
- [ ] Dark mode and accessibility features
- [ ] Amendments timeline view
- [ ] Full MCQ quiz system

### Phase 3 (6 Months)
- [ ] PWA with offline support
- [ ] Voice search and commands
- [ ] User authentication and profiles
- [ ] Case law database expansion
- [ ] Real-time notifications

### Phase 4 (1 Year)
- [ ] Advanced AI features
- [ ] Comparative constitution analysis
- [ ] Legal professional tools
- [ ] Government integration
- [ ] Nationwide deployment

---

**Made with ❤️ for the citizens of India**

*Empowering every Indian with knowledge of their constitutional rights and duties*
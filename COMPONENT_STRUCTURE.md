# Indian Constitution App - Component Structure & Page Organization

## Directory Structure

```
src/
├── app/                          # Next.js App Router
│   ├── [locale]/                # Internationalization routing
│   │   ├── (auth)/             # Auth routes group
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── constitution/        # Main constitution features
│   │   │   ├── page.tsx        # Dashboard/Home
│   │   │   ├── parts/          # Browse by Parts
│   │   │   │   └── [id]/
│   │   │   ├── articles/       # Browse by Articles
│   │   │   │   ├── page.tsx    # All articles list
│   │   │   │   └── [number]/   # Individual article
│   │   │   ├── schedules/      # Schedules
│   │   │   │   └── [id]/
│   │   │   ├── amendments/     # Amendments tracker
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   └── search/         # Smart search
│   │   ├── citizen/            # Citizen mode features
│   │   │   ├── page.tsx        # Citizen dashboard
│   │   │   ├── rights/         # Fundamental rights
│   │   │   ├── duties/         # Fundamental duties
│   │   │   └── emergency/      # Emergency guide
│   │   ├── student/            # Student mode features
│   │   │   ├── page.tsx        # Student dashboard
│   │   │   ├── quizzes/        # Quiz section
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   ├── notes/          # Study notes
│   │   │   └── progress/       # Learning progress
│   │   ├── legal/              # Legal professionals
│   │   │   ├── page.tsx
│   │   │   ├── case-laws/      # Case laws database
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   └── judgments/      # Judgments
│   │   ├── ai-assistant/       # AI Constitution Assistant
│   │   │   └── page.tsx
│   │   ├── settings/           # App settings
│   │   │   ├── page.tsx
│   │   │   ├── profile/
│   │   │   ├── language/
│   │   │   └── accessibility/
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx           # Landing page
│   ├── api/                   # API routes
│   │   ├── auth/
│   │   ├── constitution/
│   │   ├── search/
│   │   ├── ai/
│   │   ├── quizzes/
│   │   └── user/
│   ├── globals.css
│   └── layout.tsx
├── components/                # Reusable components
│   ├── ui/                   # shadcn/ui components (already exists)
│   ├── layout/               # Layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── MobileMenu.tsx
│   ├── constitution/         # Constitution-specific components
│   │   ├── ArticleCard.tsx
│   │   ├── ArticleView.tsx
│   │   ├── PartCard.tsx
│   │   ├── ScheduleView.tsx
│   │   ├── AmendmentTimeline.tsx
│   │   ├── ArticleComparison.tsx
│   │   └── ContentRenderer.tsx
│   ├── search/               # Search components
│   │   ├── SearchBar.tsx
│   │   ├── SearchFilters.tsx
│   │   ├── SearchResults.tsx
│   │   ├── VoiceSearch.tsx
│   │   └── AISearch.tsx
│   ├── citizen/              # Citizen mode components
│   │   ├── RightsCard.tsx
│   │   ├── EmergencyGuide.tsx
│   │   ├── HelplineCard.tsx
│   │   ├── ViolationReport.tsx
│   │   └── SimpleExplanation.tsx
│   ├── student/              # Student mode components
│   │   ├── QuizCard.tsx
│   │   ├── QuizPlayer.tsx
│   │   ├── ProgressTracker.tsx
│   │   ├── StudyNotes.tsx
│   │   └── FlashCard.tsx
│   ├── legal/                # Legal professional components
│   │   ├── CaseLawCard.tsx
│   │   ├── JudgmentView.tsx
│   │   ├── CitationView.tsx
│   │   └── LegalResearch.tsx
│   ├── ai/                   # AI Assistant components
│   │   ├── ChatInterface.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── SuggestedQuestions.tsx
│   │   └── ArticleReferences.tsx
│   ├── accessibility/        # Accessibility components
│   │   ├── TextToSpeech.tsx
│   │   ├── FontSizeControl.tsx
│   │   ├── HighContrast.tsx
│   │   └── KeyboardNavigation.tsx
│   └── common/               # Common utility components
│       ├── LoadingSpinner.tsx
│       ├── ErrorBoundary.tsx
│       ├── LanguageSwitcher.tsx
│       ├── ThemeToggle.tsx
│       ├── BookmarkButton.tsx
│       ├── ShareButton.tsx
│       └── PrintButton.tsx
├── lib/                      # Utility libraries
│   ├── db.ts                 # Database connection
│   ├── utils.ts              # General utilities
│   ├── auth.ts               # Authentication
│   ├── ai/                   # AI integrations
│   │   ├── llm.ts           # LLM integration
│   │   ├── tts.ts           # Text-to-speech
│   │   ├── asr.ts           # Speech-to-text
│   │   └── vlm.ts           # Vision language model
│   ├── search/               # Search functionality
│   │   ├── index.ts         # Search engine
│   │   ├── filters.ts       # Search filters
│   │   └── ranking.ts       # Result ranking
│   ├── offline/              # Offline functionality
│   │   ├── cache.ts         # Caching strategy
│   │   ├── sync.ts          # Data synchronization
│   │   └── storage.ts       # Local storage
│   ├── i18n/                 # Internationalization
│   │   ├── config.ts        # i18n configuration
│   │   ├── translations.ts  # Translation functions
│   │   └── locales/         # Locale files
│   └── constitution/         # Constitution-specific utilities
│       ├── parser.ts        # Content parsing
│       ├── formatter.ts     # Text formatting
│       └── validator.ts     # Data validation
├── hooks/                    # Custom React hooks
│   ├── use-mobile.ts         # Mobile detection (exists)
│   ├── use-toast.ts          # Toast notifications (exists)
│   ├── use-constitution.ts   # Constitution data
│   ├── use-search.ts         # Search functionality
│   ├── use-ai.ts            # AI interactions
│   ├── use-offline.ts       # Offline detection
│   ├── use-bookmarks.ts     # Bookmark management
│   ├── use-progress.ts      # Learning progress
│   ├── use-quiz.ts          # Quiz functionality
│   ├── use-tts.ts           # Text-to-speech
│   └── use-theme.ts         # Theme management
├── store/                    # State management (Zustand)
│   ├── authStore.ts         # Authentication state
│   ├── constitutionStore.ts # Constitution data state
│   ├── searchStore.ts       # Search state
│   ├── userStore.ts         # User preferences
│   ├── offlineStore.ts      # Offline state
│   └── aiStore.ts           # AI conversation state
├── types/                    # TypeScript type definitions
│   ├── constitution.ts      # Constitution types
│   ├── user.ts             # User types
│   ├── search.ts           # Search types
│   ├── ai.ts               # AI types
│   └── common.ts           # Common types
└── styles/                   # Additional styles
    ├── constitution.css     # Constitution-specific styles
    ├── accessibility.css    # Accessibility styles
    └── mobile.css          # Mobile-specific styles
```

## Key Component Features

### 1. Layout Components
- **Header**: Navigation, search bar, language switcher, theme toggle
- **Sidebar**: Feature navigation, user profile, quick access
- **MobileMenu**: Hamburger menu for mobile devices
- **Navigation**: Breadcrumb navigation, back/forward controls

### 2. Constitution Components
- **ArticleCard**: Compact article preview with number, title, summary
- **ArticleView**: Full article display with translations, explanations, related content
- **PartCard**: Part overview with article count and description
- **AmendmentTimeline**: Visual timeline of constitutional amendments
- **ArticleComparison**: Side-by-side comparison of old vs new text

### 3. Search Components
- **SearchBar**: Intelligent search with autocomplete and voice input
- **AISearch**: AI-powered natural language search
- **SearchFilters**: Advanced filtering by category, date, relevance
- **SearchResults**: Organized results with highlighting and snippets

### 4. AI Assistant Components
- **ChatInterface**: Conversational AI interface with message history
- **MessageBubble**: Styled message display for user/AI messages
- **ArticleReferences**: Linked article references in AI responses
- **SuggestedQuestions**: Pre-defined questions for quick assistance

### 5. Accessibility Components
- **TextToSpeech**: TTS controls for content reading
- **FontSizeControl**: Dynamic font size adjustment
- **HighContrast**: High contrast mode toggle
- **KeyboardNavigation**: Full keyboard navigation support

## Page Organization Strategy

### 1. Landing Page (`/`)
- Hero section with app value proposition
- Quick access to main features
- Language selection
- Mobile app download prompts

### 2. Constitution Browser (`/constitution`)
- **Dashboard**: Overview of all parts, quick stats, recent amendments
- **Parts View**: Hierarchical navigation through constitutional parts
- **Articles View**: Searchable list of all articles with filters
- **Individual Article**: Full content with translations, explanations, related cases

### 3. Citizen Mode (`/citizen`)
- **Rights Dashboard**: Visual cards for fundamental rights
- **Emergency Guide**: Step-by-step emergency procedures
- **Helpline Directory**: Contact information for legal aid
- **Simple Explanations**: Layman's guide to constitutional provisions

### 4. Student Mode (`/student`)
- **Learning Dashboard**: Progress tracking, recommended topics
- **Quiz Section**: Interactive quizzes with immediate feedback
- **Study Notes**: Organized notes by topics and difficulty
- **Exam Preparation**: Mock tests and previous year questions

### 5. Legal Professional Mode (`/legal`)
- **Case Law Database**: Searchable database of landmark judgments
- **Article Analysis**: In-depth analysis with judicial interpretations
- **Citation Tools**: Automatic citation generation
- **Research Assistant**: AI-powered legal research

### 6. AI Assistant (`/ai-assistant`)
- **Chat Interface**: Natural language Q&A about constitution
- **Contextual Help**: Article-specific assistance
- **Document Analysis**: Upload and analyze legal documents
- **Voice Interaction**: Hands-free constitutional queries

## Mobile-First Design Considerations

### 1. Responsive Breakpoints
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

### 2. Mobile Optimizations
- Touch-friendly interface elements
- Swipe gestures for navigation
- Bottom navigation bar for easy thumb access
- Collapsible sections to save screen space
- Offline-first functionality
- Progressive Web App (PWA) features

### 3. Performance Optimizations
- Lazy loading for heavy content
- Image optimization
- Code splitting by route
- Service worker for offline caching
- Minimal JavaScript bundle size
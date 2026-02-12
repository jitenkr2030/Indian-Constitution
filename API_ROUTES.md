# Indian Constitution App - API Routes Design

## API Route Structure

```
src/app/api/
├── auth/                          # Authentication endpoints
│   ├── login/route.ts            # POST - User login
│   ├── register/route.ts         # POST - User registration
│   ├── logout/route.ts           # POST - User logout
│   ├── refresh/route.ts          # POST - Refresh token
│   └── profile/route.ts          # GET/PUT - User profile
├── constitution/                  # Constitution data endpoints
│   ├── parts/route.ts            # GET - All parts
│   ├── parts/[id]/route.ts       # GET - Specific part
│   ├── articles/route.ts         # GET - All articles with filters
│   ├── articles/[number]/route.ts # GET - Specific article
│   ├── schedules/route.ts        # GET - All schedules
│   ├── schedules/[id]/route.ts   # GET - Specific schedule
│   ├── amendments/route.ts       # GET - All amendments
│   ├── amendments/[id]/route.ts  # GET - Specific amendment
│   ├── categories/route.ts       # GET - Article categories
│   └── export/route.ts           # GET - Export constitution data
├── search/                        # Search endpoints
│   ├── route.ts                  # GET/POST - General search
│   ├── suggestions/route.ts      # GET - Search suggestions
│   ├── voice/route.ts            # POST - Voice search
│   ├── ai/route.ts               # POST - AI-powered search
│   └── index/route.ts            # GET/POST - Search index management
├── ai/                           # AI Assistant endpoints
│   ├── chat/route.ts             # POST - Chat with AI assistant
│   ├── explain/route.ts          # POST - Get explanations
│   ├── summarize/route.ts        # POST - Summarize content
│   ├── translate/route.ts        # POST - Translate content
│   └── analyze/route.ts          # POST - Analyze documents
├── citizen/                      # Citizen mode endpoints
│   ├── rights/route.ts           # GET - Fundamental rights
│   ├── duties/route.ts           # GET - Fundamental duties
│   ├── emergency/route.ts        # GET - Emergency rights guide
│   ├── helplines/route.ts        # GET - Helpline directory
│   └── violations/route.ts       # GET/POST - Rights violations
├── student/                      # Student mode endpoints
│   ├── quizzes/route.ts          # GET/POST - Quiz management
│   ├── quizzes/[id]/route.ts     # GET/PUT/DELETE - Specific quiz
│   ├── quizzes/[id]/attempt/route.ts # POST - Attempt quiz
│   ├── progress/route.ts         # GET/PUT - Learning progress
│   ├── notes/route.ts            # GET/POST/PUT - Study notes
│   └── recommendations/route.ts  # GET - Personalized recommendations
├── legal/                        # Legal professional endpoints
│   ├── case-laws/route.ts        # GET - Case laws database
│   ├── case-laws/[id]/route.ts   # GET - Specific case law
│   ├── judgments/route.ts        # GET - Judgments
│   ├── citations/route.ts        # GET - Citation tools
│   └── research/route.ts         # POST - Legal research assistance
├── user/                         # User management endpoints
│   ├── bookmarks/route.ts        # GET/POST/DELETE - Bookmarks
│   ├── history/route.ts          # GET - User history
│   ├── preferences/route.ts      # GET/PUT - User preferences
│   ├── progress/route.ts         # GET/PUT - Overall progress
│   └── statistics/route.ts       # GET - User statistics
├── content/                      # Content management endpoints
│   ├── upload/route.ts           # POST - Upload content
│   ├── sync/route.ts             # POST - Sync offline changes
│   ├── cache/route.ts            # GET/POST - Cache management
│   └── offline/route.ts          # GET - Offline content bundle
├── accessibility/                # Accessibility endpoints
│   ├── tts/route.ts              # POST - Text-to-speech
│   ├── asr/route.ts              # POST - Speech-to-text
│   ├── font-size/route.ts        # GET/PUT - Font size preferences
│   └── contrast/route.ts         # GET/PUT - Contrast settings
└── admin/                        # Admin endpoints
    ├── analytics/route.ts        # GET - App analytics
    ├── users/route.ts            # GET/PUT - User management
    ├── content/route.ts          # GET/POST/PUT - Content management
    └── settings/route.ts         # GET/PUT - App settings
```

## Detailed API Specifications

### 1. Authentication Routes (`/api/auth`)

#### POST `/api/auth/login`
```typescript
// Request body
{
  email: string;
  password: string;
  rememberMe?: boolean;
}

// Response
{
  success: boolean;
  data: {
    user: User;
    token: string;
    refreshToken: string;
  };
  message: string;
}
```

#### POST `/api/auth/register`
```typescript
// Request body
{
  email: string;
  password: string;
  name: string;
  preferredLanguage: string;
  role: 'CITIZEN' | 'STUDENT' | 'LAWYER' | 'RESEARCHER';
}

// Response
{
  success: boolean;
  data: {
    user: User;
    token: string;
  };
  message: string;
}
```

### 2. Constitution Routes (`/api/constitution`)

#### GET `/api/constitution/articles`
```typescript
// Query parameters
{
  page?: number;
  limit?: number;
  partId?: string;
  categoryId?: string;
  language?: string;
  search?: string;
}

// Response
{
  success: boolean;
  data: {
    articles: Article[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}
```

#### GET `/api/constitution/articles/[number]`
```typescript
// Response
{
  success: boolean;
  data: {
    article: Article;
    translations: ArticleTranslation[];
    explanations: ArticleExplanation[];
    amendments: ArticleAmendment[];
    relatedCaseLaws: CaseLaw[];
  };
}
```

### 3. Search Routes (`/api/search`)

#### POST `/api/search`
```typescript
// Request body
{
  query: string;
  filters?: {
    partIds?: string[];
    categories?: string[];
    languages?: string[];
    dateRange?: {
      start: string;
      end: string;
    };
  };
  type?: 'TEXT' | 'VOICE' | 'AI';
  page?: number;
  limit?: number;
}

// Response
{
  success: boolean;
  data: {
    results: SearchResult[];
    suggestions?: string[];
    pagination: PaginationInfo;
    searchTime: number;
  };
}
```

#### POST `/api/search/ai`
```typescript
// Request body
{
  question: string;
  context?: string;
  language?: string;
}

// Response
{
  success: boolean;
  data: {
    answer: string;
    articleReferences: {
      articleNumber: number;
      title: string;
      relevance: number;
      snippet: string;
    }[];
    followUpQuestions: string[];
  };
}
```

### 4. AI Assistant Routes (`/api/ai`)

#### POST `/api/ai/chat`
```typescript
// Request body
{
  message: string;
  conversationId?: string;
  context?: {
    articleId?: string;
    currentView?: string;
  };
}

// Response
{
  success: boolean;
  data: {
    message: string;
    conversationId: string;
    articleReferences: ArticleReference[];
    suggestions: string[];
    needsClarification: boolean;
  };
}
```

#### POST `/api/ai/explain`
```typescript
// Request body
{
  articleId: string;
  level: 'SIMPLE' | 'DETAILED' | 'STUDENT';
  language: string;
}

// Response
{
  success: boolean;
  data: {
    explanation: string;
    examples: string[];
    relatedArticles: string[];
    visualAids?: string[];
  };
}
```

### 5. Student Mode Routes (`/api/student`)

#### GET `/api/student/quizzes`
```typescript
// Query parameters
{
  category?: string;
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
  page?: number;
  limit?: number;
}

// Response
{
  success: boolean;
  data: {
    quizzes: Quiz[];
    userProgress: {
      completed: number;
      averageScore: number;
      totalTime: number;
    };
  };
}
```

#### POST `/api/student/quizzes/[id]/attempt`
```typescript
// Request body
{
  answers: {
    questionId: string;
    answer: number;
  }[];
  timeSpent: number;
}

// Response
{
  success: boolean;
  data: {
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    timeSpent: number;
    feedback: {
      questionId: string;
      correct: boolean;
      explanation: string;
    }[];
    recommendations: string[];
  };
}
```

### 6. Legal Professional Routes (`/api/legal`)

#### GET `/api/legal/case-laws`
```typescript
// Query parameters
{
  articleId?: string;
  court?: string;
  year?: number;
  landmark?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

// Response
{
  success: boolean;
  data: {
    caseLaws: CaseLaw[];
    filters: {
      courts: string[];
      years: number[];
      categories: string[];
    };
    pagination: PaginationInfo;
  };
}
```

#### POST `/api/legal/research`
```typescript
// Request body
{
  query: string;
  articles?: string[];
  timeRange?: {
    start: string;
    end: string;
  };
  includeInternational?: boolean;
}

// Response
{
  success: boolean;
  data: {
    results: ResearchResult[];
    summary: string;
    keyFindings: string[];
    citations: Citation[];
    relatedArticles: Article[];
  };
}
```

### 7. Citizen Mode Routes (`/api/citizen`)

#### GET `/api/citizen/rights`
```typescript
// Query parameters
{
  language?: string;
  category?: string;
}

// Response
{
  success: boolean;
  data: {
    rights: FundamentalRight[];
    categories: string[];
    violations: RightsViolation[];
  };
}
```

#### GET `/api/citizen/emergency`
```typescript
// Query parameters
{
  type?: 'ARREST' | 'SEARCH' | 'LEGAL_AID' | 'OTHER';
  language?: string;
}

// Response
{
  success: boolean;
  data: {
    emergencyRights: EmergencyRight[];
    helplines: Helpline[];
    quickActions: {
      title: string;
      description: string;
      action: string;
    }[];
  };
}
```

### 8. Accessibility Routes (`/api/accessibility`)

#### POST `/api/accessibility/tts`
```typescript
// Request body
{
  text: string;
  language: string;
  voice?: string;
  speed?: number;
}

// Response
{
  success: boolean;
  data: {
    audioUrl: string;
    duration: number;
    text: string;
  };
}
```

#### POST `/api/accessibility/asr`
```typescript
// Request body (FormData)
{
  audio: File;
  language: string;
}

// Response
{
  success: boolean;
  data: {
    text: string;
    confidence: number;
    language: string;
  };
}
```

### 9. Offline Support Routes (`/api/content`)

#### GET `/api/content/offline`
```typescript
// Query parameters
{
  language?: string;
  includeImages?: boolean;
  version?: string;
}

// Response
{
  success: boolean;
  data: {
    bundleUrl: string;
    version: string;
    size: number;
    checksum: string;
    contents: {
      articles: number;
      schedules: number;
      amendments: number;
      caseLaws: number;
    };
  };
}
```

#### POST `/api/content/sync`
```typescript
// Request body
{
  lastSyncTime: string;
  changes: {
    type: 'BOOKMARK' | 'PROGRESS' | 'NOTE' | 'PREFERENCE';
    data: any;
    timestamp: string;
  }[];
}

// Response
{
  success: boolean;
  data: {
    syncTime: string;
    conflicts: {
      type: string;
      localData: any;
      serverData: any;
    }[];
    updated: string[];
  };
}
```

## API Response Standards

### 1. Success Response Format
```typescript
{
  success: true;
  data: any; // Response data
  message?: string; // Optional success message
  meta?: {
    timestamp: string;
    requestId: string;
    version: string;
  };
}
```

### 2. Error Response Format
```typescript
{
  success: false;
  error: {
    code: string; // Error code
    message: string; // Human-readable error message
    details?: any; // Additional error details
  };
  meta: {
    timestamp: string;
    requestId: string;
  };
}
```

### 3. Pagination Format
```typescript
{
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
```

## API Security & Performance

### 1. Authentication & Authorization
- JWT-based authentication
- Role-based access control
- API rate limiting
- Request validation with Zod schemas

### 2. Caching Strategy
- Redis for frequently accessed data
- CDN for static content
- Browser caching for API responses
- Service worker for offline caching

### 3. Performance Optimizations
- Database query optimization
- Response compression
- Lazy loading for large datasets
- Pagination for all list endpoints

### 4. Monitoring & Analytics
- API response time tracking
- Error rate monitoring
- Usage analytics
- Performance metrics

## API Documentation

### 1. OpenAPI/Swagger Specification
- Auto-generated API documentation
- Interactive API testing
- Code examples for multiple languages
- Versioning support

### 2. SDK Generation
- TypeScript client SDK
- React hooks for API integration
- Error handling utilities
- Type-safe API calls
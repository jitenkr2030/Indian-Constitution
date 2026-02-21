# Indian Constitution App

A comprehensive web application for exploring and understanding the Indian Constitution.

## Features

- **Browse Articles**: Complete access to all articles of the Indian Constitution
- **Smart Search**: AI-powered search functionality
- **Multilingual Support**: Available in English, Hindi, and Tamil
- **Simplified Explanations**: Easy-to-understand explanations of complex legal concepts
- **Rights Guide**: Quick access to fundamental rights and emergency procedures
- **Student Mode**: Exam preparation tools and quizzes

## Technology Stack

- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Database**: Prisma ORM
- **Deployment**: Ready for Vercel, Netlify, and other platforms

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/jitenkr2030/Indian-Constitution.git
   cd Indian-Constitution
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## API Endpoints

- `GET /api/articles/[id]` - Get specific article details
- `GET /api/constitution` - Get constitution structure
- `GET /api/amendments` - Get amendments list
- `GET /api/rights` - Get fundamental rights
- `POST /api/tts` - Text-to-speech functionality

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Constitution of India
- Legal experts and contributors
- Open source community
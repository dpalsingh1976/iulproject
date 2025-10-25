# IUL Banking Website

A comprehensive educational website explaining the Infinite Banking Concept using Indexed Universal Life (IUL) insurance. Built with modern web technologies for a professional, responsive, and engaging user experience.

## 🌟 Features

- **Interactive Calculator**: Real-time IUL projections with adjustable parameters
- **Educational Content**: Story-driven approach with Alex & Priya characters
- **Case Studies**: Three real-world application examples
- **Comparison Table**: Objective comparison of IUL vs. alternative financial vehicles
- **FAQ Section**: Comprehensive accordion-style Q&A
- **Responsive Design**: Mobile-first approach with smooth scrolling navigation
- **Professional Styling**: Green/gold color scheme appropriate for financial services
- **Compliance-Ready**: Comprehensive disclaimers throughout

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 📁 Project Structure

```
client/
├── public/           # Static assets
├── src/
│   ├── components/   # Reusable UI components (shadcn/ui)
│   ├── pages/        # Page components
│   │   └── Home.tsx  # Main website (all sections)
│   ├── App.tsx       # Router and theme provider
│   ├── index.css     # Global styles and design tokens
│   └── main.tsx      # React entry point
├── index.html        # HTML template
└── vite.config.ts    # Vite configuration
```

## 🎨 Design System

### Color Palette

- **Primary**: Deep green (`oklch(0.35 0.12 165)`) - Trust, growth, stability
- **Secondary**: Gold/amber (`oklch(0.55 0.15 75)`) - Premium, value, warmth
- **Accent**: Light green (`oklch(0.88 0.08 165)`) - Highlights, calls-to-action

### Typography

- **Font**: System font stack for optimal performance
- **Headings**: Bold, clear hierarchy
- **Body**: Readable 16-18px with 1.6-1.8 line height

## 📋 Website Sections

1. **Hero Section**: Main value proposition with Cash Value Flywheel visualization
2. **What It Solves**: Three key problems Infinite Banking addresses
3. **Common Questions**: Quick answers to frequent concerns
4. **How It Works**: Five-chapter story with Alex & Priya
5. **Calculator**: Interactive IUL projection tool
6. **Case Studies**: Entrepreneur, Real Estate, Family Bank scenarios
7. **Comparison**: IUL vs. Savings, Brokerage, 401(k), Whole Life
8. **FAQ**: 15 detailed questions with accordion interface
9. **About**: Advisor background and testimonials
10. **Footer**: Contact info, legal disclaimers, compliance statements

## 🛠️ Technology Stack

- **React 19**: Latest React with concurrent features
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first styling
- **shadcn/ui**: High-quality component library
- **Vite**: Lightning-fast build tool
- **Wouter**: Lightweight routing
- **Lucide Icons**: Beautiful icon set

## 🎯 Customization

### Update Branding

Edit `client/src/pages/Home.tsx`:

```tsx
// Line 37: Company name
<div className="font-bold text-xl text-primary">Your Company Name</div>

// Line 75: Contact information
<p className="text-sm text-muted-foreground mb-2">Your credentials</p>

// Footer section: Update all contact details
```

### Update Colors

Edit `client/src/index.css`:

```css
:root {
  --primary: oklch(0.35 0.12 165);    /* Your primary color */
  --secondary: oklch(0.55 0.15 75);   /* Your secondary color */
  --accent: oklch(0.88 0.08 165);     /* Your accent color */
}
```

### Update Content

All content is in `client/src/pages/Home.tsx`. Search for specific sections:

- Hero text: Line 85-95
- Case studies: Line 650-750
- FAQ questions: Line 950-1050
- Testimonials: Line 1150-1200

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository in Vercel
3. Auto-detected Vite configuration
4. Deploy with one click

### Netlify

1. Connect GitHub repository
2. Build command: `pnpm build`
3. Publish directory: `client/dist`

### GitHub Pages

```bash
pnpm build
# Deploy client/dist folder to gh-pages branch
```

## 📝 Compliance Notes

This website includes comprehensive disclaimers throughout:

- IUL is not direct market investment
- Hypothetical projections disclaimer
- Educational purposes only
- Consult qualified professionals
- Tax treatment disclaimers
- Policy loan risk warnings

**Important**: Review all disclaimers with your compliance team before going live.

## 🔧 Development

### Adding New Components

```bash
# Add shadcn/ui component
npx shadcn@latest add [component-name]
```

### Code Style

- TypeScript strict mode enabled
- ESLint for code quality
- Prettier for formatting
- Conventional commits recommended

## 📊 Performance

- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Optimized images and lazy loading
- Code splitting with Vite

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is provided as-is for educational purposes. Ensure compliance with all applicable regulations before using in production.

## 📞 Support

For questions or issues:
- Review the technical specification document
- Check the deployment instructions
- Contact your development team

---

**Built with ❤️ for financial education and transparency**


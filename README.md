# AI Prompting Guide

A web application that helps users understand and implement various AI prompting frameworks. This application provides an interactive interface for learning about different prompting frameworks and generating prompts based on their components, with a design inspired by perplexity.ai.

## Features

- Browse different AI prompting frameworks
- Learn about framework components and use cases
- Interactive forms for generating prompts based on framework components
- Modern, responsive UI with a perplexity.ai-inspired design
- Dark mode support
- Easy deployment to Netlify

## Available Frameworks

1. CIDI Framework
2. SPEAR Framework
3. Few-Shot Prompting
4. Zero-Shot Prompting
5. RACE Framework
6. SPARK Framework
7. Six Thinking Hats Framework

## Getting Started

### Prerequisites

- Node.js (>=18.17.0)
- npm (>=9.0.0)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-prompting-guide
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:
```env
VITE_OPENAI_API_KEY=your_api_key_here
NODE_ENV=development
```

4. Install dependencies:
```bash
npm install
```

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The build output will be in the `dist` directory.

## Deployment

This project is configured for deployment on Netlify. Follow these steps to deploy:

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Connect your repository to Netlify:
   - Log in to Netlify
   - Click "New site from Git"
   - Choose your repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`

3. Configure environment variables in Netlify:
   - Go to Site settings > Build & deploy > Environment
   - Add the following environment variables:
     - `VITE_OPENAI_API_KEY`
     - Any other environment variables from your `.env` file

4. Deploy:
   - Netlify will automatically deploy your site
   - Any future pushes to the main branch will trigger automatic deployments

## Development Notes

### Project Structure

```
ai-prompting-guide/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/        # Page components
│   ├── context/      # React context providers
│   ├── services/     # API and utility services
│   ├── data/         # Static data and types
│   ├── styles.css    # Global styles
│   └── theme.ts      # Chakra UI theme configuration
├── public/           # Static assets
├── netlify/          # Netlify configuration and functions
└── package.json      # Project dependencies and scripts
```

### Technologies Used

- React 18
- TypeScript
- Vite
- Chakra UI
- React Router
- React Icons
- Netlify Functions
- Framer Motion

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
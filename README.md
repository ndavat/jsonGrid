# JSON Grid Viewer

A modern, feature-rich JSON visualization tool that transforms complex JSON data into an interactive grid format. Built with React, Tailwind CSS, and Radix UI components for a seamless user experience.

![JSONGRID](https://raw.githubusercontent.com/username/jsongrid/main/public/favicon.svg)

## ✨ Features

### 🎯 Core Features

- **Flexible View Modes**
  - Split View: Simultaneous JSON editor and grid display
  - Tab View: Switch between JSON and grid views
  - Fullscreen support for focused analysis

- **Powerful JSON Editor**
  - Real-time syntax validation
  - Toggle line numbers
  - One-click JSON formatting
  - Quick copy to clipboard
  - Clear editor function
  - Error highlighting and feedback

- **Interactive Grid View**
  - Automatic table generation from JSON arrays
  - Column sorting capabilities
  - Row highlighting on hover
  - Export data to CSV format
  - Visual indicators for boolean values (✓/✗)

### 🎨 User Experience

- **GridSync Technology**
  - Click any grid cell to highlight corresponding JSON
  - Instant visual feedback
  - Bidirectional synchronization

- **Accessibility & Customization**
  - Dark/Light theme switching
  - Responsive design for all screen sizes
  - Keyboard navigation support
  - Clear visual hierarchy

### 🛠 Technical Features

- Modern React with hooks
- Tailwind CSS for styling
- Radix UI components for accessibility
- Vite for fast development
- Performance optimized
- Mobile-first responsive design

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.10.0
- pnpm package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/username/jsongrid.git
   cd jsongrid
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start development server:
   ```bash
   pnpm dev
   ```

4. Open http://localhost:5173 in your browser

## 📦 Building for Production

```bash
pnpm build
```

The built files will be in the `dist` directory.

## 🚀 Deployment

### Render.com Deployment

This project includes pre-configured deployment settings for Render.com:

1. Push your code to GitHub
2. Create a new Static Site on [Render.com](https://render.com)
3. Connect your GitHub repository
4. Render will automatically:
   - Use the configuration from `render.yaml`
   - Install dependencies
   - Build the application
   - Deploy to a production URL

### Configuration Files

#### render.yaml
```yaml
services:
  - type: web
    name: jsongrid
    env: static
    buildCommand: pnpm install && pnpm build
    staticPublishPath: ./dist
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
    envVars:
      - key: NODE_VERSION
        value: 20.10.0
```

## 💻 Usage Guide

1. **Input JSON Data**
   - Enter or paste JSON in the editor
   - Real-time validation provides instant feedback
   - Format button helps clean up messy JSON

2. **View and Edit**
   - Toggle between Split and Tab views
   - Use line numbers for better navigation
   - Copy formatted JSON to clipboard

3. **Grid Features**
   - View JSON arrays as interactive tables
   - Sort columns by clicking headers
   - Export data to CSV format
   - Use fullscreen for larger datasets

4. **GridSync Navigation**
   - Click grid cells to locate JSON fields
   - Perfect for exploring complex data
   - Instant visual feedback

5. **Customization**
   - Switch between dark and light themes
   - Adjust view modes to your preference
   - Toggle line numbers in JSON editor

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- UI Components from [Radix UI](https://www.radix-ui.com/)
- Icons by [Lucide](https://lucide.dev/)
- Built with [Vite](https://vitejs.dev/)


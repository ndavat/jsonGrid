# JSON Grid Viewer Clone

A complete clone of the JSON Grid Viewer website (https://jsongrid.com/json-grid) built with React, Tailwind CSS, and shadcn/ui components.

## Features

- **Split Panel Layout**: JSON editor on the left, grid view on the right
- **Tab View Mode**: Switch between JSON and Grid tabs
- **GridSync Feature**: Click on grid cells to highlight corresponding JSON fields
- **Dark/Light Theme**: Toggle between dark and light themes
- **CSV Export**: Export grid data to CSV format
- **JSON Editor**: Full-featured JSON editor with syntax highlighting
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: Real-time JSON validation and error display

## Installation

1. Extract the zip file
2. Navigate to the project directory:
   ```bash
   cd jsongrid-clone
   ```

3. Install dependencies:
   ```bash
   pnpm install
   ```
   (or use `npm install` if you prefer npm)

## Running the Application

1. Start the development server:
   ```bash
   pnpm run dev
   ```
   (or `npm run dev`)

2. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To build the application for production:

```bash
pnpm run build
```

The built files will be in the `dist` directory.

## Usage

1. **JSON Input**: Enter or paste your JSON data in the left panel (JSON tab in tab mode)
2. **Grid View**: The right panel (GRID tab in tab mode) automatically displays array data as a table
3. **GridSync**: Click on any cell in the grid to highlight the corresponding JSON field
4. **Theme Toggle**: Use the theme button in the header to switch between light and dark modes
5. **View Mode**: Toggle between split-panel and tab view using the view mode button
6. **CSV Export**: Click the download button in the grid panel to export data as CSV
7. **JSON Tools**: Use the format, copy, and line number toggle buttons in the JSON panel

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- shadcn/ui components
- Lucide React icons

## Project Structure

```
jsongrid-clone/
├── src/
│   ├── components/ui/     # shadcn/ui components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── App.jsx           # Main application component
│   ├── App.css           # Application styles
│   └── main.jsx          # Entry point
├── public/               # Static assets
├── package.json          # Dependencies and scripts
└── vite.config.js        # Vite configuration
```

## License

This is a clone project created for educational purposes.


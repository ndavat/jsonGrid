import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Settings, 
  Download, 
  Share2, 
  Twitter, 
  Mail, 
  Sun, 
  Moon,
  Grid3X3,
  FileText,
  Search,
  Filter,
  RotateCcw,
  Check,
  Copy,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2
} from 'lucide-react'
import './App.css'

function App() {
  const [jsonInput, setJsonInput] = useState(`[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "city": "New York",
    "active": true
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "age": 25,
    "city": "Los Angeles",
    "active": false
  },
  {
    "id": 3,
    "name": "Bob Johnson",
    "email": "bob@example.com",
    "age": 35,
    "city": "Chicago",
    "active": true
  }
]`)
  
  const [parsedJson, setParsedJson] = useState(null)
  const [error, setError] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [viewMode, setViewMode] = useState('split') // 'split' or 'tab'
  const [activeTab, setActiveTab] = useState('json') // 'json' or 'grid'
  const [selectedCell, setSelectedCell] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showLineNumbers, setShowLineNumbers] = useState(true)
  const textareaRef = useRef(null)

  // Parse JSON on input change
  useEffect(() => {
    try {
      if (jsonInput.trim()) {
        const parsed = JSON.parse(jsonInput)
        setParsedJson(parsed)
        setError('')
      } else {
        setParsedJson(null)
        setError('')
      }
    } catch (err) {
      setError(err.message)
      setParsedJson(null)
    }
  }, [jsonInput])

  // Toggle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleCellClick = (rowIndex, colKey, value) => {
    setSelectedCell({ rowIndex, colKey, value })
    
    // Navigate to corresponding JSON field
    if (textareaRef.current) {
      const jsonStr = JSON.stringify(parsedJson, null, 2)
      const searchPattern = `"${colKey}": ${JSON.stringify(value)}`
      const index = jsonStr.indexOf(searchPattern)
      
      if (index !== -1) {
        textareaRef.current.focus()
        textareaRef.current.setSelectionRange(index, index + searchPattern.length)
      }
    }
  }

  const exportToCSV = () => {
    if (!Array.isArray(parsedJson) || parsedJson.length === 0) {
      alert('No valid array data to export')
      return
    }

    const headers = Object.keys(parsedJson[0])
    const csvContent = [
      headers.join(','),
      ...parsedJson.map(row => 
        headers.map(header => {
          const value = row[header]
          return typeof value === 'string' ? `"${value}"` : value
        }).join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'data.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonInput)
    alert('JSON copied to clipboard!')
  }

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      setJsonInput(JSON.stringify(parsed, null, 2))
    } catch (err) {
      alert('Invalid JSON format')
    }
  }

  const renderGrid = () => {
    if (!parsedJson) return null

    if (Array.isArray(parsedJson) && parsedJson.length > 0) {
      const headers = Object.keys(parsedJson[0])
      
      return (
        <div className="overflow-auto h-full">
          <table className="w-full border-collapse border border-border">
            <thead>
              <tr className="bg-muted">
                {headers.map((header, index) => (
                  <th 
                    key={index}
                    className="border border-border p-2 text-left font-medium cursor-pointer hover:bg-accent"
                    onClick={() => handleCellClick(-1, header, header)}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {parsedJson.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-accent/50">
                  {headers.map((header, colIndex) => (
                    <td 
                      key={colIndex}
                      className={`border border-border p-2 cursor-pointer hover:bg-accent ${
                        selectedCell?.rowIndex === rowIndex && selectedCell?.colKey === header 
                          ? 'bg-primary/20' 
                          : ''
                      }`}
                      onClick={() => handleCellClick(rowIndex, header, row[header])}
                    >
                      {typeof row[header] === 'boolean' 
                        ? (row[header] ? '✓' : '✗')
                        : String(row[header] ?? '')
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    } else {
      return (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <div className="text-center">
            <Grid3X3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>JSON data is not an array or is empty</p>
            <p className="text-sm">Grid view works best with array of objects</p>
          </div>
        </div>
      )
    }
  }

  const renderJsonEditor = () => (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-2 border-b border-border bg-muted/50">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">JSON</Badge>
          {error && <Badge variant="destructive">Error</Badge>}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowLineNumbers(!showLineNumbers)}
            title="Toggle line numbers"
          >
            {showLineNumbers ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={formatJson}
            title="Format JSON"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            title="Copy to clipboard"
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 relative">
        <Textarea
          ref={textareaRef}
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          className="h-full resize-none font-mono text-sm border-0 rounded-none"
          placeholder="Enter your JSON data here..."
        />
        {error && (
          <div className="absolute bottom-2 left-2 right-2 bg-destructive/10 border border-destructive/20 rounded p-2 text-sm text-destructive">
            {error}
          </div>
        )}
      </div>
    </div>
  )

  const renderGridView = () => (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-2 border-b border-border bg-muted/50">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">GRID</Badge>
          {Array.isArray(parsedJson) && (
            <Badge variant="outline">{parsedJson.length} rows</Badge>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={exportToCSV}
            disabled={!Array.isArray(parsedJson) || parsedJson.length === 0}
            title="Export to CSV"
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        {renderGrid()}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-primary">JSONGRID</h1>
              <div className="hidden md:flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Add to Chrome
                </Button>
                <Button variant="outline" size="sm">
                  Save & Share
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode(viewMode === 'split' ? 'tab' : 'split')}
                title="Switch view mode"
              >
                {viewMode === 'split' ? <FileText className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDarkMode(!isDarkMode)}
                title="Toggle theme"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 h-[calc(100vh-80px)]">
        {viewMode === 'split' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
            <Card className="h-full">
              <CardContent className="p-0 h-full">
                {renderJsonEditor()}
              </CardContent>
            </Card>
            
            <Card className="h-full">
              <CardContent className="p-0 h-full">
                {renderGridView()}
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Button
                  variant={activeTab === 'json' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('json')}
                >
                  JSON
                </Button>
                <Button
                  variant={activeTab === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('grid')}
                >
                  GRID
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 h-[calc(100%-80px)]">
              {activeTab === 'json' ? renderJsonEditor() : renderGridView()}
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer Info */}
      <div className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <h3 className="font-semibold text-primary">What is Json Grid</h3>
              <p className="text-sm text-muted-foreground">
                Json Grid converts Json to table format, which provide luxury to view complex Json data into friendly table format.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-primary">GridSync Feature</h3>
              <p className="text-sm text-muted-foreground">
                When user clicks on any of the Grid element, the left Json panel navigates to the associated Json field, providing instant preview.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-primary">Export to CSV</h3>
              <p className="text-sm text-muted-foreground">
                While viewing array in table format, click on export icon to generate CSV out of Json data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App


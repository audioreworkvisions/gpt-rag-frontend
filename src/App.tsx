import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu"
import { Welcome } from './pages/Welcome'
import { Chat } from './pages/Chat'
import { Search } from './pages/Search'

function App() {
  const [darkMode, setDarkMode] = useState(true);

  // Enable dark mode by default
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <BrowserRouter>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
        {/* Header with Navigation */}
        <header className={`fixed top-0 w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md transition-colors duration-300`}>
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-red-800 to-cyan-600 bg-clip-text text-transparent"
                  >
                    Fly with AI
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/chat" className="text-sm hover:text-cyan-500">
                    Chat
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/search" className="text-sm hover:text-cyan-500">
                    Search
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </Button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="container mx-auto px-4 pt-24 pb-8">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md transition-colors duration-300 mt-auto`}>
          <div className="container mx-auto px-4 py-4 text-center text-sm opacity-70">
            © 2024 Fly with AI. All rights reserved.
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App

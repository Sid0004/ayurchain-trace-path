import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart3, LogIn, Moon, Sun, Menu, X, Search } from 'lucide-react';
import { useTheme } from 'next-themes';
import Logo from '../assets/logo (2).png'; // adjust path based on your file

const Header = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/batch-lookup', label: 'Batch Lookup', icon: Search },
    { path: '/regulator-dashboard', label: 'Regulator Dashboard', icon: BarChart3 },
    { path: '/about', label: 'About', icon: null },
    { path: '/contact', label: 'Contact', icon: null },
  ];

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
  <img
    src={Logo}
    alt="AyurChain Logo"
    className="w-12 h-12 object-contain rounded-2xl shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300"
  />
  <span className="font-bold text-2xl text-foreground group-hover:text-primary transition-colors duration-200">
    AyurChain
  </span>
</Link>


          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-primary/10 ${
                  isActive(item.path) 
                    ? 'text-primary bg-primary/15' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="h-10 w-10 p-0 hover:bg-accent/50 rounded-xl hover:scale-105 transition-all duration-200"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button size="sm" className="flex items-center space-x-2 bg-primary hover:bg-primary/90 rounded-xl px-6 py-2 text-base font-semibold hover:scale-105 transition-all duration-200">
              <LogIn className="w-5 h-5" />
              <span>Login</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="h-10 w-10 p-0 rounded-xl"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="h-10 w-10 p-0 rounded-xl"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <nav className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-105 ${
                    isActive(item.path) 
                      ? 'text-primary bg-primary/15 shadow-lg' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  {item.icon && <item.icon className="w-6 h-6" />}
                  <span>{item.label}</span>
                </Link>
              ))}
              
              <div className="pt-3 border-t">
                <Button 
                  size="sm" 
                  className="w-full flex items-center justify-center space-x-2 bg-primary hover:bg-primary/90 rounded-xl py-3 text-lg font-semibold hover:scale-105 transition-all duration-200"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
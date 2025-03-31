
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LayoutDashboard, Map, Filter, Search } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();
  
  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center">
            <div className="rounded-md bg-geo-blue p-1 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <span className="ml-2 text-xl font-semibold">GeoIndustrix PRO</span>
          </Link>
        </div>
        
        <nav className="flex-1 ml-4">
          <ul className="flex items-center gap-4 lg:gap-6">
            <li>
              <Link
                to="/"
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/map"
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/map' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <Map className="h-4 w-4" />
                Map View
              </Link>
            </li>
            <li>
              <Link
                to="/filter"
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/filter' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <Filter className="h-4 w-4" />
                Filter
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="ml-auto flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search industries..."
              className="w-[200px] lg:w-[256px] pl-8"
            />
          </div>
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

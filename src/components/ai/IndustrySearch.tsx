
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Navigation, Building } from 'lucide-react';
import { topIndustryTypes, getLocationsByIndustryType } from '@/services/industryData';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const IndustrySearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search query is empty",
        description: "Please enter an industry type to search",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Get results from our mock data service
      const results = getLocationsByIndustryType(searchQuery);
      
      if (results.length === 0) {
        toast({
          title: "No results found",
          description: `No locations found for industry type: ${searchQuery}`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Search completed",
          description: `Found ${results.length} locations for ${searchQuery} industry`,
        });
        setSearchResults(results);
      }
      
      setIsSearching(false);
    }, 1500);
  };

  const handleResultClick = (location: any) => {
    // Navigate to the map view with location data
    navigate(`/map?location=${encodeURIComponent(JSON.stringify(location))}`);
    
    toast({
      title: "Navigating to location",
      description: `Showing ${location.talukaName}, ${location.state} on map`,
    });
  };

  return (
    <Card className="shadow-lg border-2 border-purple-100 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 pb-4">
        <CardTitle className="text-2xl flex items-center gap-2">
          <MapPin className="h-6 w-6 text-purple-600" />
          Industry Location Search
        </CardTitle>
        <CardDescription className="text-base">
          Find optimal locations for your industry using our AI-powered search
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter industry type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-lg py-6"
            />
            <Button 
              onClick={handleSearch} 
              disabled={isSearching}
              className="bg-purple-600 hover:bg-purple-700 px-6"
              size="lg"
            >
              {isSearching ? "Searching..." : "Search"}
              <Search className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Suggested industry types:</p>
            <div className="flex flex-wrap gap-2">
              {topIndustryTypes.map((industry, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery(industry.name)}
                  className="text-xs border-purple-200 hover:bg-purple-50"
                >
                  {industry.name}
                </Button>
              ))}
            </div>
          </div>
          
          {searchResults.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Building className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-medium">Search Results ({searchResults.length})</h3>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {searchResults.map((result, index) => (
                  <Card 
                    key={index} 
                    className="p-3 hover:bg-purple-50 transition-colors cursor-pointer"
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="flex justify-between">
                      <div>
                        <div className="flex items-center gap-1">
                          <Navigation className="h-3 w-3 text-purple-600" />
                          <p className="font-medium">{result.talukaName}, {result.district}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{result.state}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">₹{result.landPrice}/sqm</p>
                        <p className="text-xs text-muted-foreground">{result.laborAvail} labor</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs">Infrastructure: {result.infraIndex}/10</p>
                      <p className="text-xs">Incentives: {result.govtIncentives}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default IndustrySearch;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { topIndustryTypes, getLocationsByIndustryType } from '@/services/industryData';
import { useToast } from '@/components/ui/use-toast';

const IndustrySearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { toast } = useToast();

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Industry Location Search</CardTitle>
        <CardDescription>
          Search for optimal locations based on industry type
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <Input
            placeholder="Enter industry type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={handleSearch} 
            disabled={isSearching}
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
                className="text-xs"
              >
                {industry.name}
              </Button>
            ))}
          </div>
        </div>
        
        {searchResults.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-medium mb-2">Search Results:</p>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {searchResults.map((result, index) => (
                <Card key={index} className="p-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{result.talukaName}, {result.district}</p>
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
      </CardContent>
    </Card>
  );
};

export default IndustrySearch;

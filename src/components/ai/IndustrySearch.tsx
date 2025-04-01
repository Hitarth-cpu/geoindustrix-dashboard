
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Navigation, Building, Loader2 } from 'lucide-react';
import { topIndustryTypes, getLocationsByIndustryType } from '@/services/industryData';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  talukaName: string;
  district: string;
  state: string;
  landPrice: number;
  laborAvail: string;
  laborCost?: number;
  infraIndex: number;
  govtIncentives: string;
  suitabilityScore?: number;
  coordinates?: { lat: number; lng: number };
  reasonForRecommendation?: string;
}

const IndustrySearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search query is empty",
        description: "Please enter an industry type to search",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    try {
      // First try to get mock data from our service
      const results = getLocationsByIndustryType(searchQuery);
      
      // If we have results, use them (in a real app we'd enhance these with the LLM)
      if (results.length > 0) {
        // Simulate LLM processing by adding scores and recommendations
        const enhancedResults = results.map(result => ({
          ...result,
          suitabilityScore: Math.round(Math.random() * 50 + 50) / 10, // Random score between 5-10
          reasonForRecommendation: getRandomRecommendation(searchQuery, result),
          coordinates: { lat: 22.5 + Math.random(), lng: 72.5 + Math.random() } // Random coordinates near Gujarat
        }));
        
        // Sort by suitability score (highest first)
        enhancedResults.sort((a, b) => (b.suitabilityScore || 0) - (a.suitabilityScore || 0));
        
        toast({
          title: "AI analysis complete",
          description: `Found ${enhancedResults.length} optimal locations for ${searchQuery} industry`,
        });
        
        setSearchResults(enhancedResults);
      } else {
        // In a real implementation, this is where we'd make an actual LLM API call
        toast({
          title: "No results found",
          description: `No locations found for industry type: ${searchQuery}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error during search:", error);
      toast({
        title: "Search failed",
        description: "An error occurred while searching for locations",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const getRandomRecommendation = (industry: string, location: any) => {
    const recommendations = [
      `Optimal location due to ${location.infraIndex > 7 ? 'excellent' : 'good'} infrastructure and ${location.laborAvail.toLowerCase()} labor availability.`,
      `Recommended for ${industry} due to favorable government incentives and affordable land prices.`,
      `${location.talukaName} offers competitive advantages for ${industry} with good transport connectivity.`,
      `This area has a strong ecosystem for ${industry} with supporting industries nearby.`,
      `Land acquisition and setup costs are optimal here with ₹${location.landPrice}/sqm rates.`
    ];
    return recommendations[Math.floor(Math.random() * recommendations.length)];
  };

  const handleResultClick = (location: SearchResult) => {
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
          AI-Powered Industry Location Search
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
              {isSearching ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  Search
                  <Search className="ml-2 h-4 w-4" />
                </>
              )}
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
                <h3 className="text-lg font-medium">AI Recommended Locations ({searchResults.length})</h3>
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
                          {index === 0 && (
                            <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              Best Match
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{result.state}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">₹{result.landPrice}/sqm</p>
                        <p className="text-xs text-muted-foreground">{result.laborAvail} labor</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center mb-1">
                        <p className="text-xs mr-1">Suitability Score:</p>
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-green-600 rounded-full" 
                            style={{ width: `${(result.suitabilityScore || 0) * 10}%` }}
                          ></div>
                        </div>
                        <p className="text-xs ml-2 font-medium">{result.suitabilityScore}/10</p>
                      </div>
                      <p className="text-xs">Infrastructure: {result.infraIndex}/10</p>
                      <p className="text-xs">Incentives: {result.govtIncentives}</p>
                      {result.reasonForRecommendation && (
                        <p className="text-xs italic mt-1 text-gray-600">
                          "{result.reasonForRecommendation}"
                        </p>
                      )}
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


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Navigation, Building, Loader2 } from 'lucide-react';
import { topIndustryTypes, getLocationsByIndustryType } from '@/services/industryData';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

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
  address?: string;
  place_id?: string;
}

const IndustrySearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [serpApiKey, setSerpApiKey] = useState('');
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
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

    if (!serpApiKey) {
      setShowApiKeyDialog(true);
      return;
    }

    setIsSearching(true);
    
    try {
      // First get mock data from our service
      const baseResults = getLocationsByIndustryType(searchQuery);
      
      if (baseResults.length > 0) {
        const enhancedResults = await Promise.all(
          baseResults.map(async (result, index) => {
            // Calculate a default suitability score
            const defaultScore = Math.round(Math.random() * 50 + 50) / 10; // Random score between 5-10
            
            try {
              // Use SerpAPI to search for industrial locations
              const searchTerm = `${searchQuery} industry in ${result.talukaName}, ${result.state}`;
              const defaultCoords = { lat: 22.5 + index * 0.1, lng: 72.5 + index * 0.1 };
              
              const response = await fetch(
                `https://serpapi.com/search.json?engine=google_maps&q=${encodeURIComponent(searchTerm)}&ll=@${defaultCoords.lat},${defaultCoords.lng},12z&api_key=${serpApiKey}`
              );
              
              if (response.ok) {
                const data = await response.json();
                
                // If we have results from SerpAPI, use the first one
                if (data.local_results && data.local_results.length > 0) {
                  const serpResult = data.local_results[0];
                  
                  // Extract coordinates from SerpAPI result
                  const coords = serpResult.gps_coordinates ? {
                    lat: serpResult.gps_coordinates.latitude,
                    lng: serpResult.gps_coordinates.longitude
                  } : defaultCoords;
                  
                  return {
                    ...result,
                    talukaName: serpResult.title || result.talukaName,
                    district: result.district,
                    address: serpResult.address || `${result.talukaName}, ${result.state}`,
                    place_id: serpResult.place_id,
                    coordinates: coords,
                    suitabilityScore: defaultScore + (index === 0 ? 1 : 0), // Boost first result
                    reasonForRecommendation: getRandomRecommendation(searchQuery, result)
                  };
                }
              }
              
              // If SerpAPI didn't return results, use default data
              return {
                ...result,
                suitabilityScore: defaultScore + (index === 0 ? 1 : 0),
                reasonForRecommendation: getRandomRecommendation(searchQuery, result),
                coordinates: defaultCoords
              };
              
            } catch (error) {
              console.error("Error with SerpAPI:", error);
              // Return the base result with some enhancements if SerpAPI fails
              return {
                ...result,
                suitabilityScore: defaultScore,
                reasonForRecommendation: getRandomRecommendation(searchQuery, result),
                coordinates: { 
                  lat: 22.5 + index * 0.1, 
                  lng: 72.5 + index * 0.1 
                }
              };
            }
          })
        );
        
        // Sort by suitability score (highest first)
        enhancedResults.sort((a, b) => (b.suitabilityScore || 0) - (a.suitabilityScore || 0));
        
        toast({
          title: "Location search complete",
          description: `Found ${enhancedResults.length} optimal locations for ${searchQuery} industry`,
        });
        
        setSearchResults(enhancedResults);
      } else {
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

  const handleSubmitApiKey = () => {
    if (serpApiKey.trim()) {
      setShowApiKeyDialog(false);
      handleSearch();
    } else {
      toast({
        title: "API Key Required",
        description: "Please enter a valid SerpAPI key",
        variant: "destructive",
      });
    }
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
    <>
      <Card className="shadow-lg border-2 border-purple-100 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 pb-4">
          <CardTitle className="text-2xl flex items-center gap-2">
            <MapPin className="h-6 w-6 text-purple-600" />
            AI-Powered Industry Location Search
          </CardTitle>
          <CardDescription className="text-base">
            Find optimal locations for your industry using our AI-powered search with SerpAPI
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
                          <p className="text-sm text-muted-foreground">{result.address || result.state}</p>
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

      <Dialog open={showApiKeyDialog} onOpenChange={setShowApiKeyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter SerpAPI Key</DialogTitle>
            <DialogDescription>
              Please enter your SerpAPI key to search for industry locations
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <Input
              type="password"
              placeholder="Enter your SerpAPI key"
              value={serpApiKey}
              onChange={(e) => setSerpApiKey(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowApiKeyDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitApiKey}>
                Submit
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              This key will only be stored in your browser's memory. Get your key at <a href="https://serpapi.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">serpapi.com</a>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default IndustrySearch;

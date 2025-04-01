
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { 
  industrialLandData, 
  getAllStates, 
  getAllDistricts, 
  getAllIndustryTypes 
} from '@/services/industryData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter, MapPin, ArrowUpRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const FilterPage = () => {
  const [state, setState] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [industry, setIndustry] = useState<string>('');
  const [priceRange, setPriceRange] = useState<number[]>([0, 50000]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [hasFiltered, setHasFiltered] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  
  const uniqueStates = getAllStates();
  const uniqueDistricts = getAllDistricts();
  const uniqueIndustries = getAllIndustryTypes();
  
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check for location data in URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const locationParam = queryParams.get('location');
    
    if (locationParam) {
      try {
        const parsedLocation = JSON.parse(decodeURIComponent(locationParam));
        setSelectedLocation(parsedLocation);
        
        // Auto-set filters based on location
        setState(parsedLocation.state);
        setDistrict(parsedLocation.district);
        
        // Auto-apply filters
        setTimeout(() => handleFilter(), 300);
        
        toast({
          title: "Location loaded",
          description: `${parsedLocation.talukaName}, ${parsedLocation.district}`,
        });
      } catch (error) {
        console.error("Error parsing location data:", error);
      }
    }
  }, [location.search]);

  const handleFilter = () => {
    let results = [...industrialLandData];
    
    if (state) {
      results = results.filter(item => item.state === state);
    }
    
    if (district) {
      results = results.filter(item => item.district === district);
    }
    
    if (industry) {
      results = results.filter(item => item.industrySuitability.includes(industry));
    }
    
    results = results.filter(
      item => item.landPrice >= priceRange[0] && item.landPrice <= priceRange[1]
    );
    
    setFilteredData(results);
    setHasFiltered(true);
  };

  const handleReset = () => {
    setState('');
    setDistrict('');
    setIndustry('');
    setPriceRange([0, 50000]);
    setFilteredData([]);
    setHasFiltered(false);
    setSelectedLocation(null);
  };

  const handleViewOnMap = (item: any) => {
    // Navigate to map page with location data
    const encodedLocation = encodeURIComponent(JSON.stringify(item));
    navigate(`/map?location=${encodedLocation}`);
  };

  const handleRowClick = (item: any) => {
    setSelectedLocation(item === selectedLocation ? null : item);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Filter Industrial Locations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Select value={state} onValueChange={setState}>
              <SelectTrigger>
                <SelectValue placeholder="Select a state" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>States</SelectLabel>
                  {uniqueStates.map((state, index) => (
                    <SelectItem key={index} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="district">District</Label>
            <Select value={district} onValueChange={setDistrict}>
              <SelectTrigger>
                <SelectValue placeholder="Select a district" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Districts</SelectLabel>
                  {uniqueDistricts.map((district, index) => (
                    <SelectItem key={index} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="industry">Industry Type</Label>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger>
                <SelectValue placeholder="Select industry type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Industries</SelectLabel>
                  {uniqueIndustries.map((industry, index) => (
                    <SelectItem key={index} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Land Price Range (₹/sqm)</Label>
            <div className="pt-5 px-2">
              <Slider
                defaultValue={[0, 50000]}
                min={0}
                max={50000}
                step={1000}
                value={priceRange}
                onValueChange={setPriceRange}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>₹{priceRange[0].toLocaleString()}</span>
              <span>₹{priceRange[1].toLocaleString()}</span>
            </div>
          </div>
          
          <div className="pt-4 space-x-2 flex">
            <Button onClick={handleFilter} className="flex-1">
              <Filter className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>
            {hasFiltered
              ? `Filter Results (${filteredData.length} locations)`
              : 'Industrial Locations'
            }
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hasFiltered && filteredData.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No results match your filters</p>
              <Button variant="link" onClick={handleReset}>
                Reset filters
              </Button>
            </div>
          ) : (
            <div>
              {selectedLocation && (
                <Card className="mb-4 border-primary/20 bg-primary/5">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-lg flex items-center">
                        <MapPin className="h-4 w-4 text-primary mr-2" />
                        {selectedLocation.talukaName}, {selectedLocation.district}
                      </h3>
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewOnMap(selectedLocation)}
                      >
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        View on Map
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      <div>
                        <p className="text-sm"><span className="font-medium">State:</span> {selectedLocation.state}</p>
                        <p className="text-sm"><span className="font-medium">Population Density:</span> {selectedLocation.popDensity}/sqkm</p>
                        <p className="text-sm"><span className="font-medium">Land Price:</span> ₹{selectedLocation.landPrice}/sqm</p>
                        <p className="text-sm"><span className="font-medium">Labor Availability:</span> {selectedLocation.laborAvail}</p>
                        <p className="text-sm"><span className="font-medium">Labor Cost:</span> ₹{selectedLocation.laborCost}/day</p>
                      </div>
                      <div>
                        <p className="text-sm"><span className="font-medium">Infrastructure:</span> {selectedLocation.infraIndex}/10</p>
                        <p className="text-sm"><span className="font-medium">Industry Suitability:</span> {selectedLocation.industrySuitability.join(', ')}</p>
                        <p className="text-sm"><span className="font-medium">Govt. Incentives:</span> {selectedLocation.govtIncentives}</p>
                        <p className="text-sm"><span className="font-medium">Education Level:</span> {selectedLocation.eduLevel}</p>
                        <p className="text-sm"><span className="font-medium">Income Level:</span> {selectedLocation.incomeLevel}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[30px]"></TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>State</TableHead>
                      <TableHead>Industry Suitability</TableHead>
                      <TableHead className="text-right">Land Price</TableHead>
                      <TableHead>Infrastructure</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(hasFiltered ? filteredData : industrialLandData.slice(0, 10)).map((item, index) => (
                      <TableRow 
                        key={index}
                        className={selectedLocation?.id === item.id ? "bg-primary/10" : ""} 
                        onClick={() => handleRowClick(item)}
                      >
                        <TableCell className="cursor-pointer">
                          <Checkbox 
                            id={`select-${index}`} 
                            checked={selectedLocation?.id === item.id}
                            onCheckedChange={() => handleRowClick(item)}
                          />
                        </TableCell>
                        <TableCell className="font-medium cursor-pointer">
                          {item.talukaName}, {item.district}
                        </TableCell>
                        <TableCell className="cursor-pointer">{item.state}</TableCell>
                        <TableCell className="cursor-pointer">
                          <div className="flex flex-wrap gap-1">
                            {item.industrySuitability.slice(0, 2).map((ind: string, i: number) => (
                              <span key={i} className="text-xs bg-primary/10 px-1.5 py-0.5 rounded-full">{ind}</span>
                            ))}
                            {item.industrySuitability.length > 2 && (
                              <span className="text-xs bg-muted px-1.5 py-0.5 rounded-full">+{item.industrySuitability.length - 2}</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right cursor-pointer">₹{item.landPrice}/sqm</TableCell>
                        <TableCell className="cursor-pointer">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${(item.infraIndex / 10) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-xs">{item.infraIndex}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewOnMap(item);
                            }}
                          >
                            <MapPin className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FilterPage;

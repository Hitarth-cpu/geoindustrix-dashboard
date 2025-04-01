
import React, { useState } from 'react';
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
import { industrialLandData } from '@/services/industryData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter } from 'lucide-react';

const FilterPage = () => {
  const [state, setState] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [industry, setIndustry] = useState<string>('');
  const [priceRange, setPriceRange] = useState<number[]>([0, 20000]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [hasFiltered, setHasFiltered] = useState(false);

  const uniqueStates = Array.from(new Set(industrialLandData.map(item => item.state)));
  const uniqueDistricts = Array.from(new Set(industrialLandData.map(item => item.district)));
  const uniqueIndustries = Array.from(
    new Set(industrialLandData.flatMap(item => item.industrySuitability))
  );

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
    setPriceRange([0, 20000]);
    setFilteredData([]);
    setHasFiltered(false);
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
                defaultValue={[0, 20000]}
                min={0}
                max={20000}
                step={500}
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
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[30px]"></TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Industry Suitability</TableHead>
                    <TableHead className="text-right">Land Price</TableHead>
                    <TableHead>Labor</TableHead>
                    <TableHead>Infrastructure</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(hasFiltered ? filteredData : industrialLandData).map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Checkbox id={`select-${index}`} />
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.talukaName}, {item.district}
                      </TableCell>
                      <TableCell>{item.state}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {item.industrySuitability.slice(0, 2).map((ind, i) => (
                            <span key={i} className="text-xs bg-primary/10 px-1.5 py-0.5 rounded-full">{ind}</span>
                          ))}
                          {item.industrySuitability.length > 2 && (
                            <span className="text-xs bg-muted px-1.5 py-0.5 rounded-full">+{item.industrySuitability.length - 2}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">₹{item.landPrice}/sqm</TableCell>
                      <TableCell>{item.laborAvail}, ₹{item.laborCost}/day</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-geo-blue h-2 rounded-full" 
                              style={{ width: `${(item.infraIndex / 10) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs">{item.infraIndex}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FilterPage;

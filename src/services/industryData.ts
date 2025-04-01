// Mock data for industry types and regional data

// Top 5 industry types with search frequency
export const topIndustryTypes = [
  { name: 'Automobile', frequency: 785, growth: 12.5 },
  { name: 'Manufacturing', frequency: 652, growth: 8.2 },
  { name: 'Pharmaceuticals', frequency: 541, growth: 15.7 },
  { name: 'Electronics', frequency: 489, growth: 10.1 },
  { name: 'Textiles', frequency: 412, growth: 5.3 },
];

// State-wise industry data
export const stateIndustryData = [
  { state: 'Gujarat', totalIndustries: 14250, growthRate: 7.8, topSector: 'Chemicals' },
  { state: 'Maharashtra', totalIndustries: 18750, growthRate: 6.2, topSector: 'IT' },
  { state: 'Rajasthan', totalIndustries: 8945, growthRate: 4.5, topSector: 'Textiles' },
  { state: 'Karnataka', totalIndustries: 12350, growthRate: 9.3, topSector: 'Electronics' },
  { state: 'Tamil Nadu', totalIndustries: 15620, growthRate: 8.1, topSector: 'Automobile' },
];

// Sales by country and industry preference
export const countrySalesData = [
  { 
    country: 'India', 
    sales: 3650, 
    value: 325000000, 
    bounce: '21.5%',
    topIndustries: ['Textiles', 'Pharmaceuticals', 'IT', 'Automobile', 'Chemicals']
  },
  { 
    country: 'United States', 
    sales: 2500, 
    value: 230900000, 
    bounce: '29.9%',
    topIndustries: ['Pharmaceuticals', 'Defense', 'IT', 'Automobile', 'Aerospace']
  },
  { 
    country: 'Germany', 
    sales: 3900, 
    value: 440000000, 
    bounce: '40.22%',
    topIndustries: ['Automobile', 'Engineering', 'Chemicals', 'Electronics', 'Pharmaceuticals']
  },
  { 
    country: 'Great Britain', 
    sales: 1400, 
    value: 190700000, 
    bounce: '23.44%',
    topIndustries: ['Financial Services', 'Automobile', 'Pharmaceuticals', 'Food Processing', 'Defense']
  },
  { 
    country: 'Brazil', 
    sales: 562, 
    value: 143960000, 
    bounce: '32.14%',
    topIndustries: ['Agriculture', 'Mining', 'Automobile', 'Textiles', 'Food Processing']
  },
];

// Updated Regional industrial land data with precise coordinates
export const industrialLandData = [
  {
    id: 1,
    talukaName: 'Ahmedabad (City)',
    district: 'Ahmedabad',
    state: 'Gujarat',
    popDensity: 12500,
    eduLevel: 'High',
    incomeLevel: 'High',
    industrySuitability: ['IT', 'Finance', 'Healthcare'],
    landPrice: 15000,
    laborAvail: 'High',
    laborCost: 900,
    infraIndex: 9.5,
    transport: 'High',
    envFactors: 'Moderate',
    proximity: 0,
    govtIncentives: 'SEZ, Smart City',
    coordinates: { lat: 23.0225, lng: 72.5714 }
  },
  {
    id: 2,
    talukaName: 'Dholera',
    district: 'Ahmedabad',
    state: 'Gujarat',
    popDensity: 600,
    eduLevel: 'Medium',
    incomeLevel: 'Medium',
    industrySuitability: ['Manufacturing', 'Logistics'],
    landPrice: 15000,
    laborAvail: 'High',
    laborCost: 550,
    infraIndex: 8.0,
    transport: 'High',
    envFactors: 'Favorable',
    proximity: 120,
    govtIncentives: 'Greenfield Project',
    coordinates: { lat: 22.2465, lng: 72.1937 }
  },
  {
    id: 3,
    talukaName: 'Mundra',
    district: 'Kutch',
    state: 'Gujarat',
    popDensity: 1400,
    eduLevel: 'High',
    incomeLevel: 'High',
    industrySuitability: ['Port Logistics', 'Warehousing'],
    landPrice: 4500,
    laborAvail: 'High',
    laborCost: 550,
    infraIndex: 8.0,
    transport: 'High',
    envFactors: 'Moderate',
    proximity: 30,
    govtIncentives: 'Port & SEZ Benefits',
    coordinates: { lat: 22.8394, lng: 69.7298 }
  },
  {
    id: 4,
    talukaName: 'Sanand',
    district: 'Ahmedabad',
    state: 'Gujarat',
    popDensity: 2500,
    eduLevel: 'High',
    incomeLevel: 'High',
    industrySuitability: ['Auto', 'Manufacturing', 'Electronics'],
    landPrice: 15000,
    laborAvail: 'High',
    laborCost: 600,
    infraIndex: 8.5,
    transport: 'High',
    envFactors: 'Moderate',
    proximity: 10,
    govtIncentives: 'SEZ, IT Park',
    coordinates: { lat: 22.9920, lng: 72.3814 }
  },
  {
    id: 5,
    talukaName: 'Vapi',
    district: 'Valsad',
    state: 'Gujarat',
    popDensity: 3200,
    eduLevel: 'High',
    incomeLevel: 'High',
    industrySuitability: ['Chemicals', 'Pharmaceuticals', 'Textiles'],
    landPrice: 8000,
    laborAvail: 'High',
    laborCost: 620,
    infraIndex: 9.0,
    transport: 'High',
    envFactors: 'Concerning',
    proximity: 0,
    govtIncentives: 'SEZ, Industrial Growth',
    coordinates: { lat: 20.3893, lng: 72.9106 }
  },
  {
    id: 6,
    talukaName: 'Ankleshwar',
    district: 'Bharuch',
    state: 'Gujarat',
    popDensity: 2300,
    eduLevel: 'High',
    incomeLevel: 'High',
    industrySuitability: ['Pharmaceuticals', 'Chemicals'],
    landPrice: 8500,
    laborAvail: 'High',
    laborCost: 640,
    infraIndex: 9.0,
    transport: 'High',
    envFactors: 'Concerning',
    proximity: 20,
    govtIncentives: 'Chemical & Pharma SEZ',
    coordinates: { lat: 21.6257, lng: 73.0051 }
  },
  {
    id: 7,
    talukaName: 'Surat',
    district: 'Surat',
    state: 'Gujarat',
    popDensity: 4500,
    eduLevel: 'High',
    incomeLevel: 'High',
    industrySuitability: ['Diamond Processing', 'Textiles', 'IT'],
    landPrice: 9000,
    laborAvail: 'High',
    laborCost: 700,
    infraIndex: 9.5,
    transport: 'High',
    envFactors: 'Moderate',
    proximity: 0,
    govtIncentives: 'SEZ, Smart City, Export Promotion',
    coordinates: { lat: 21.1702, lng: 72.8311 }
  },
  {
    id: 8,
    talukaName: 'Vadodara',
    district: 'Vadodara',
    state: 'Gujarat',
    popDensity: 2500,
    eduLevel: 'High',
    incomeLevel: 'High',
    industrySuitability: ['IT', 'Engineering', 'Pharma'],
    landPrice: 8200,
    laborAvail: 'High',
    laborCost: 650,
    infraIndex: 9.0,
    transport: 'High',
    envFactors: 'Favorable',
    proximity: 0,
    govtIncentives: 'Smart City, SEZ, Industrial Growth',
    coordinates: { lat: 22.3072, lng: 73.1812 }
  },
  {
    id: 9,
    talukaName: 'Bharuch',
    district: 'Bharuch',
    state: 'Gujarat',
    popDensity: 2500,
    eduLevel: 'High',
    incomeLevel: 'High',
    industrySuitability: ['Petrochemicals', 'Ports', 'Manufacturing'],
    landPrice: 8500,
    laborAvail: 'High',
    laborCost: 650,
    infraIndex: 9.2,
    transport: 'High',
    envFactors: 'Concerning',
    proximity: 0,
    govtIncentives: 'SEZ, Industrial Growth Grants',
    coordinates: { lat: 21.7051, lng: 72.9959 }
  },
  {
    id: 10,
    talukaName: 'Rajkot',
    district: 'Rajkot',
    state: 'Gujarat',
    popDensity: 3500,
    eduLevel: 'High',
    incomeLevel: 'High',
    industrySuitability: ['Engineering', 'IT', 'Manufacturing'],
    landPrice: 7000,
    laborAvail: 'High',
    laborCost: 650,
    infraIndex: 9.0,
    transport: 'High',
    envFactors: 'Favorable',
    proximity: 0,
    govtIncentives: 'SEZ, Smart City, MSME Growth',
    coordinates: { lat: 22.3039, lng: 70.8022 }
  },
  {
    id: 11,
    talukaName: 'Morbi',
    district: 'Rajkot',
    state: 'Gujarat',
    popDensity: 1800,
    eduLevel: 'Medium',
    incomeLevel: 'High',
    industrySuitability: ['Ceramics', 'Tiles', 'Sanitaryware'],
    landPrice: 7000,
    laborAvail: 'High',
    laborCost: 550,
    infraIndex: 8.5,
    transport: 'High',
    envFactors: 'Moderate',
    proximity: 60,
    govtIncentives: 'Ceramic Industry Subsidies',
    coordinates: { lat: 22.8172, lng: 70.8369 }
  },
  {
    id: 12,
    talukaName: 'Jamnagar',
    district: 'Jamnagar',
    state: 'Gujarat',
    popDensity: 2200,
    eduLevel: 'High',
    incomeLevel: 'High',
    industrySuitability: ['Petrochemicals', 'Ports'],
    landPrice: 7200,
    laborAvail: 'High',
    laborCost: 600,
    infraIndex: 9.0,
    transport: 'High',
    envFactors: 'Moderate',
    proximity: 0,
    govtIncentives: 'SEZ, Port Development',
    coordinates: { lat: 22.4707, lng: 70.0577 }
  },
  {
    id: 13,
    talukaName: 'Mehsana',
    district: 'Mehsana',
    state: 'Gujarat',
    popDensity: 2000,
    eduLevel: 'High',
    incomeLevel: 'High',
    industrySuitability: ['IT', 'Industrial Hubs'],
    landPrice: 6200,
    laborAvail: 'High',
    laborCost: 600,
    infraIndex: 9.0,
    transport: 'High',
    envFactors: 'Favorable',
    proximity: 0,
    govtIncentives: 'SEZ, Smart City',
    coordinates: { lat: 23.5880, lng: 72.3693 }
  },
  {
    id: 14,
    talukaName: 'Anand',
    district: 'Anand',
    state: 'Gujarat',
    popDensity: 2500,
    eduLevel: 'High',
    incomeLevel: 'High',
    industrySuitability: ['Dairy', 'Agro-processing'],
    landPrice: 7800,
    laborAvail: 'High',
    laborCost: 620,
    infraIndex: 9.0,
    transport: 'High',
    envFactors: 'Favorable',
    proximity: 0,
    govtIncentives: 'Dairy Industry & Agro-Processing Hub',
    coordinates: { lat: 22.5645, lng: 72.9289 }
  },
  {
    id: 15,
    talukaName: 'Mumbai City',
    district: 'Mumbai City',
    state: 'Maharashtra',
    popDensity: 20000,
    eduLevel: 'High',
    incomeLevel: 'High',
    industrySuitability: ['Finance', 'IT', 'Services'],
    landPrice: 50000,
    laborAvail: 'Very High',
    laborCost: 800,
    infraIndex: 9.5,
    transport: 'Very High',
    envFactors: 'Concerning',
    proximity: 0,
    govtIncentives: 'Financial & IT Hub Growth',
    coordinates: { lat: 18.9387, lng: 72.8353 }
  },
  {
    id: 16,
    talukaName: 'Thane',
    district: 'Thane',
    state: 'Maharashtra',
    popDensity: 15000,
    eduLevel: 'High',
    incomeLevel: 'High',
    industrySuitability: ['IT', 'Services', 'Finance'],
    landPrice: 25000,
    laborAvail: 'Very High',
    laborCost: 750,
    infraIndex: 9.2,
    transport: 'Very High',
    envFactors: 'Concerning',
    proximity: 0,
    govtIncentives: 'IT & Corporate Growth',
    coordinates: { lat: 19.2183, lng: 72.9781 }
  },
  {
    id: 17,
    talukaName: 'Nashik',
    district: 'Nashik',
    state: 'Maharashtra',
    popDensity: 13000,
    eduLevel: 'High',
    incomeLevel: 'High',
    industrySuitability: ['Wine Industry', 'IT', 'Tourism'],
    landPrice: 18000,
    laborAvail: 'Very High',
    laborCost: 720,
    infraIndex: 9.0,
    transport: 'High',
    envFactors: 'Favorable',
    proximity: 0,
    govtIncentives: 'Wine & IT Hub Development',
    coordinates: { lat: 19.9975, lng: 73.7898 }
  },
  {
    id: 18,
    talukaName: 'Sinnar',
    district: 'Nashik',
    state: 'Maharashtra',
    popDensity: 8800,
    eduLevel: 'Medium',
    incomeLevel: 'Medium',
    industrySuitability: ['Auto Components', 'MSME'],
    landPrice: 18000,
    laborAvail: 'High',
    laborCost: 610,
    infraIndex: 8.2,
    transport: 'High',
    envFactors: 'Favorable',
    proximity: 20,
    govtIncentives: 'Industrial & Auto Hub',
    coordinates: { lat: 19.8156, lng: 73.9989 }
  },
  {
    id: 19,
    talukaName: 'Pune',
    district: 'Pune',
    state: 'Maharashtra',
    popDensity: 16000,
    eduLevel: 'High',
    incomeLevel: 'High',
    industrySuitability: ['IT', 'Automobile', 'Manufacturing'],
    landPrice: 30000,
    laborAvail: 'Very High',
    laborCost: 780,
    infraIndex: 9.3,
    transport: 'Very High',
    envFactors: 'Moderate',
    proximity: 0,
    govtIncentives: 'IT & Auto Hub',
    coordinates: { lat: 18.5204, lng: 73.8567 }
  },
  {
    id: 20,
    talukaName: 'Bhiwandi',
    district: 'Thane',
    state: 'Maharashtra',
    popDensity: 13500,
    eduLevel: 'Medium',
    incomeLevel: 'High',
    industrySuitability: ['Textile', 'Warehousing'],
    landPrice: 25000,
    laborAvail: 'High',
    laborCost: 720,
    infraIndex: 8.6,
    transport: 'High',
    envFactors: 'Concerning',
    proximity: 10,
    govtIncentives: 'Textile & Warehousing Boost',
    coordinates: { lat: 19.2813, lng: 73.0684 }
  }
];

// Function to filter data by industry type
export const getLocationsByIndustryType = (industryType: string) => {
  return industrialLandData.filter(location => 
    location.industrySuitability.includes(industryType)
  );
};

// Function to generate industry recommendations
export const getIndustryRecommendations = (state: string, district?: string) => {
  const filteredLocations = district 
    ? industrialLandData.filter(location => location.state === state && location.district === district)
    : industrialLandData.filter(location => location.state === state);
  
  if (filteredLocations.length === 0) return [];
  
  // Count industry suitability frequencies
  const industryCounts: Record<string, number> = {};
  
  filteredLocations.forEach(location => {
    location.industrySuitability.forEach(industry => {
      industryCounts[industry] = (industryCounts[industry] || 0) + 1;
    });
  });
  
  // Convert to array and sort by frequency
  return Object.entries(industryCounts)
    .map(([industry, count]) => ({ industry, count }))
    .sort((a, b) => b.count - a.count);
};

// Get all unique industry types
export const getAllIndustryTypes = () => {
  const industries = new Set<string>();
  
  industrialLandData.forEach(location => {
    location.industrySuitability.forEach(industry => {
      industries.add(industry);
    });
  });
  
  return Array.from(industries).sort();
};

// Get all unique districts
export const getAllDistricts = () => {
  const districts = new Set<string>();
  
  industrialLandData.forEach(location => {
    districts.add(location.district);
  });
  
  return Array.from(districts).sort();
};

// Get all unique states
export const getAllStates = () => {
  const states = new Set<string>();
  
  industrialLandData.forEach(location => {
    states.add(location.state);
  });
  
  return Array.from(states).sort();
};

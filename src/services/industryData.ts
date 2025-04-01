
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

// Regional industrial land data
export const industrialLandData = [
  {
    id: 1,
    talukaName: 'Sanand',
    district: 'Ahmedabad',
    state: 'Gujarat',
    popDensity: 450,
    eduLevel: 'Medium',
    incomeLevel: 'Medium-High',
    industrySuitability: ['Automobile', 'Manufacturing', 'Electronics'],
    landPrice: 12500,
    laborAvail: 'High',
    laborCost: 450,
    infraIndex: 8.2,
    transport: 'Excellent',
    envFactors: 'Moderate',
    proximity: 15,
    govtIncentives: 'High'
  },
  {
    id: 2,
    talukaName: 'Vapi',
    district: 'Valsad',
    state: 'Gujarat',
    popDensity: 380,
    eduLevel: 'Medium',
    incomeLevel: 'Medium',
    industrySuitability: ['Chemicals', 'Pharmaceuticals', 'Textiles'],
    landPrice: 9800,
    laborAvail: 'High',
    laborCost: 420,
    infraIndex: 7.5,
    transport: 'Good',
    envFactors: 'Concerning',
    proximity: 28,
    govtIncentives: 'Medium'
  },
  {
    id: 3,
    talukaName: 'Neemrana',
    district: 'Alwar',
    state: 'Rajasthan',
    popDensity: 320,
    eduLevel: 'Medium-Low',
    incomeLevel: 'Medium',
    industrySuitability: ['Manufacturing', 'Electronics', 'Automobile'],
    landPrice: 7500,
    laborAvail: 'Medium',
    laborCost: 380,
    infraIndex: 7.0,
    transport: 'Good',
    envFactors: 'Favorable',
    proximity: 22,
    govtIncentives: 'Very High'
  },
  {
    id: 4,
    talukaName: 'Chakan',
    district: 'Pune',
    state: 'Maharashtra',
    popDensity: 520,
    eduLevel: 'High',
    incomeLevel: 'High',
    industrySuitability: ['Automobile', 'Engineering', 'Manufacturing'],
    landPrice: 18500,
    laborAvail: 'High',
    laborCost: 520,
    infraIndex: 8.8,
    transport: 'Excellent',
    envFactors: 'Moderate',
    proximity: 12,
    govtIncentives: 'Medium'
  },
  {
    id: 5,
    talukaName: 'Dahej',
    district: 'Bharuch',
    state: 'Gujarat',
    popDensity: 280,
    eduLevel: 'Medium',
    incomeLevel: 'Medium',
    industrySuitability: ['Chemicals', 'Petrochemicals', 'Manufacturing'],
    landPrice: 8200,
    laborAvail: 'Medium',
    laborCost: 400,
    infraIndex: 7.8,
    transport: 'Good',
    envFactors: 'Concerning',
    proximity: 35,
    govtIncentives: 'High'
  },
  {
    id: 6,
    talukaName: 'Sriperumbudur',
    district: 'Kanchipuram',
    state: 'Tamil Nadu',
    popDensity: 480,
    eduLevel: 'Medium-High',
    incomeLevel: 'Medium-High',
    industrySuitability: ['Electronics', 'Automobile', 'IT Hardware'],
    landPrice: 14500,
    laborAvail: 'High',
    laborCost: 490,
    infraIndex: 8.5,
    transport: 'Excellent',
    envFactors: 'Favorable',
    proximity: 18,
    govtIncentives: 'Medium-High'
  },
  {
    id: 7,
    talukaName: 'Baddi',
    district: 'Solan',
    state: 'Himachal Pradesh',
    popDensity: 250,
    eduLevel: 'Medium',
    incomeLevel: 'Medium-Low',
    industrySuitability: ['Pharmaceuticals', 'FMCG', 'Packaging'],
    landPrice: 6800,
    laborAvail: 'Medium',
    laborCost: 360,
    infraIndex: 6.5,
    transport: 'Moderate',
    envFactors: 'Favorable',
    proximity: 45,
    govtIncentives: 'Very High'
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

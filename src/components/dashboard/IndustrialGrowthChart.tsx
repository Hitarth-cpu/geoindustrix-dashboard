
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Sample data for the chart
const data = [
  { month: 'Jan', manufacturing: 150, automobile: 80, pharmaceutical: 110 },
  { month: 'Feb', manufacturing: 180, automobile: 100, pharmaceutical: 130 },
  { month: 'Mar', manufacturing: 220, automobile: 120, pharmaceutical: 140 },
  { month: 'Apr', manufacturing: 250, automobile: 150, pharmaceutical: 170 },
  { month: 'May', manufacturing: 280, automobile: 190, pharmaceutical: 210 },
  { month: 'Jun', manufacturing: 310, automobile: 220, pharmaceutical: 245 },
  { month: 'Jul', manufacturing: 330, automobile: 270, pharmaceutical: 265 },
  { month: 'Aug', manufacturing: 360, automobile: 310, pharmaceutical: 290 },
  { month: 'Sep', manufacturing: 380, automobile: 280, pharmaceutical: 310 },
  { month: 'Oct', manufacturing: 410, automobile: 320, pharmaceutical: 340 },
  { month: 'Nov', manufacturing: 390, automobile: 290, pharmaceutical: 320 },
  { month: 'Dec', manufacturing: 430, automobile: 340, pharmaceutical: 360 },
];

const IndustrialGrowthChart = () => {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Industrial Growth Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10, right: 30, left: 0, bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="manufacturing" stackId="1" stroke="#3182CE" fill="#3182CE" fillOpacity={0.6} />
              <Area type="monotone" dataKey="automobile" stackId="2" stroke="#38B2AC" fill="#38B2AC" fillOpacity={0.6} />
              <Area type="monotone" dataKey="pharmaceutical" stackId="3" stroke="#9F7AEA" fill="#9F7AEA" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            <span className="mr-2">Year-to-Year Growth:</span>
            <span className="font-medium text-green-500">+14.2%</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-geo-blue mr-2"></div>
              <span className="text-sm">Manufacturing</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-geo-teal mr-2"></div>
              <span className="text-sm">Automobile</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-geo-purple mr-2"></div>
              <span className="text-sm">Pharmaceutical</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndustrialGrowthChart;

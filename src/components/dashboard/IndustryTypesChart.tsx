
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { topIndustryTypes } from '@/services/industryData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const IndustryTypesChart = () => {
  const data = topIndustryTypes.map(industry => ({
    name: industry.name,
    searchFrequency: industry.frequency,
    growth: industry.growth
  }));

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Top Industry Types by Search Frequency</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20, right: 30, left: 20, bottom: 5,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => {
                  return [value, name === 'searchFrequency' ? 'Search Frequency' : 'Growth Rate %'];
                }}
              />
              <Bar dataKey="searchFrequency" fill="#3182CE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 space-y-2">
          <p className="text-sm font-medium">Industry Insights:</p>
          <ul className="space-y-1 text-sm">
            {topIndustryTypes.map((industry, index) => (
              <li key={index} className="flex items-center justify-between">
                <span className="flex items-center">
                  <span className={`w-2 h-2 rounded-full mr-2 bg-geo-${index === 0 ? 'blue' : index === 1 ? 'teal' : index === 2 ? 'purple' : index === 3 ? 'green' : 'orange'}`}></span>
                  {industry.name}
                </span>
                <span className="text-right flex items-center gap-2">
                  <span>{industry.frequency} searches</span>
                  <span className={`${industry.growth > 0 ? 'text-green-500' : 'text-red-500'} text-xs`}>
                    {industry.growth > 0 ? '+' : ''}{industry.growth}%
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndustryTypesChart;


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, className }) => {
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {change && (
              <p className={`text-xs mt-1 ${change.positive ? 'text-green-500' : 'text-red-500'}`}>
                {change.positive ? '+' : ''}{change.value}
              </p>
            )}
          </div>
          <div className="rounded-full p-3 bg-primary/10 text-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;

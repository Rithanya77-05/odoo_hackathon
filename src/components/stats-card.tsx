import React from 'react';
import { Card, CardContent } from './ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBgColor: string;
  description?: string;
}

export function StatsCard({ title, value, icon, iconBgColor, description }: StatsCardProps) {
  return (
    <Card className="border-0 shadow-lg transition-all duration-200 hover:shadow-xl" style={{ backgroundColor: '#FAF0E6' }}>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div 
            className="p-3 rounded-full flex items-center justify-center"
            style={{ backgroundColor: iconBgColor }}
          >
            {icon}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium mb-1" style={{ color: '#8D6E63' }}>{title}</p>
            <p className="text-2xl font-bold" style={{ color: '#6D4C41' }}>{value}</p>
            {description && (
              <p className="text-xs mt-1" style={{ color: '#8D6E63' }}>{description}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
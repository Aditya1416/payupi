
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'expense' | 'income' | 'due' | 'split';
  category: string;
  time: string;
  emoji: string;
}

interface CategoryChartProps {
  transactions: Transaction[];
}

const CategoryChart = ({ transactions }: CategoryChartProps) => {
  const [viewType, setViewType] = useState<'pie' | 'bar'>('pie');

  // Calculate category spending
  const categoryData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      const existing = acc.find(item => item.category === transaction.category);
      if (existing) {
        existing.amount += transaction.amount;
      } else {
        acc.push({
          category: transaction.category,
          amount: transaction.amount,
          color: getCategoryColor(transaction.category)
        });
      }
      return acc;
    }, [] as { category: string; amount: number; color: string }[]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658'];

  function getCategoryColor(category: string): string {
    const colorMap: { [key: string]: string } = {
      'Food': '#FF8042',
      'Transport': '#0088FE',
      'Rent': '#00C49F',
      'Education': '#8884D8',
      'Entertainment': '#FFBB28',
      'Bills': '#82CA9D',
      'Shopping': '#FFC658',
      'Health': '#FF6B6B',
      'Other': '#95A5A6'
    };
    return colorMap[category] || '#95A5A6';
  }

  if (categoryData.length === 0) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <span>📊</span>
            Spending by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 text-center py-8">No expense data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-white">
            <span>📊</span>
            Spending by Category
          </CardTitle>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={viewType === 'pie' ? 'default' : 'outline'}
              onClick={() => setViewType('pie')}
              className="text-xs"
            >
              🥧 Pie
            </Button>
            <Button
              size="sm"
              variant={viewType === 'bar' ? 'default' : 'outline'}
              onClick={() => setViewType('bar')}
              className="text-xs"
            >
              📊 Bar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {viewType === 'pie' ? (
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="amount"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']}
                  contentStyle={{ 
                    backgroundColor: '#374151', 
                    border: '1px solid #4B5563',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }}
                />
              </PieChart>
            ) : (
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <XAxis 
                  dataKey="category" 
                  stroke="#9CA3AF"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip 
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']}
                  contentStyle={{ 
                    backgroundColor: '#374151', 
                    border: '1px solid #4B5563',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }}
                />
                <Bar dataKey="amount" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {categoryData.slice(0, 6).map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-gray-300">
                {item.category}: ₹{item.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryChart;

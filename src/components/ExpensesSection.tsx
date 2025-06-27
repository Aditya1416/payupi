
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import TransactionCard from './TransactionCard';
import CategoryChart from './CategoryChart';
import { 
  Filter, 
  Calendar, 
  TrendingDown, 
  TrendingUp, 
  IndianRupee,
  BarChart3,
  PieChart,
  Download
} from 'lucide-react';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'expense' | 'income' | 'due' | 'split';
  category: string;
  time: string;
  emoji: string;
  splitWith?: string[];
  upiId?: string;
  merchant?: string;
  isRecurring?: boolean;
  dueDate?: string;
  finePerDay?: number;
}

interface ExpensesSectionProps {
  transactions: Transaction[];
}

const ExpensesSection = ({ transactions }: ExpensesSectionProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Calculate totals
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const netAmount = totalIncome - totalExpenses;

  // Group by categories
  const categoryData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      const category = transaction.category;
      if (!acc[category]) {
        acc[category] = { total: 0, count: 0, transactions: [] };
      }
      acc[category].total += transaction.amount;
      acc[category].count += 1;
      acc[category].transactions.push(transaction);
      return acc;
    }, {} as Record<string, { total: number; count: number; transactions: Transaction[] }>);

  const categories = Object.entries(categoryData).map(([name, data]) => ({
    name,
    ...data
  })).sort((a, b) => b.total - a.total);

  // Filter transactions
  const filteredTransactions = transactions.filter(t => {
    if (selectedCategory === 'all') return true;
    return t.category === selectedCategory;
  });

  const periodOptions = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: '3 Months' },
    { value: 'year', label: 'This Year' }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Period Selector */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">📊 Expenses</h2>
          <p className="text-gray-400">Track your spending patterns</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            {periodOptions.find(p => p.value === selectedPeriod)?.label}
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-red-400" />
              <span className="text-sm text-gray-400">Spent</span>
            </div>
            <p className="text-xl font-bold text-red-400 flex items-center">
              <IndianRupee className="w-4 h-4" />
              {totalExpenses.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-400">Earned</span>
            </div>
            <p className="text-xl font-bold text-green-400 flex items-center">
              <IndianRupee className="w-4 h-4" />
              {totalIncome.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-400">Net</span>
            </div>
            <p className={`text-xl font-bold flex items-center ${
              netAmount >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {netAmount >= 0 ? '+' : '-'}
              <IndianRupee className="w-4 h-4" />
              {Math.abs(netAmount).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analysis */}
      <Tabs defaultValue="chart" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800">
          <TabsTrigger value="chart" className="flex items-center gap-2">
            <PieChart className="w-4 h-4" />
            Chart
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Categories
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4" />
            All
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chart" className="space-y-4">
          <CategoryChart transactions={transactions} />
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="space-y-3">
            {categories.map((category, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">
                        {category.name === 'Food' && '🍕'}
                        {category.name === 'Transport' && '🚗'}
                        {category.name === 'Entertainment' && '🎬'}
                        {category.name === 'Shopping' && '🛒'}
                        {category.name === 'Bills' && '📄'}
                        {category.name === 'Education' && '📚'}
                        {!['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Education'].includes(category.name) && '💰'}
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{category.name}</h3>
                        <p className="text-sm text-gray-400">{category.count} transactions</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-400 flex items-center">
                        <IndianRupee className="w-4 h-4" />
                        {category.total.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        {Math.round((category.total / totalExpenses) * 100)}% of total
                      </p>
                    </div>
                  </div>
                  
                  {/* Category spending bar */}
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(category.total / totalExpenses) * 100}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
              className="whitespace-nowrap"
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.name)}
                className="whitespace-nowrap"
              >
                {category.name}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Transactions List */}
          <div className="space-y-3">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <TransactionCard key={transaction.id} transaction={transaction} />
              ))
            ) : (
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-400">No transactions found for this category</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Export Button */}
      <Button
        variant="outline"
        className="w-full"
      >
        <Download className="w-4 h-4 mr-2" />
        Export Transactions
      </Button>
    </div>
  );
};

export default ExpensesSection;

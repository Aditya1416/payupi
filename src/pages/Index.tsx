import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, TrendingUp, TrendingDown, Users, IndianRupee, Bell } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import TransactionCard from '@/components/TransactionCard';
import ExpenseForm from '@/components/ExpenseForm';
import FloatingAddButton from '@/components/FloatingAddButton';
import CategoryChart from '@/components/CategoryChart';
import UncategorizedReview from '@/components/UncategorizedReview';
import MeSection from '@/components/MeSection';
import ExpensesSection from '@/components/ExpensesSection';

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

const Index = () => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      description: 'Zomato Food Order',
      amount: 350,
      type: 'expense' as const,
      category: 'Food',
      time: '2 hours ago',
      emoji: '🍕',
      merchant: 'Zomato',
      upiId: 'zomato@paytm'
    },
    {
      id: 2,
      description: 'Split Uber Ride',
      amount: 150,
      type: 'split' as const,
      category: 'Transport',
      time: '5 hours ago',
      emoji: '🚗',
      splitWith: ['Rahul', 'Priya'],
      merchant: 'Uber'
    },
    {
      id: 3,
      description: 'Pocket Money',
      amount: 5000,
      type: 'income' as const,
      category: 'Family',
      time: '1 day ago',
      emoji: '💰'
    }
  ]);

  // Mock data for demonstration
  const monthlyStats = {
    totalExpenses: 12450,
    totalIncome: 15000,
    savings: 2550,
    budget: 10000
  };

  const friends = [
    { 
      name: 'Rahul', 
      owes: 450, 
      avatar: '👨‍🎓',
      dueDate: '2025-01-05',
      fineAmount: 50
    },
    { 
      name: 'Priya', 
      owes: -200, 
      avatar: '👩‍🎓',
      dueDate: '2025-01-10',
      fineAmount: 0
    },
    { 
      name: 'Arjun', 
      owes: 300, 
      avatar: '👨‍💻',
      dueDate: '2025-01-15',
      fineAmount: 25
    }
  ];

  const uncategorizedCount = transactions.filter(t => t.category === 'Uncategorized').length;
  const pendingDuesCount = friends.filter(f => f.owes > 0).length;

  const addTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: transactions.length + 1,
    };
    setTransactions([transaction, ...transactions]);
  };

  if (activeTab === 'add') {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <ExpenseForm 
          onClose={() => setActiveTab('home')} 
          onSave={addTransaction}
        />
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    );
  }

  if (activeTab === 'expenses') {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-6 pb-20">
          <ExpensesSection transactions={transactions} />
        </div>
        <FloatingAddButton onClick={() => setActiveTab('add')} />
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    );
  }

  if (activeTab === 'profile') {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-6 pb-20">
          <MeSection />
        </div>
        <FloatingAddButton onClick={() => setActiveTab('add')} />
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    );
  }

  if (activeTab === 'friends') {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-6 pb-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">👥 Friends</h2>
            {(uncategorizedCount > 0 || pendingDuesCount > 0) && (
              <div className="relative">
                <Bell className="w-6 h-6 text-orange-400" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {uncategorizedCount + pendingDuesCount}
                </span>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            {friends.map((friend, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl">
                        {friend.avatar}
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{friend.name}</h3>
                        <p className="text-sm text-gray-400">Due: {friend.dueDate}</p>
                        {friend.fineAmount > 0 && (
                          <p className="text-xs text-red-400">Fine: ₹{friend.fineAmount}</p>
                        )}
                      </div>
                    </div>
                    <div className={`font-bold flex items-center ${
                      friend.owes > 0 ? 'text-green-400' : friend.owes < 0 ? 'text-red-400' : 'text-gray-400'
                    }`}>
                      {friend.owes > 0 && '+'}
                      <IndianRupee className="w-4 h-4" />
                      {Math.abs(friend.owes)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <FloatingAddButton onClick={() => setActiveTab('add')} />
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 rounded-b-3xl mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">Hey there! 👋</h1>
            <p className="text-emerald-100">Let's track your money</p>
          </div>
          <div className="flex items-center gap-3">
            {(uncategorizedCount > 0 || pendingDuesCount > 0) && (
              <div className="relative">
                <Bell className="w-6 h-6 text-white" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {uncategorizedCount + pendingDuesCount}
                </span>
              </div>
            )}
            <Button
              onClick={() => setActiveTab('add')}
              className="bg-white text-emerald-600 hover:bg-emerald-50 rounded-full w-12 h-12 p-0"
            >
              <Plus className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Monthly Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-4 h-4 text-red-400" />
                <span className="text-sm text-white/80">Spent</span>
              </div>
              <p className="text-2xl font-bold flex items-center">
                <IndianRupee className="w-5 h-5" />
                {monthlyStats.totalExpenses.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-sm text-white/80">Saved</span>
              </div>
              <p className="text-2xl font-bold flex items-center">
                <IndianRupee className="w-5 h-5" />
                {monthlyStats.savings.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        {/* Category Chart */}
        <div className="mb-6">
          <CategoryChart transactions={transactions} />
        </div>

        {/* Uncategorized Review */}
        {uncategorizedCount > 0 && (
          <div className="mb-6">
            <UncategorizedReview 
              transactions={transactions.filter(t => t.category === 'Uncategorized')}
            />
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Quick Split 🤝</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {friends.map((friend, index) => (
              <div key={index} className="flex flex-col items-center min-w-[80px]">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl mb-2">
                  {friend.avatar}
                </div>
                <span className="text-xs text-center">{friend.name}</span>
                <span className={`text-xs ${friend.owes > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {Math.abs(friend.owes) > 0 ? `₹${Math.abs(friend.owes)}` : 'Even'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Recent Activity 📱</h2>
            <Button variant="ghost" size="sm" className="text-emerald-400">
              See All
            </Button>
          </div>
          <div className="space-y-3">
            {transactions.slice(0, 5).map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </div>

        {/* Budget Progress */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>📊</span>
              Monthly Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">
                ₹{monthlyStats.totalExpenses.toLocaleString()} of ₹{monthlyStats.budget.toLocaleString()}
              </span>
              <span className="text-sm text-orange-400">
                {Math.round((monthlyStats.totalExpenses / monthlyStats.budget) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((monthlyStats.totalExpenses / monthlyStats.budget) * 100, 100)}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating Add Button */}
      <FloatingAddButton onClick={() => setActiveTab('add')} />

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Expense Form Modal */}
      {showExpenseForm && (
        <ExpenseForm 
          onClose={() => setShowExpenseForm(false)} 
          onSave={addTransaction}
        />
      )}
    </div>
  );
};

export default Index;


import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, TrendingUp, TrendingDown, Users, IndianRupee } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import TransactionCard from '@/components/TransactionCard';
import ExpenseForm from '@/components/ExpenseForm';

const Index = () => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  // Mock data for demonstration
  const monthlyStats = {
    totalExpenses: 12450,
    totalIncome: 15000,
    savings: 2550,
    budget: 10000
  };

  const recentTransactions = [
    {
      id: 1,
      description: 'Zomato Food Order',
      amount: 350,
      type: 'expense',
      category: 'Food',
      time: '2 hours ago',
      emoji: '🍕'
    },
    {
      id: 2,
      description: 'Split Uber Ride',
      amount: 150,
      type: 'expense',
      category: 'Transport',
      time: '5 hours ago',
      emoji: '🚗',
      splitWith: ['Rahul', 'Priya']
    },
    {
      id: 3,
      description: 'Pocket Money',
      amount: 5000,
      type: 'income',
      category: 'Family',
      time: '1 day ago',
      emoji: '💰'
    }
  ];

  const friends = [
    { name: 'Rahul', owes: 450, avatar: '👨‍🎓' },
    { name: 'Priya', owes: -200, avatar: '👩‍🎓' },
    { name: 'Arjun', owes: 300, avatar: '👨‍💻' }
  ];

  if (activeTab !== 'home') {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-6 pb-20">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">
              {activeTab === 'expenses' && '📊 Expenses'}
              {activeTab === 'friends' && '👥 Friends'}
              {activeTab === 'profile' && '👤 Profile'}
            </h2>
            <p className="text-gray-400">Coming soon in the next update!</p>
          </div>
        </div>
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
          <Button
            onClick={() => setShowExpenseForm(true)}
            className="bg-white text-emerald-600 hover:bg-emerald-50 rounded-full w-12 h-12 p-0"
          >
            <Plus className="w-6 h-6" />
          </Button>
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
            {recentTransactions.map((transaction) => (
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

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Expense Form Modal */}
      {showExpenseForm && (
        <ExpenseForm onClose={() => setShowExpenseForm(false)} />
      )}
    </div>
  );
};

export default Index;

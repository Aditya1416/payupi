
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, IndianRupee } from 'lucide-react';

interface ExpenseFormProps {
  onClose: () => void;
}

const ExpenseForm = ({ onClose }: ExpenseFormProps) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    { id: 'food', label: 'Food', emoji: '🍕' },
    { id: 'transport', label: 'Transport', emoji: '🚗' },
    { id: 'shopping', label: 'Shopping', emoji: '🛍️' },
    { id: 'entertainment', label: 'Fun', emoji: '🎮' },
    { id: 'bills', label: 'Bills', emoji: '📱' },
    { id: 'other', label: 'Other', emoji: '💰' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the transaction
    console.log('New transaction:', { amount, description, category: selectedCategory });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
      <div className="w-full bg-gray-900 rounded-t-3xl p-6 animate-slide-in-right">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Add Expense 💸</h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount Input */}
          <div>
            <Label htmlFor="amount" className="text-white mb-2 block">
              How much? 💰
            </Label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="amount"
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-600 text-white text-2xl font-bold h-14"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-white mb-2 block">
              What for? 📝
            </Label>
            <Input
              id="description"
              type="text"
              placeholder="e.g., Lunch at canteen"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white"
              required
            />
          </div>

          {/* Category Selection */}
          <div>
            <Label className="text-white mb-3 block">Category 📂</Label>
            <div className="grid grid-cols-3 gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                      : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500'
                  }`}
                >
                  <div className="text-2xl mb-1">{category.emoji}</div>
                  <div className="text-sm">{category.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 text-lg"
            disabled={!amount || !description || !selectedCategory}
          >
            Add Expense ✨
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;

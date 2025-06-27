
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IndianRupee, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'expense' | 'income' | 'due' | 'split';
  category: string;
  time: string;
  emoji: string;
}

interface UncategorizedReviewProps {
  transactions: Transaction[];
}

const UncategorizedReview = ({ transactions }: UncategorizedReviewProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    { id: 'food', label: 'Food', emoji: '🌯' },
    { id: 'transport', label: 'Transport', emoji: '🚗' },
    { id: 'rent', label: 'Rent', emoji: '🏠' },
    { id: 'education', label: 'Education', emoji: '🎓' },
    { id: 'entertainment', label: 'Fun', emoji: '🎮' },
    { id: 'bills', label: 'Bills', emoji: '📱' },
    { id: 'shopping', label: 'Shopping', emoji: '🛍️' },
    { id: 'health', label: 'Health', emoji: '💊' },
    { id: 'other', label: 'Other', emoji: '💰' },
  ];

  if (transactions.length === 0) return null;

  const currentTransaction = transactions[currentIndex];

  const handleCategorize = (categoryId: string) => {
    // In a real app, this would update the transaction in the database
    console.log(`Categorizing transaction ${currentTransaction.id} as ${categoryId}`);
    
    // Move to next transaction
    if (currentIndex < transactions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSkip = () => {
    if (currentIndex < transactions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <Card className="bg-gradient-to-r from-orange-900/20 to-yellow-900/20 border-orange-500/30">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <span>🔍</span>
            Review Uncategorized
          </div>
          <Badge variant="secondary" className="bg-orange-500/20 text-orange-300">
            {currentIndex + 1} of {transactions.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-lg">
                ❓
              </div>
              <div>
                <h3 className="font-medium text-white">{currentTransaction.description}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center text-orange-400 font-bold">
                    -<IndianRupee className="w-4 h-4" />
                    {currentTransaction.amount.toLocaleString()}
                  </div>
                  <span className="text-xs text-gray-400">{currentTransaction.time}</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-300 mb-4">
            Swipe to categorize this transaction quickly! 👆
          </p>

          {/* Category Quick Select */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {categories.slice(0, 6).map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorize(category.id)}
                className="p-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-300 hover:border-orange-500 hover:bg-orange-500/20 hover:text-orange-300 transition-all duration-200"
              >
                <div className="text-lg mb-1">{category.emoji}</div>
                <div className="text-xs">{category.label}</div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="text-gray-400 hover:text-white"
            >
              Skip for now
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentIndex(Math.min(currentIndex + 1, transactions.length - 1))}
              disabled={currentIndex === transactions.length - 1}
              className="flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UncategorizedReview;

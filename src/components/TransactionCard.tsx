
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IndianRupee } from 'lucide-react';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'expense' | 'income';
  category: string;
  time: string;
  emoji: string;
  splitWith?: string[];
}

interface TransactionCardProps {
  transaction: Transaction;
}

const TransactionCard = ({ transaction }: TransactionCardProps) => {
  const isExpense = transaction.type === 'expense';
  
  return (
    <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors duration-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-lg">
              {transaction.emoji}
            </div>
            <div>
              <h3 className="font-medium text-white">{transaction.description}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {transaction.category}
                </Badge>
                <span className="text-xs text-gray-400">{transaction.time}</span>
              </div>
              {transaction.splitWith && (
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-blue-400">Split with:</span>
                  <span className="text-xs text-gray-300">
                    {transaction.splitWith.join(', ')}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="text-right">
            <div className={`flex items-center font-bold ${
              isExpense ? 'text-red-400' : 'text-green-400'
            }`}>
              {isExpense && '-'}
              <IndianRupee className="w-4 h-4" />
              {transaction.amount.toLocaleString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionCard;

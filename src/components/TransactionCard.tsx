
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IndianRupee, Clock, Users as UsersIcon } from 'lucide-react';

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

interface TransactionCardProps {
  transaction: Transaction;
}

const TransactionCard = ({ transaction }: TransactionCardProps) => {
  const isExpense = transaction.type === 'expense';
  const isIncome = transaction.type === 'income';
  const isDue = transaction.type === 'due';
  const isSplit = transaction.type === 'split';
  
  const getTypeColor = () => {
    if (isIncome) return 'text-green-400';
    if (isDue) return 'text-orange-400';
    if (isSplit) return 'text-blue-400';
    return 'text-red-400';
  };

  const getTypePrefix = () => {
    if (isIncome) return '+';
    if (isDue) return 'DUE ';
    if (isSplit) return 'SPLIT ';
    return '-';
  };
  
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
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  {transaction.time}
                </div>
              </div>
              
              {transaction.merchant && (
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-purple-400">via {transaction.merchant}</span>
                </div>
              )}
              
              {transaction.splitWith && (
                <div className="flex items-center gap-1 mt-1">
                  <UsersIcon className="w-3 h-3 text-blue-400" />
                  <span className="text-xs text-blue-400">Split with:</span>
                  <span className="text-xs text-gray-300">
                    {transaction.splitWith.join(', ')}
                  </span>
                </div>
              )}
              
              {transaction.dueDate && (
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-orange-400">Due: {transaction.dueDate}</span>
                </div>
              )}
              
              {transaction.isRecurring && (
                <Badge variant="outline" className="text-xs mt-1 border-green-500 text-green-400">
                  Recurring
                </Badge>
              )}
            </div>
          </div>
          
          <div className="text-right">
            <div className={`flex items-center font-bold ${getTypeColor()}`}>
              {getTypePrefix()}
              <IndianRupee className="w-4 h-4" />
              {transaction.amount.toLocaleString()}
            </div>
            {transaction.finePerDay && (
              <div className="text-xs text-red-400 mt-1">
                Fine: ₹{transaction.finePerDay}/day
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionCard;

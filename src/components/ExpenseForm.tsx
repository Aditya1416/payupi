
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { X, IndianRupee, CalendarIcon, Users } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface Transaction {
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

interface ExpenseFormProps {
  onClose: () => void;
  onSave: (transaction: Transaction) => void;
}

const ExpenseForm = ({ onClose, onSave }: ExpenseFormProps) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState<'expense' | 'income' | 'due' | 'split'>('expense');
  const [upiId, setUpiId] = useState('');
  const [merchant, setMerchant] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [isRecurring, setIsRecurring] = useState(false);
  const [remindToCategorizeSimilar, setRemindToCategorizeSimilar] = useState(false);
  const [splitWith, setSplitWith] = useState('');
  const [finePerDay, setFinePerDay] = useState('');

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

  const transactionTypes = [
    { id: 'expense', label: 'Expense', emoji: '💸', color: 'border-red-500 bg-red-500/20 text-red-400' },
    { id: 'income', label: 'Income', emoji: '💰', color: 'border-green-500 bg-green-500/20 text-green-400' },
    { id: 'due', label: 'Due', emoji: '⏰', color: 'border-orange-500 bg-orange-500/20 text-orange-400' },
    { id: 'split', label: 'Split', emoji: '🤝', color: 'border-blue-500 bg-blue-500/20 text-blue-400' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);
    
    const transaction: Transaction = {
      amount: parseFloat(amount),
      description,
      category: selectedCategoryData?.label || 'Other',
      type: selectedType,
      time: 'Just now',
      emoji: selectedCategoryData?.emoji || '💰',
      splitWith: splitWith ? splitWith.split(',').map(s => s.trim()) : undefined,
      upiId: upiId || undefined,
      merchant: merchant || undefined,
      isRecurring,
      dueDate: selectedType === 'due' ? format(date, 'yyyy-MM-dd') : undefined,
      finePerDay: selectedType === 'due' && finePerDay ? parseFloat(finePerDay) : undefined,
    };
    
    onSave(transaction);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
      <div className="w-full bg-gray-900 rounded-t-3xl p-6 animate-slide-in-right max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Add Transaction ✨</h2>
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
              Amount 💰
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

          {/* Transaction Type */}
          <div>
            <Label className="text-white mb-3 block">Type 📝</Label>
            <div className="grid grid-cols-2 gap-2">
              {transactionTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedType(type.id as any)}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                    selectedType === type.id
                      ? type.color
                      : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500'
                  }`}
                >
                  <div className="text-xl mb-1">{type.emoji}</div>
                  <div className="text-sm">{type.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-white mb-2 block">
              Description 📝
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
                  <div className="text-xl mb-1">{category.emoji}</div>
                  <div className="text-sm">{category.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* UPI ID / Merchant */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="upiId" className="text-white mb-2 block">
                UPI ID 📱
              </Label>
              <Input
                id="upiId"
                type="text"
                placeholder="zomato@paytm"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="merchant" className="text-white mb-2 block">
                Merchant 🏪
              </Label>
              <Input
                id="merchant"
                type="text"
                placeholder="Zomato"
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
          </div>

          {/* Split With (if type is split) */}
          {selectedType === 'split' && (
            <div>
              <Label htmlFor="splitWith" className="text-white mb-2 block flex items-center gap-2">
                <Users className="w-4 h-4" />
                Split With
              </Label>
              <Input
                id="splitWith"
                type="text"
                placeholder="Rahul, Priya, Arjun"
                value={splitWith}
                onChange={(e) => setSplitWith(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
          )}

          {/* Due Date and Fine (if type is due) */}
          {selectedType === 'due' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white mb-2 block">Due Date 📅</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-gray-800 border-gray-600 text-white hover:bg-gray-700",
                        !date && "text-gray-400"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-600">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && setDate(date)}
                      initialFocus
                      className="bg-gray-800 text-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="finePerDay" className="text-white mb-2 block">
                  Fine/Day ⚠️
                </Label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="finePerDay"
                    type="number"
                    placeholder="10"
                    value={finePerDay}
                    onChange={(e) => setFinePerDay(e.target.value)}
                    className="pl-8 bg-gray-800 border-gray-600 text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <Label htmlFor="notes" className="text-white mb-2 block">
              Notes 📄 (Optional)
            </Label>
            <Textarea
              id="notes"
              placeholder="Additional details..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white"
              rows={3}
            />
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <label className="flex items-center space-x-3 text-white">
              <input
                type="checkbox"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
                className="w-4 h-4 text-emerald-600 bg-gray-800 border-gray-600 rounded focus:ring-emerald-500"
              />
              <span className="text-sm">Mark as recurring 🔄</span>
            </label>
            
            <label className="flex items-center space-x-3 text-white">
              <input
                type="checkbox"
                checked={remindToCategorizeSimilar}
                onChange={(e) => setRemindToCategorizeSimilar(e.target.checked)}
                className="w-4 h-4 text-emerald-600 bg-gray-800 border-gray-600 rounded focus:ring-emerald-500"
              />
              <span className="text-sm">Remind me to categorize similar 🔔</span>
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 text-lg"
            disabled={!amount || !description || !selectedCategory}
          >
            Save Transaction ✨
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;

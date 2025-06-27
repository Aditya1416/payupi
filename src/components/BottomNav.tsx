
import { Home, TrendingDown, Users, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNav = ({ activeTab, setActiveTab }: BottomNavProps) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home', emoji: '🏠' },
    { id: 'expenses', icon: TrendingDown, label: 'Expenses', emoji: '💸' },
    { id: 'friends', icon: Users, label: 'Friends', emoji: '👥' },
    { id: 'profile', icon: User, label: 'Me', emoji: '👤' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-emerald-600 text-white transform scale-105' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="text-lg mb-1">
                {isActive ? item.emoji : <Icon className="w-5 h-5" />}
              </div>
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;

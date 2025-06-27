import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  CreditCard, 
  Download,
  LogOut,
  Edit,
  IndianRupee,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

const MeSection = () => {
  // Mock user data - in real app this would come from auth/database
  const user = {
    name: 'Arjun Sharma',
    email: 'arjun.sharma@college.edu',
    avatar: '👨‍🎓',
    joinedDate: 'September 2024',
    totalSaved: 2550,
    totalSpent: 12450,
    friendsCount: 8
  };

  const quickStats = [
    {
      label: 'This Month Saved',
      value: user.totalSaved,
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10'
    },
    {
      label: 'This Month Spent',
      value: user.totalSpent,
      icon: TrendingDown,
      color: 'text-red-400',
      bgColor: 'bg-red-400/10'
    },
    {
      label: 'Active Friends',
      value: user.friendsCount,
      icon: User,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    }
  ];

  const settingsOptions = [
    { icon: Bell, label: 'Notifications', description: 'Manage your alerts' },
    { icon: CreditCard, label: 'Payment Methods', description: 'UPI IDs and cards' },
    { icon: Shield, label: 'Privacy & Security', description: 'Account protection' },
    { icon: Download, label: 'Export Data', description: 'Download your transactions' },
    { icon: Settings, label: 'App Settings', description: 'Theme, language, etc.' }
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-emerald-600 to-teal-600 border-none text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl backdrop-blur-sm">
              {user.avatar}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-emerald-100">{user.email}</p>
              <p className="text-emerald-200 text-sm">Member since {user.joinedDate}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <Edit className="w-5 h-5" />
            </Button>
          </div>
          
          <Badge className="bg-white/20 text-white border-white/30">
            🎓 Student Account
          </Badge>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{stat.label}</p>
                      <p className={`text-lg font-bold ${stat.color} flex items-center`}>
                        {typeof stat.value === 'number' && (stat.label.includes('Saved') || stat.label.includes('Spent')) ? (
                          <>
                            <IndianRupee className="w-4 h-4" />
                            {stat.value.toLocaleString()}
                          </>
                        ) : (
                          stat.value
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Settings Options */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            {settingsOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 p-4 hover:bg-gray-700 transition-colors text-left"
                >
                  <Icon className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="font-medium text-white">{option.label}</p>
                    <p className="text-sm text-gray-400">{option.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Logout Button */}
      <Button
        variant="outline"
        className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </Button>
    </div>
  );
};

export default MeSection;

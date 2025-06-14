
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Calendar, Users, Zap } from 'lucide-react';

interface StatItem {
  label: string;
  value: string;
  icon: React.ElementType;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface StatsOverviewProps {
  stats: StatItem[];
  isDarkMode: boolean;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats, isDarkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
    >
      {stats.map((stat, index) => (
        <Card key={stat.label} className={`backdrop-blur-2xl border shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group ${
          isDarkMode 
            ? 'bg-gray-800/40 border-gray-700/30' 
            : 'bg-white/40 border-white/30'
        }`}>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-gradient-to-r ${
                index === 0 ? 'from-emerald-500 to-teal-600' :
                index === 1 ? 'from-blue-500 to-purple-600' :
                index === 2 ? 'from-purple-500 to-pink-600' :
                'from-yellow-500 to-orange-600'
              } flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300`}>
                <stat.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <TrendingUp className={`w-3 h-3 lg:w-4 lg:h-4 ${stat.color}`} />
            </div>
            <div className={`text-lg lg:text-2xl font-bold mb-1 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-800'
            }`}>
              {stat.value}
            </div>
            <div className={`text-xs lg:text-sm mb-1 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {stat.label}
            </div>
            <div className={`text-xs ${stat.color}`}>
              {stat.change}
            </div>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  );
};

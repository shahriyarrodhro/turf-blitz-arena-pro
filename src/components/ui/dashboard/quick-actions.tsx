
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

interface QuickAction {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  action: () => void;
}

interface QuickActionsProps {
  quickActions: QuickAction[];
  isDarkMode: boolean;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ quickActions, isDarkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className={`backdrop-blur-2xl border shadow-xl transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gray-800/30 border-gray-700/30' 
          : 'bg-white/30 border-white/30'
      }`}>
        <CardHeader>
          <CardTitle className={`flex items-center transition-colors duration-300 ${
            isDarkMode ? 'text-gray-100' : 'text-gray-800'
          }`}>
            <Zap className="w-5 h-5 mr-2 text-emerald-600" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={action.title}
                onClick={action.action}
                variant="ghost"
                className={`h-auto p-4 flex flex-col items-center space-y-2 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'hover:bg-gray-700/30 text-gray-200' 
                    : 'hover:bg-gray-50/50 text-gray-700'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${action.color} flex items-center justify-center shadow-lg`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-sm">{action.title}</div>
                  <div className={`text-xs transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {action.description}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

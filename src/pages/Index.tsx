import { useState } from 'react';
import { SleepTimerCard } from '@/components/sleep/SleepTimerCard';
import { SleepStatsCard } from '@/components/sleep/SleepStatsCard';
import { SleepHistoryCard } from '@/components/sleep/SleepHistoryCard';
import { SleepGoalCard } from '@/components/sleep/SleepGoalCard';
import { useSleepData } from '@/hooks/useSleepData';
import { Moon, Stars } from 'lucide-react';
import { Toaster } from 'sonner';

const Index = () => {
  const {
    sleepData,
    addSleepRecord,
    updateSleepGoal,
    setIsSleeping,
    getWeeklyData,
    getWeeklyAverage,
    getTodaySleep
  } = useSleepData();

  const [sleepStartTime, setSleepStartTime] = useState<Date | null>(null);

  const handleSleepStart = (time: Date) => {
    setSleepStartTime(time);
    setIsSleeping(true);
  };

  const handleSleepEnd = (time: Date) => {
    if (sleepStartTime) {
      addSleepRecord(sleepStartTime, time);
    }
    setSleepStartTime(null);
    setIsSleeping(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sleep-50 via-white to-dream-50">
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20">
          <Stars className="h-6 w-6 text-sleep-200 animate-pulse-soft" />
        </div>
        <div className="absolute top-40 right-32">
          <Moon className="h-8 w-8 text-dream-200 animate-float" />
        </div>
        <div className="absolute bottom-32 left-1/4">
          <Stars className="h-4 w-4 text-sleep-300 animate-pulse-soft" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute bottom-48 right-20">
          <Stars className="h-5 w-5 text-dream-300 animate-pulse-soft" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      <div className="container mx-auto p-6 relative z-10">
        {/* 头部 */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-sleep-500 to-dream-500 rounded-full">
              <Moon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-sleep-600 to-dream-600 bg-clip-text text-transparent">
              睡眠管理中心
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            记录您的睡眠，改善您的生活品质
          </p>
        </div>

        {/* 主要内容网格 */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {/* 睡眠计时器 */}
          <div className="lg:col-span-2">
            <SleepTimerCard
              onSleepStart={handleSleepStart}
              onSleepEnd={handleSleepEnd}
              isSleeping={sleepData.isSleeping}
            />
          </div>

          {/* 睡眠目标 */}
          <SleepGoalCard
            currentGoal={sleepData.sleepGoal}
            onGoalUpdate={updateSleepGoal}
          />

          {/* 睡眠统计 */}
          <SleepStatsCard
            weeklyAverage={getWeeklyAverage()}
            sleepGoal={sleepData.sleepGoal}
            todaySleep={getTodaySleep()}
            weeklyData={getWeeklyData()}
          />
        </div>

        {/* 睡眠历史记录 */}
        <div className="grid gap-6">
          <SleepHistoryCard records={sleepData.records} />
        </div>
      </div>

      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            color: 'hsl(var(--card-foreground))',
          },
        }}
      />
    </div>
  );
};

export default Index;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart3, Target, TrendingUp, Clock } from 'lucide-react';

interface SleepStatsProps {
  weeklyAverage: number;
  sleepGoal: number;
  todaySleep: number;
  weeklyData: number[];
}

export function SleepStatsCard({ weeklyAverage, sleepGoal, todaySleep, weeklyData }: SleepStatsProps) {
  const goalProgress = (weeklyAverage / sleepGoal) * 100;
  const todayProgress = (todaySleep / sleepGoal) * 100;

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 dream-gradient opacity-10" />
      
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-dream-600" />
          睡眠统计
        </CardTitle>
      </CardHeader>

      <CardContent className="relative z-10 space-y-6">
        {/* 今日睡眠 */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              今日睡眠
            </span>
            <span className="font-medium">
              {todaySleep.toFixed(1)} / {sleepGoal} 小时
            </span>
          </div>
          <Progress 
            value={todayProgress} 
            className="h-2"
          />
        </div>

        {/* 本周平均 */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              本周平均
            </span>
            <span className="font-medium">
              {weeklyAverage.toFixed(1)} 小时
            </span>
          </div>
          <Progress 
            value={goalProgress} 
            className="h-2"
          />
        </div>

        {/* 睡眠目标 */}
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-dream-600" />
            <span className="text-sm font-medium">睡眠目标</span>
          </div>
          <span className="text-lg font-bold text-dream-600">
            {sleepGoal} 小时
          </span>
        </div>

        {/* 本周数据简览 */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">本周数据</h4>
          <div className="flex justify-between items-end h-12 gap-1">
            {weeklyData.map((hours, index) => (
              <div 
                key={index}
                className="flex-1 bg-dream-200 rounded-t"
                style={{ 
                  height: `${Math.max((hours / 10) * 100, 10)}%`,
                  backgroundColor: hours >= sleepGoal ? '#a855f7' : '#d8b4fe'
                }}
                title={`${['周一', '周二', '周三', '周四', '周五', '周六', '周日'][index]}: ${hours.toFixed(1)}小时`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            {['一', '二', '三', '四', '五', '六', '日'].map((day, index) => (
              <span key={index}>{day}</span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
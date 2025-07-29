import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Clock, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SleepTimerProps {
  onSleepStart: (time: Date) => void;
  onSleepEnd: (time: Date) => void;
  isSleeping: boolean;
}

export function SleepTimerCard({ onSleepStart, onSleepEnd, isSleeping }: SleepTimerProps) {
  const [sleepStartTime, setSleepStartTime] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (start: Date, end: Date) => {
    const diff = Math.floor((end.getTime() - start.getTime()) / 1000 / 60);
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return `${hours}小时 ${minutes}分钟`;
  };

  const handleToggleSleep = () => {
    if (isSleeping) {
      onSleepEnd(new Date());
      setSleepStartTime(null);
    } else {
      const now = new Date();
      setSleepStartTime(now);
      onSleepStart(now);
    }
  };

  return (
    <Card className="relative overflow-hidden">
      <div className={cn(
        "absolute inset-0 transition-all duration-1000",
        isSleeping 
          ? "night-gradient opacity-90" 
          : "sleep-gradient opacity-20"
      )} />
      
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-2 text-center justify-center">
          {isSleeping ? (
            <Moon className="h-6 w-6 text-blue-300 animate-pulse-soft" />
          ) : (
            <Sun className="h-6 w-6 text-yellow-500 animate-float" />
          )}
          <span className={cn(
            "text-lg font-medium",
            isSleeping ? "text-blue-100" : "text-foreground"
          )}>
            {isSleeping ? "正在睡眠中" : "准备睡觉"}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="relative z-10 space-y-6">
        <div className="text-center">
          <div className={cn(
            "text-3xl font-mono font-bold",
            isSleeping ? "text-white" : "text-foreground"
          )}>
            {currentTime.toLocaleTimeString('zh-CN', { 
              hour12: false,
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </div>
          <div className={cn(
            "text-sm mt-1",
            isSleeping ? "text-blue-200" : "text-muted-foreground"
          )}>
            {currentTime.toLocaleDateString('zh-CN', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>

        {isSleeping && sleepStartTime && (
          <div className="text-center p-4 bg-black/20 rounded-lg border border-white/10">
            <Clock className="h-5 w-5 mx-auto mb-2 text-blue-300" />
            <div className="text-white font-medium">
              已睡眠: {formatDuration(sleepStartTime, currentTime)}
            </div>
            <div className="text-blue-200 text-sm mt-1">
              开始时间: {sleepStartTime.toLocaleTimeString('zh-CN', { hour12: false })}
            </div>
          </div>
        )}

        <Button
          onClick={handleToggleSleep}
          size="lg"
          className={cn(
            "w-full h-14 text-lg font-medium transition-all duration-300",
            isSleeping
              ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25"
              : "bg-sleep-600 hover:bg-sleep-700 text-white shadow-lg shadow-sleep-500/25"
          )}
        >
          {isSleeping ? (
            <>
              <Sun className="mr-2 h-5 w-5" />
              结束睡眠
            </>
          ) : (
            <>
              <Moon className="mr-2 h-5 w-5" />
              开始睡眠
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
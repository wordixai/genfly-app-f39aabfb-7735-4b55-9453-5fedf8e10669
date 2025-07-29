import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { History, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SleepRecord {
  id: string;
  date: string;
  sleepTime: string;
  wakeTime: string;
  duration: number;
  quality: 'good' | 'normal' | 'poor';
}

interface SleepHistoryProps {
  records: SleepRecord[];
}

export function SleepHistoryCard({ records }: SleepHistoryProps) {
  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'good': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'normal': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'poor': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getQualityText = (quality: string) => {
    switch (quality) {
      case 'good': return '优质';
      case 'normal': return '一般';
      case 'poor': return '较差';
      default: return '未知';
    }
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5 text-sleep-600" />
          睡眠记录
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-3">
            {records.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Moon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>暂无睡眠记录</p>
                <p className="text-sm">开始记录您的睡眠吧！</p>
              </div>
            ) : (
              records.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center text-sm text-muted-foreground">
                      <span>{new Date(record.date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}</span>
                      <span>{new Date(record.date).toLocaleDateString('zh-CN', { weekday: 'short' })}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Moon className="h-4 w-4 text-sleep-600" />
                      <span>{record.sleepTime}</span>
                      <span className="text-muted-foreground">→</span>
                      <Sun className="h-4 w-4 text-orange-500" />
                      <span>{record.wakeTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-medium">
                        {record.duration.toFixed(1)} 小时
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={cn("text-xs", getQualityColor(record.quality))}
                      >
                        {getQualityText(record.quality)}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
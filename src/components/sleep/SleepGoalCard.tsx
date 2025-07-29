import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, Target, Save } from 'lucide-react';
import { toast } from 'sonner';

interface SleepGoalProps {
  currentGoal: number;
  onGoalUpdate: (newGoal: number) => void;
}

export function SleepGoalCard({ currentGoal, onGoalUpdate }: SleepGoalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newGoal, setNewGoal] = useState(currentGoal.toString());

  const handleSave = () => {
    const goal = parseFloat(newGoal);
    if (goal >= 4 && goal <= 12) {
      onGoalUpdate(goal);
      setIsEditing(false);
      toast.success('睡眠目标已更新');
    } else {
      toast.error('睡眠目标应在 4-12 小时之间');
    }
  };

  const handleCancel = () => {
    setNewGoal(currentGoal.toString());
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-dream-600" />
          睡眠目标
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {!isEditing ? (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-dream-600 mb-1">
                {currentGoal}
              </div>
              <div className="text-sm text-muted-foreground">
                小时 / 日
              </div>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• 充足的睡眠有助于身心健康</p>
              <p>• 建议成人每日睡眠 7-9 小时</p>
              <p>• 保持规律的作息时间</p>
            </div>

            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              className="w-full"
            >
              <Settings className="mr-2 h-4 w-4" />
              调整目标
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sleep-goal">每日睡眠目标 (小时)</Label>
              <Input
                id="sleep-goal"
                type="number"
                min="4"
                max="12"
                step="0.5"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="请输入睡眠目标"
              />
              <p className="text-xs text-muted-foreground">
                推荐: 7-9 小时
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                className="flex-1"
              >
                <Save className="mr-2 h-4 w-4" />
                保存
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="flex-1"
              >
                取消
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
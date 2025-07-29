import { useState, useEffect } from 'react';

interface SleepRecord {
  id: string;
  date: string;
  sleepTime: string;
  wakeTime: string;
  duration: number;
  quality: 'good' | 'normal' | 'poor';
}

interface SleepData {
  records: SleepRecord[];
  sleepGoal: number;
  isSleeping: boolean;
}

export function useSleepData() {
  const [sleepData, setSleepData] = useState<SleepData>(() => {
    const saved = localStorage.getItem('sleepData');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      records: [
        {
          id: '1',
          date: '2024-01-15',
          sleepTime: '23:30',
          wakeTime: '07:15',
          duration: 7.75,
          quality: 'good'
        },
        {
          id: '2',
          date: '2024-01-14',
          sleepTime: '00:15',
          wakeTime: '06:45',
          duration: 6.5,
          quality: 'normal'
        },
        {
          id: '3',
          date: '2024-01-13',
          sleepTime: '23:45',
          wakeTime: '08:00',
          duration: 8.25,
          quality: 'good'
        },
        {
          id: '4',
          date: '2024-01-12',
          sleepTime: '01:00',
          wakeTime: '06:30',
          duration: 5.5,
          quality: 'poor'
        },
        {
          id: '5',
          date: '2024-01-11',
          sleepTime: '22:30',
          wakeTime: '07:30',
          duration: 9,
          quality: 'good'
        }
      ],
      sleepGoal: 8,
      isSleeping: false
    };
  });

  useEffect(() => {
    localStorage.setItem('sleepData', JSON.stringify(sleepData));
  }, [sleepData]);

  const addSleepRecord = (sleepStart: Date, sleepEnd: Date) => {
    const duration = (sleepEnd.getTime() - sleepStart.getTime()) / (1000 * 60 * 60);
    
    let quality: 'good' | 'normal' | 'poor' = 'normal';
    if (duration >= sleepData.sleepGoal * 0.9) {
      quality = 'good';
    } else if (duration < sleepData.sleepGoal * 0.7) {
      quality = 'poor';
    }

    const newRecord: SleepRecord = {
      id: Date.now().toString(),
      date: sleepStart.toISOString().split('T')[0],
      sleepTime: sleepStart.toLocaleTimeString('zh-CN', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      wakeTime: sleepEnd.toLocaleTimeString('zh-CN', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      duration,
      quality
    };

    setSleepData(prev => ({
      ...prev,
      records: [newRecord, ...prev.records.slice(0, 29)] // 保留最近30条记录
    }));
  };

  const updateSleepGoal = (newGoal: number) => {
    setSleepData(prev => ({
      ...prev,
      sleepGoal: newGoal
    }));
  };

  const setIsSleeping = (isSleeping: boolean) => {
    setSleepData(prev => ({
      ...prev,
      isSleeping
    }));
  };

  const getWeeklyData = () => {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const weeklyRecords = sleepData.records.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate >= weekAgo && recordDate <= today;
    });

    // 创建7天的数组，填入对应的睡眠时长
    const weeklyData = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today.getTime() - (6 - index) * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];
      const record = weeklyRecords.find(r => r.date === dateStr);
      return record ? record.duration : 0;
    });

    return weeklyData;
  };

  const getWeeklyAverage = () => {
    const weeklyData = getWeeklyData();
    const validData = weeklyData.filter(hours => hours > 0);
    return validData.length > 0 ? validData.reduce((sum, hours) => sum + hours, 0) / validData.length : 0;
  };

  const getTodaySleep = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayRecord = sleepData.records.find(record => record.date === today);
    return todayRecord ? todayRecord.duration : 0;
  };

  return {
    sleepData,
    addSleepRecord,
    updateSleepGoal,
    setIsSleeping,
    getWeeklyData,
    getWeeklyAverage,
    getTodaySleep
  };
}
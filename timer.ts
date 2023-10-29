/**
 * {
    totalWeek: 20, // 总周数：[1, 30]之间的整数
    startSemester: '', // 开学时间：时间戳，13位长度字符串，推荐用代码生成
    startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
    showWeekend: false, // 是否显示周末
    forenoon: 1, // 上午课程节数：[1, 10]之间的整数
    afternoon: 0, // 下午课程节数：[0, 10]之间的整数
    night: 0, // 晚间课程节数：[0, 10]之间的整数
    sections: [{
      section: 1, // 节次：[1, 30]之间的整数
      startTime: '08:00', // 开始时间：参照这个标准格式5位长度字符串
      endTime: '08:50', // 结束时间：同上
    }], // 课程时间表，注意：总长度要和上边配置的节数加和对齐
  }
 */

interface Timer {
  totalWeek: number;
  startSemester: string;
  startWithSunday: boolean;
  showWeekend: boolean;
  forenoon: number;
  afternoon: number;
  night: number;
  sections: Section[];
}
interface Section {
  section: number;
  startTime: string;
  endTime: string;
}

// @ts-expect-error
function scheduleTimer({ providerRes, parserRes } = {}) {
  const mapper = {
    begin: [
      "8:00",
      "8:55",
      "10:10",
      "11:05",
      "13:45",
      "14:40",
      "15:55",
      "16:50",
      "18:45",
      "19:40",
      "20:35",
    ],
    end: [
      "8:45",
      "9:40",
      "10:55",
      "11:50",
      "14:30",
      "15:25",
      "16:40",
      "17:35",
      "19:30",
      "20:25",
      "21:20",
    ],
  };
  const data: Timer = {
    totalWeek: 20,
    startSemester: "",
    startWithSunday: false,
    showWeekend: true,
    forenoon: 4,
    afternoon: 4,
    night: 3,
    sections: [
      {
        section: 1,
        startTime: "08:00",
        endTime: "08:45",
      },
      {
        section: 2,
        startTime: "08:55",
        endTime: "09:40",
      },
      {
        section: 3,
        startTime: "10:10",
        endTime: "10:55",
      },
      {
        section: 4,
        startTime: "11:05",
        endTime: "11:50",
      },
      {
        section: 5,
        startTime: "13:45",
        endTime: "14:30",
      },
      {
        section: 6,
        startTime: "14:40",
        endTime: "15:25",
      },
      {
        section: 7,
        startTime: "15:55",
        endTime: "16:40",
      },
      {
        section: 8,
        startTime: "16:50",
        endTime: "17:35",
      },
      {
        section: 9,
        startTime: "18:45",
        endTime: "19:30",
      },
      {
        section: 10,
        startTime: "19:40",
        endTime: "20:25",
      },
      {
        section: 11,
        startTime: "20:35",
        endTime: "21:20",
      },
    ],
  };
  return data;
}

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

const data: Timer = {
  totalWeek: 20,
  startSemester: "",
  startWithSunday: false,
  showWeekend: true,
  forenoon: 4,
  afternoon: 4,
  night: 4,
};
function timer() {}

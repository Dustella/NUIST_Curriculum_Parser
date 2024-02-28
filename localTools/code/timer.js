/**
 * 时间配置函数，此为入口函数，不要改动函数名
 */
async function scheduleTimer({ providerRes }) {
  const { date } = JSON.parse(providerRes);

  return {
    totalWeek: 20,
    startSemester: `${new Date(date).getTime()}`,
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
}

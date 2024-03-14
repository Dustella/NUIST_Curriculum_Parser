async function scheduleHtmlProvider(
  iframeContent = "",
  frameContent = "",
  dom = document
) {
  const promt = async () => {
    await AIScheduleAlert({
      titleText: "提示", // 标题内容，字体比较大，不传默认为提示
      contentText:
        "由于学校教务系统更新频繁，如遇无法导入，请耐心等待更新并联系Dustella", // 提示信息，字体稍小，支持使用``达到换行效果，具体使用效果建议真机测试
      confirmText: "确认", // 确认按钮文字，可不传默认为确认
    });
  };

  const querySchedule = async (term) => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("XNXQDM", term);
    const resp = await fetch(
      "http://jwxt.nuist.edu.cn/jwapp/sys/wdkb/modules/xskcb/cxxszhxqkb.do",
      {
        method: "POST",
        body: urlencoded,
        redirect: "follow",
      }
    ).then((response) => response.json());
    const final_data = resp.datas.cxxszhxqkb.rows;
    return final_data;
  };

  const queryTerm = async () => {
    const resp = await fetch(
      "http://jwxt.nuist.edu.cn/jwapp/sys/wdkb/modules/jshkcb/dqxnxq.do",
      {
        method: "POST",
        redirect: "follow",
      }
    ).then((response) => response.json());
    return resp.datas.dqxnxq.rows[0].DM;
  };

  const queryDate = async (term) => {
    const urlencoded = new URLSearchParams();
    // parse XN and XQ from term, from 2023-2024-1 to XN=2023&XQ=1
    const [XN1, XN2, XQ] = term.split("-");
    urlencoded.append("XN", `${XN1}-${XN2}`);
    urlencoded.append("XQ", XQ);

    const resp = await fetch(
      "http://jwxt.nuist.edu.cn/jwapp/sys/wdkb/modules/xskcb/cxxljc.do",
      {
        method: "POST",
        body: urlencoded,
        redirect: "follow",
      }
    ).then((response) => response.json());

    return resp.datas.cxxljc.rows[0].XQKSRQ;
  };

  const cleanData = (data) =>
    data.map((item) => {
      const arrayGenerator = (start, end, oven) => {
        const result = [];
        for (let i = start; i <= end; i += 1) {
          // 0 is none, 1 is odd, 2 is even
          if (oven === 0) {
            result.push(i);
          } else if (oven === 1 && i % 2 === 1) {
            result.push(i);
          } else if (oven === 2 && i % 2 === 0) {
            result.push(i);
          }
        }
        return result;
      };

      const fromZCtoWeeks = (zcmc) => {
        // find if there is a '-' in the string
        if (zcmc.indexOf("-") == -1) {
          return [parseInt(zcmc, 10)];
        }
        // search for 单、双 in the string
        let oven = 0;
        if (zcmc.indexOf("单") !== -1) {
          oven = 1;
        } else if (zcmc.indexOf("双") !== -1) {
          oven = 2;
        }
        // split the string by '-'
        const [start, end] = zcmc.split("-").map((item) => parseInt(item, 10));
        // generate the array
        return arrayGenerator(start, end, oven);
      };

      const {
        KCM, // 课程名
        JASMC, // 上课地点
        SKJS, // 老师
        ZCMC, // 周数
        KSJC, // 开始节次
        JSJC, // 结束节次
        SKXQ, // 上课星期
        SFSYK, // 是否实验课
      } = item;

      const name = KCM;
      const position = JASMC ?? "无地点"; // 上课地点
      const teacher = SKJS ?? "无老师"; // 老师
      const weeks =
        ZCMC.indexOf(",") === -1
          ? fromZCtoWeeks(ZCMC)
          : ZCMC.split(",")
              .map((item) => fromZCtoWeeks(item))
              .flat(); // 周数
      const day = SKXQ; // 星期几
      const sections = [parseInt(KSJC, 10), parseInt(JSJC, 10)]; // 开始节次和结束节次
      const isExperiement = SFSYK === "1"; // 是否实验课

      return {
        name,
        position,
        teacher,
        weeks,
        day,
        sections,
        isExperiement,
      };
    });

  await loadTool("AIScheduleTools");
  await promt();

  const term = await queryTerm();
  const date = await queryDate(term);
  const data = await querySchedule(term);

  const rows = cleanData(data);

  const result = {
    regular: rows.filter((item) => !item.isExperiement),
    experiment: rows.filter((item) => item.isExperiement),
    date,
  };

  return JSON.stringify(result);
}

/*
      example data
          "KKDWDM_DISPLAY": "软件学院",
          "KSJC": "3",
          "SKJS": "徐占洋",
          "JSJC_DISPLAY": "第4节",
          "XNXQDM": "2023-2024-1",
          "KSJC_DISPLAY": "第3节",
          "KSLXDM": null,
          "XGXKLBDM": null,
          "KCM": "软件工程 I",
          "KBLB": "1",
          "NJDM": "2021",
          "JXLDM_DISPLAY": "临江楼",
          "ISTK_DISPLAY": "否",
          "XS": 48,
          "KCXZDM_DISPLAY": "专业(必)",
          "JASMC": "临江楼B511",
          "JSJC": "4",
          "XXXQDM": "1",
          "XGXKLBDM_DISPLAY": "",
          "ISTK": 0,
          "YPSJDD": "1-16周 星期三 第1节-第2节 信科楼B511,1-15周(单) 星期五 第3节-第4节 信科楼B511",
          "XF": 3.0,
          "SKXQ": 5,
          "KCXZDM": "16",
          "XNXQDM_DISPLAY": "2023-2024-1学期",
          "SFSYK": "0",
          "KXH": "01",
          "KCLBDM": "4",
          "ZCMC": "1-15周(单)",
          "DWDM_DISPLAY": "软件学院",
          "SKXQ_DISPLAY": "星期五",
          "JXLDM": "1-331",
    */

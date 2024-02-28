function scheduleHtmlParser(content) {
  const data = JSON.parse(content);

  const { regular, experiment, date } = data;

  return {
    courseInfos: [...regular, ...experiment],
    date,
  };
}

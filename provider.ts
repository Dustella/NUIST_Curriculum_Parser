function scheduleHtmlProvider(
  iframeContent = "",
  frameContent = "",
  dom = document
) {
  return dom.querySelector("table.wut_table").innerHTML;
}

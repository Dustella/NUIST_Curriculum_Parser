const cheerio=require('cheerio')

function scheduleHtmlParser(html) {
    
    const section_ls=[
        [
            {
                "section":1,
                "startTime":"8:00",
                "endTime":"8:45"
            },
            {
                "section":2,
                "startTime":"8:55",
                "endTime":"9:40"
            }
        ],
        [
            {
                "section":3,
                "startTime":"10:10",
                "endTime":"10:55"
            },
            {
                "section":4,
                "startTime":"11:05",
                "endTime":"11:55"
            }
        ],
        [
            {
                "section":5,
                "startTime":"13:30",
                "endTime":"14:15"
            },
            {
                "section":6,
                "startTime":"14:25",
                "endTime":"15:10"
            }
        ],
        [
            {
                "section":7,
                "startTime":"15:40",
                "endTime":"16:35"
            },
            {
                "section":8,
                "startTime":"16:45",
                "endTime":"15:35"
            }
        ],
        [
            {
                "section":9,
                "startTime":"18:45",
                "endTime":"19:30"
            },
            {
                "section":10,
                "startTime":"19:40",
                "endTime":"20:25"
            }
        ]
    ]
    const sectionTimes=[
        {
            "section":1,
            "startTime":"8:00",
            "endTime":"8:45"
        },
        {
            "section":2,
            "startTime":"8:55",
            "endTime":"9:40"
        },
        {
            "section":3,
            "startTime":"10:10",
            "endTime":"10:55"
        },
        {
            "section":4,
            "startTime":"11:05",
            "endTime":"11:55"
        },
        {
            "section":5,
            "startTime":"13:30",
            "endTime":"14:15"
        },
        {
            "section":6,
            "startTime":"14:25",
            "endTime":"15:10"
        },
        {
            "section":7,
            "startTime":"15:40",
            "endTime":"16:35"
        },
        {
            "section":8,
            "startTime":"16:45",
            "endTime":"15:35"
        },
        {
            "section":9,
            "startTime":"18:45",
            "endTime":"19:30"
        },
        {
            "section":10,
            "startTime":"19:40",
            "endTime":"20:25"
        }
    ]
    let courseInfos=[];
    
    const $ = cheerio.load(html)

    $('#TABLE1')
        .find('tr')
        .each(function(indexy,elementy){
            taaaa=$(this)
            taaaa.find('td')
            .each(function(indexx,elementx){
                raw_content=$(this).text()
                // console.log(indexx,indexy,raw_content)
                if (raw_content ==" " ){
                    print(raw_content,'IS empt')
                }else if (indexx>0 && indexy>0 && indexx<6 && indexy<6 &&!(raw_content==" ")){
                    console.log(indexx,indexy,raw_content)
                    arrayedContentGroup=raw_content.split('◆')
                    // ◇
                    for (i in arrayedContentGroup){
                        arrayedContent=arrayedContentGroup[i].split('◇')
                        console.log(arrayedContent)
                        standerizedArray=standerizeArray(arrayedContent)
                        thisCourseInfo=generateCourseInfo(standerizedArray,indexx,indexy)
                        courseInfos.push(thisCourseInfo)
                    }
            }

            })
        })


    // for(let column=1;column<8;column++)
    // {
    //     for (let row=1;row<7;row++){
            
    //         var raw_content=html.rows[row].cells[column].innerHTML;
    //         if (raw_content=="&nbsp;"){
    //             continue
    //         }
    //         arrayedContentGroup=raw_content.split('◆')
    //         // ◇
    //         for (i in arrayedContentGroup){
    //             arrayedContent=arrayedContentGroup[i].split('◇')
    //             standerizedArray=standerizeArray(arrayedContent)
    //             thisCourseInfo=generateCourseInfo(standerizedArray,column,row)
    //             courseInfos.push(thisCourseInfo)
    //         }
    //     }
    // }
    var output={'courseInfos':courseInfos,'sectionTimes':sectionTimes}
    console.log(output)

    function standerizeArray(rawArray){
        result=[]
        result=rawArray
        if (!(rawArray[1].search(/体育部/))){
            result=[
                rawArray[0],
                "体育老师(1-18)",
                "体育上课地点",
                "",
                rawArray[2]
            ]
        }
        if (!(rawArray[1].search(/大外部/))){
            result=[
                rawArray[0],
                "英语老师(1-18)",
                "英语上课地点",
                "多媒体教室",
                rawArray[2]
            ]
        }
        return result
    }

    function generateCourseInfo(arrin,x,y) {
        var courseInfo={
            'name':getName(arrin),
            'teacher':getTeacherName(arrin),
            'weeks':getWeeks(arrin),
            'position':getPostion(arrin),
            'day':getDay(x),
            'section':getSection(y)
        }
        return courseInfo
    }

    function getTeacherName(arrayedc) {
        inputstr=arrayedc[1]
        var tea_index=inputstr.search(/\(/)
        return inputstr.substring(0,tea_index)
    }

    function getWeeks(arrayedc){
        var weeks=new Array()
        inputstr=arrayedc[1]
        var week_range=inputstr.substring(inputstr.search(/\(/),inputstr.search(/\)/)).replace('(','')
        var start_week=week_range.substring(0,week_range.search(/\-/))
        var end_week=week_range.substring(week_range.search(/\-/)+1,week_range.length)
        flag_double_week=false
        ,flag_single_week=false
        if (!(arrayedc[4].search('单周'))){
            flag_single_week=true
        }
        if (!(arrayedc[4].search('双周'))){
            flag_double_week=true
        }
        for (var i = Number(start_week);i<=Number(end_week);i++){
            if (flag_double_week && i%2==1 ){
                continue
            }
            if (flag_single_week && i%2==0){
                continue
            }
            weeks.push(Number(i))
        }
        return weeks
    }

    function getName(arrayedc){
        var namec=arrayedc[0]
        return namec
    }

    function getPostion(arrayedc){
        var position=arrayedc[2]
        return position
    }

    function getDay(x) {
        return Number(x)
    }

    function getSection(y) {
        var sectionc=section_ls[y-1]
        return sectionc
    }
    console.log(output)
    return output
}
// const table=document.getElementById('TABLE1');
const table="<table id=\"TABLE1\" width=\"100%\" height=\"697\" cellspacing=\"1\" cellpadding=\"0\" border=\"1\" bgcolor=\"dfdfdf\" align=\"center\">	<tbody><tr bgcolor=\"#6699CC\">		<td width=\"60\" valign=\"middle\" height=\"40\"><div style=\"color: #FFFFFF\" align=\"center\">时间</div></td>		<td width=\"184\" valign=\"middle\" align=\"center\"><span class=\"STYLE1\" style=\"color: #FFFFFF\">星期一</span></td>		<td valign=\"middle\" align=\"center\"><span class=\"STYLE1\" style=\"color: #FFFFFF\">星期二</span></td>		<td valign=\"middle\" align=\"center\"><span class=\"STYLE1\" style=\"color: #FFFFFF\">星期三</span></td>		<td valign=\"middle\" align=\"center\"><span class=\"STYLE1\" style=\"color: #FFFFFF\">星期四</span></td>		<td valign=\"middle\" align=\"center\"><span class=\"STYLE1\" style=\"color: #FFFFFF\">星期五</span></td>		<td valign=\"middle\" align=\"center\"><span class=\"STYLE1\" style=\"color: #FFFFFF\">星期六</span></td>		<td valign=\"middle\" align=\"center\"><span class=\"STYLE1\" style=\"color: #FFFFFF\">星期日</span></td>	</tr>	<tr>		<td class=\"personaddbg1\" width=\"60\" valign=\"middle\" bgcolor=\"#E9F1F3\" align=\"center\"><p>上午</p>                                                    <p> 1~2节</p></td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">数据结构◇郑玉(1-16)(计科腾讯20(1)班;)◇阅江楼111◇多媒体教室◇{12节}</td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">软件工程◇姚永雷(1-16)(计科腾讯20(1)班;)◇阅江楼111◇多媒体教室◇{12节}</td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">电子技术基础◇李斌(1-16)(计科腾讯20(1)班;)◇阅江楼111◇多媒体教室◇{12节}</td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">概率统计◇来鹏(1-16)(计科腾讯20(1)班;)◇阅江楼111◇多媒体教室◇{12节}</td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">学术英语◇寇艳艳(1-16)(计科腾讯20(1)班;)◇阅江楼111◇多媒体教室◇{12节}</td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">&nbsp;</td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">&nbsp;</td>	</tr>	<tr>		<td class=\"personaddbg1\" width=\"60\" valign=\"middle\" bgcolor=\"#E9F1F3\" align=\"center\"><p>上午</p>                                                    <p> 3~4节</p></td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">大学物理Ⅱ（2）◇徐飞(1-16)(计科腾讯20(1)班;)◇阅江楼111◇多媒体教室◇{34节}</td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">概率统计◇来鹏(1-16)(计科腾讯20(1)班;)◇阅江楼111◇多媒体教室◇单周{34节}</td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">计算机数学建模◇彭茂(1-16)(计科腾讯20(1)班;)◇阅江楼111◇多媒体教室◇{34节}</td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">数据结构◇郑玉(1-16)(计科腾讯20(1)班;)◇阅江楼111◇多媒体教室◇单周{34节}</td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">计算机数学建模◇彭茂(1-16)(计科腾讯20(1)班;)◇阅江楼111◇多媒体教室◇单周{34节}◆电子技术基础◇李斌(1-16)(计科腾讯20(1)班;)◇阅江楼111◇多媒体教室◇双周{34节}</td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">&nbsp;</td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">&nbsp;</td>	</tr>	<tr>		<td class=\"personaddbg1\" width=\"60\" valign=\"middle\" bgcolor=\"#E9F1F3\" align=\"center\"><p>下午</p>                                                    <p> 5~6节</p></td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">&nbsp;</td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">面向对象程序设计◇潘锦基(1-16)(计科腾讯20(1)班;)◇阅江楼111◇多媒体教室◇{56节}</td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">&nbsp;</td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">大学物理Ⅱ（2）◇徐飞(1-16)(计科腾讯20(1)班;)◇阅江楼111◇多媒体教室◇双周{56节}</td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">腾讯名师导学◇王保卫(1-4)(计科腾讯20(1)班;)◇阅江楼111◇多媒体教室◇{56节}</td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">&nbsp;</td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">&nbsp;</td>	</tr>	<tr>		<td class=\"personaddbg1\" width=\"60\" valign=\"middle\" bgcolor=\"#E9F1F3\" align=\"center\"><p>下午</p>                                                    <p> 7~8节</p></td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">体育（3）◇体育部()◇{78节}</td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">&nbsp;</td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">&nbsp;</td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">&nbsp;</td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">&nbsp;</td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">&nbsp;</td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">&nbsp;</td>	</tr>	<tr>		<td class=\"personaddbg1\" width=\"60\" valign=\"middle\" bgcolor=\"#E9F1F3\" align=\"center\"><p>晚上</p>                                                    <p> 9~10节</p></td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">大学物理实验Ⅱ◇物理实验(1-16)(计科(师范)20(1)班;人工智能20(2)班;计科腾讯20(1)班;)◇物理实验室（1）(藕舫楼)◇物理实验室◇{910节}</td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">&nbsp;</td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">&nbsp;</td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">&nbsp;</td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">&nbsp;</td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">&nbsp;</td>		<td width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">&nbsp;</td>	</tr>	<tr>		<td class=\"personaddbg1\" style=\"height: 64px\" width=\"60\" valign=\"middle\" bgcolor=\"#E9F1F3\" align=\"center\"> 晚上<br>                                                    11~12节</td>		<td style=\"height: 64px\" width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">&nbsp;</td>		<td style=\"height: 64px\" width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">&nbsp;</td>		<td style=\"height: 64px\" width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">&nbsp;</td>		<td style=\"height: 64px\" width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">&nbsp;</td>		<td style=\"height: 64px\" width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">&nbsp;</td>		<td style=\"height: 64px\" width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">&nbsp;</td>		<td style=\"height: 64px\" width=\"184\" valign=\"top\" bgcolor=\"#FFFFFF\" align=\"left\">&nbsp;</td>	</tr>	<tr>		<td colspan=\"8\" height=\"37\" bgcolor=\"#FFFFFF\">&nbsp; 备注:</td>	</tr></tbody></table>"


scheduleHtmlParser(table)
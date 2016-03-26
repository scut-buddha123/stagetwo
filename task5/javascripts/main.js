window.onload = function(){
    /***************用于生成随机数据*************/
    function getDateStr(dat) {
        var y = dat.getFullYear();//年
        var m = dat.getMonth() + 1;//getMonth的计数是从0开始的，要加1
        m = m < 10 ? '0' + m : m;//补0
        var d = dat.getDate();   //获得某一天
        d = d < 10 ? '0' + d : d;//补0
        return y + '-' + m + '-' + d; //连接
    }
    function randomBuildData(seed) {
        var returnData = {};
        var dat = new Date("2016-01-01");   //创建时间对象并赋值
        var datStr = '';
        for (var i = 1; i < 92; i++) {
            datStr = getDateStr(dat);
            returnData[datStr] = Math.ceil(Math.random() * seed);//向上取整
            dat.setDate(dat.getDate() + 1);//显然这样设置，月份是会自动进位的
        }
        return returnData;
    }

    var aqiSourceData = {
        "北京": randomBuildData(500),
        "上海": randomBuildData(300),
        "广州": randomBuildData(200),
        "深圳": randomBuildData(100),
        "成都": randomBuildData(300),
        "西安": randomBuildData(500),
        "福州": randomBuildData(100),
        "厦门": randomBuildData(100),
        "沈阳": randomBuildData(500)
    };

    // 用于渲染图表的数据
    var chartData = {};

// 记录当前页面的表单选项
    var pageState = {
        nowSelectCity: "北京",
        nowGraTime: "day"
    };
    var cityselect = document.getElementById("city-select");
    var formgratime = document.getElementById("form-gra-time");
    var aqichartwrap =document.getElementById("aqi-chart-wrap");
    var color = ["#E62615","#64CA64","#FFCE43","#F3D326","#F2607A","#ABB8FA","#53287C","#444240","#296BB4"];
    //
    /**
     * 渲染图表
     */
    function renderChart(chartData) {
        console.log(chartData);
        aqichartwrap.innerHTML = '';
        aqichartwrap.innerHTML = "<h3>"+pageState.nowSelectCity+"市空气质量</h3>";
        for(var item in chartData){
            var div = document.createElement("div");
            var divhint = document.createElement("span");
            div.style.backgroundColor = color[Math.floor(Math.random()*color.length)];
            div.style.height = chartData[item]+"px";
            divhint.innerHTML = item+"<br/>"+chartData[item];
            aqichartwrap.appendChild(div);
            div.appendChild(divhint);


            switch (pageState.nowGraTime){
                case "day":
                    aqichartwrap.className = "dayDIV";
                    break;
                case "week":
                    aqichartwrap.className = "weekDIV";
                    break;
                case "month":
                    aqichartwrap.className = "monthDIV";
                    break;
                default:
                    console.log("Can't get : pageState.nowGraTime!");
                    break;
            }

        }
    }

   /*用CSS 的HOVER可以完成，不要加这么多事件监听
   function showhint(){
        aqichartwrap.addEventListener("mouseover",function(e){
            if(e.target && e.target.nodeName.toUpperCase() == "DIV" ){
                e.target.children[0].style.display = "block";
            }
        });
        aqichartwrap.addEventListener("mouseout",function(e){
            if(e.target && e.target.nodeName.toUpperCase() == "DIV"){
                e.target.children[0].style.display = "none";
            }
        });
    }*/
    function getobjlength(obj){   //获取对象长度
        var i = 0;
        for(var item in obj){
            i++;
        }
        return i;
    }

    /**
     * 日、周、月的radio事件点击时的处理函数
     */
    function graTimeChange(time) {
            chartData = {};
            var nowSourceData = aqiSourceData[pageState.nowSelectCity];
            var temp = {};//临时对象
            for(var day in nowSourceData){
                temp[day] = nowSourceData[day];
            }
            if(time == "day"){
                pageState.nowGraTime = "day";
                for(var day in temp){
                    chartData[day] = temp[day];
                }
            }
            if(time == "week"){
                pageState.nowGraTime = "week";
                var i = 0;//七进制计数
                var timer = 0;//计数器
                var week = 1;
                var plusarray = [];//每七个数据存一组
                var pingjun = 0;//平均
                for(var day in temp){
                if(i==7){
                        for(var j = 0;j<plusarray.length;j++){
                            pingjun += plusarray[j];
                        }
                        chartData["第"+week+"周"] = Math.ceil(pingjun/7);
                        plusarray = [];
                        pingjun = 0;
                        i=0;
                        week++;
                    }
                    plusarray.push(temp[day]);
                    i++;
                    timer++;
                    if(timer == getobjlength(temp)){
                        for(var j = 0;j<plusarray.length;j++){
                            pingjun += plusarray[j];
                        }

                        chartData["第"+week+"周"] = Math.ceil(pingjun/plusarray.length);

                    }
                }
            }
            if(time == "month"){
                pageState.nowGraTime = "month";
                var montharray = [];
                var monthtag = 0;
                montharray[monthtag] = [];//初始化二维数组

                for(var day in temp){
                    var linshi = day.split("-");
                    var linshi1 = parseInt(linshi[1])-1;
                    if(monthtag != linshi1){
                        montharray[linshi1] = [];
                    }
                    montharray[linshi1].push(temp[day]);
                    monthtag = linshi1;
                }

                for(var i = 0;i<montharray.length;i++){
                    var pingjun3 = 0;
                    for(var j = 0;j<montharray[i].length;j++){
                    pingjun3 += montharray[i][j];
                    }

                    montharray[i] = Math.ceil(pingjun3/montharray[i].length);
                }

                for(var i = 0;i<montharray.length;i++){
                    chartData["第"+(i+1)+"月"] = montharray[i];
                }

             }
        // 调用图表渲染函数
        renderChart(chartData);
    }

    /**
     * select发生变化时的处理函数
     */
    function citySelectChange(city) {
            // 设置对应数据
            pageState.nowSelectCity = city;
            graTimeChange(pageState.nowGraTime);
            // 调用图表渲染函数
        }



    /**
     * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
     */
    function initGraTimeForm() {
        formgratime.addEventListener("click",function(e){
            if(e.target && e.target.nodeName.toUpperCase() == "INPUT"){
                graTimeChange(e.target.value);
            }
        });
    }


    /**
     * 初始化城市Select下拉选择框中的选项
     */
    function initCitySelector() {
        // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
        cityselect.addEventListener("change",function(){
            citySelectChange(cityselect.options[cityselect.selectedIndex].value);
        });
        // 给select设置事件，当选项发生变化时调用函数citySelectChange

    }

    /**
     * 初始化图表需要的数据格式
     */
    function initAqiChartData() {
        // 将原始的源数据处理成图表需要的数据格式
        // 处理好的数据存到 chartData 中
        graTimeChange(pageState.nowGraTime);
    }

    /**
     * 初始化函数
     */
    function init() {

        initGraTimeForm();
        initCitySelector();
        initAqiChartData();
    }

    init();
};

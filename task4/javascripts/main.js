window.onload = function() { //保证DOM树加载完毕
    var aqiData = {};
    var aqicityinput = document.getElementById("aqi-city-input");
    var aqivalueinput = document.getElementById("aqi-value-input");
    var cityinputerror = document.getElementById("city_input_error");
    var aqivalueerror = document.getElementById("aqi_value_error");
    var aqitable = document.getElementById("aqi-table");
    var addbtn = document.getElementById("add-btn");//用gettagname获得一个数组，用getid只有一个就只是一个对象
    /**
     * 从用户输入中获取数据，向aqiData中增加一条数据
     * 然后渲染aqi-list列表，增加新增的数据
     */
    String.prototype.trim = function(){
        return this.replace(/(^\s*)|(\s*$)/g, "");
    };
    aqicityinput.addEventListener('keyup',function(){
        cityinputerror.innerHTML = "";
        var cityname = aqicityinput.value; //首先这个东西不能放在全局，这而且在这里定义意义也不大，因为cityname的值不可能动态改变。
        if(cityname.trim().match(/[^A-Za-z\u4E00-\u9FA5]+/)){
            cityinputerror.innerHTML = "请输入英文字母或汉字！";
            //aqicityinput.value.replace(/[^A-Za-z\u4E00-\u9FA5]+/,""); 不知道问题在哪？
            aqicityinput.value = "";

        }
    });
    aqivalueinput.addEventListener('keyup',function(){
        aqivalueerror.innerHTML = "";
        var aqivalue = aqivalueinput.value;
        if(aqivalue.trim().search(/\D/)!=-1){
            aqivalueerror.innerHTML = "请输入数字";
            aqivalueinput.value = '';

        }
    });

   function addAqiData() {
       var cityname = aqicityinput.value.trim();
       var aqivalue = aqivalueinput.value.trim();
        if(cityname == '' || aqivalue == '' ) {
        alert("两个输入框均不可为空值！");
            return false;
        }else {
            if(!aqiData.hasOwnProperty(cityname)){
                aqiData[cityname] = parseInt(aqivalue);
            }else{
                alert("该城市数据已存在！")
                return false;
            }
        }
    }

    /**
     * 渲染aqi-table表格
     */
    function renderAqiList() {
        if(!aqiData){
            return false;
        }else{
            var aqiDataArray = [];
            aqitable.innerHTML = '';
            aqitable.innerHTML = "<tr><th>城市</th><th>空气质量</th><th>操作</tr>";
            for(var item in aqiData){
                var k = [];
                k.push(item,aqiData[item]);
                aqiDataArray.push(k);
            }
            for(var i = 0;i<aqiDataArray.length;i++){
                var tr = document.createElement("tr");
                tr.innerHTML = "<td>"+aqiDataArray[i][0]+"</td><td>"+aqiDataArray[i][1]+"</td><td><button>删除</button></td>";
                aqitable.appendChild(tr);
            }
        }
    }

    /**
     * 点击add-btn时的处理逻辑
     * 获取用户输入，更新数据，并进行页面呈现的更新
     */
    function addBtnHandle() {
        addAqiData();
        renderAqiList();
    }

    /**
     * 点击各个删除按钮的时候的处理逻辑
     * 获取哪个城市数据被删，删除数据，更新表格显示
     */
    function delBtnHandle() {
        // do sth.
        var aqitable = document.getElementById("aqi-table");
        aqitable.addEventListener('click',function(e){
            if(e.target && e.target.nodeName.toUpperCase() == "BUTTON") {
                var attrname = e.target.parentNode.parentNode.childNodes[0].innerText;

                delete aqiData[attrname]//删除对象中的该属性
                console.log(aqiData);
            }
            renderAqiList();
        });

    }

    function init() {
        addbtn.addEventListener('click',addBtnHandle);
        // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
        delBtnHandle();
        // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

    }

    init();
};
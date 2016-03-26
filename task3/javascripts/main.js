(function(){
    function getData() {
        /*
         coding here
         */
        var source = document.getElementById("source");
        var sourceitems = source.children;
        var data = [];
        for(var i = 0;i<sourceitems.length;i++){
            var item = sourceitems[i].innerText.split("：");
            item[1] = parseInt(item[1]);
            data.push(item);
        }
        console.log(data);
        return data;

    }

    /**
     * sortAqiData
     * 按空气质量对data进行从小到大的排序
     * 返回一个排序后的数组
     */
    function sortAqiData(data) {
         if(data.length == 0) return [];
         var keyitem = data[0];
         var key = data[0][1];
         var left = [];
         var right = [];
         var hello = [];
         for(var i = 1;i<data.length;i++){
         if(data[i][1] <= key){
         left.push(data[i]);
         }else{
         right.push(data[i]);
         }
         }
         return sortAqiData(left).concat([keyitem],sortAqiData(right));//因为concat是会把元素一个一个输进去的，也就是会降维，所以这里的keyitem加了一个维度[]

    }

    /**
     * render
     * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
     * 格式见ul中的注释的部分
     */
    function render(data) {
        var chnum = ["一","二","三","四","五","六","七","八","九"];
        var resort = document.getElementById("resort");
        resort.innerHTML = "";
        for(var i = 0;i<data.length;i++){
            var li = document.createElement("li");
            var text = document.createTextNode("第"+chnum[i]+"名： 城市："+data[i][0].slice(0,2)+" 空气质量指数："+data[i][1]);
            li.appendChild(text);
            resort.appendChild(li);
        }
    }

    function btnHandle() {
        var aqiData = getData();
        aqiData = sortAqiData(aqiData);
        render(aqiData.reverse());
    }


    function init() {
        var sortbtn = document.getElementById("sort-btn");
        sortbtn.onclick = btnHandle; ///此处不可以用btnHandle(),这会直接调用btnHandle
        //sortbtn.addEventListener('click',btnHandle);
        // 在这下面给sort-btn绑定一个点击事件，点击时触发btnHandle函数
    }

    init();

})();
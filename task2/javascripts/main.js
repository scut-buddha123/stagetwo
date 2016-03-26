(function(){
    /******************初始化*********************/
    var cityData = [
        ["羊城",10],
        ["帝都",1],
        ["魔都",5],
        ["昆明",80],
        ["海南",82]
    ];
    var aqilist = document.getElementById("aqi-list");
    var sort60 = document.getElementById("sort60");
    var sortbubble = document.getElementById("sortbubble");
    var sortquick = document.getElementById("sortquick");
    var sortinsert = document.getElementById("sortinsert");

    /*********************以60为分界线************************/
    sort60.onclick = function(){
        aqilist.innerHTML = "";
        for(var i = 0;i<cityData.length;i++){
            if(cityData[i][1] >= 60){
                var li = document.createElement("li");
                var text = document.createTextNode("城市："+cityData[i][0]+" 空气质量指数："+cityData[i][1]);
                li.appendChild(text);
                aqilist.appendChild(li);
            }
        }
    };
    /**********************冒泡排序***************************/
    sortbubble.onclick = function(){
        aqilist.innerHTML = "";
        var storageList = [];
        for(var i = 0;i<cityData.length;i++){
            storageList[i] = cityData[i];
        }
        for(var i = 0;i<storageList.length;i++){
            for(var j = i+1;j<storageList.length;j++){
                if(storageList[i][1]<storageList[j][1]){
                    var temp = storageList[j];
                    storageList[j] = storageList[i];
                    storageList[i] = temp;
                }
            }
        }

        for(var i = 0;i<storageList.length;i++){
                var li = document.createElement("li");
                var text = document.createTextNode("城市："+storageList[i][0]+" 空气质量指数："+storageList[i][1]);
                li.appendChild(text);
                aqilist.appendChild(li);
        }
    };
    /**********************快速排序***************************/
    //第一种
    /*function quicksort(array){
        if(array.length == 0) return [];
        var keyitem = array[0];
        var key = array[0][1];
        var left = [];
        var right = [];
        var hello = [];
        for(var i = 1;i<array.length;i++){
            if(array[i][1] <= key){
                left.push(array[i]);
            }else{
                right.push(array[i]);
            }
        }
        return quicksort(left).concat([keyitem],quicksort(right));//因为concat是会把元素一个一个输进去的，也就是会降维，所以这里的keyitem加了一个维度[]
    }*/




   // 另一个快速排序算法的实现
    function qucksort(array,left,right){
        if (left < right){
            var index = partition(array,left,right);
            qucksort(array,left,index-1);
            qucksort(array,index+1,right);
        }
    }
    function partition(array,left,right){
        var key = array[right][1];
        var i = left-1;
        var j = left;
        for(j;j<right;j++){
            if(array[j][1]<key){
                i++;
                var temp = array[j];
                array[j] = array[i];
                array[i] =temp;
            }
        }
        var temp = array[i+1];
        array[i+1] = array[right];
        array[right] =temp;
        return i+1;
    }


    sortquick.onclick = function(){
        aqilist.innerHTML = "";
        var storageList = [];
        for(var i = 0;i<cityData.length;i++){
            storageList[i] = cityData[i];
        }
        qucksort(storageList,0,(storageList.length-1));
        for(var i = 0;i<storageList.length;i++){
            var li = document.createElement("li");
            var text = document.createTextNode("城市："+storageList[i][0]+" 空气质量指数："+storageList[i][1]);
            li.appendChild(text);
            aqilist.appendChild(li);
        }
    };
    /**********************插入排序***************************/
    function insertsort(Array){
        for(var i = 1;i<Array.length;i++){
            var j = i;
            var key = Array[i][1];
            while(j>0){
                if(Array[j-1][1]>key){
                    var temp = Array[j];
                    Array[j] = Array[j-1];
                    Array[j-1] =temp;
                }
                j--;
            }
        }
        return Array;
    }
    sortinsert.onclick = function(){
        aqilist.innerHTML = "";
        var storageList = [];
        for(var i = 0;i<cityData.length;i++){
            storageList[i] = cityData[i];
        }
        storageList = insertsort(storageList);
        for(var i = 0;i<storageList.length;i++){
            var li = document.createElement("li");
            var text = document.createTextNode("城市："+storageList[i][0]+" 空气质量指数："+storageList[i][1]);
            li.appendChild(text);
            aqilist.appendChild(li);
        }

    };





})();//(小括号能把我们的表达式组合分块，并且每一块，也就是每一对小括号，都有一个返回值。所以第一个括号返回一个function对象,第二个()调用它)
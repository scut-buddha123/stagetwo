(function(){
    var aqiinput = document.getElementById('aqi-input');
    var submit = document.getElementById('submit');
    var showinput = document.getElementById('show-input');
    submit.onclick = function(){
        if(aqiinput.value != "")
        {
            showinput.innerHTML = aqiinput.value;
        }else{
            showinput.innerHTML = "尚未输入";
        }
    };
})();
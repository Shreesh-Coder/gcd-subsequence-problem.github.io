

//  import { mainCallerTtimes } from './find_gcd_subsequence.js';
import { drawChart } from "./chart.mjs";

var form = document.getElementById("inputsId")

var testCase = form.elements[0];
var checkBox = form.elements[1];
var arrSize = form.elements[2];
var array = form.elements[3];
var lowerBound = form.elements[4];
var upperBound = form.elements[5];

var btn = document.getElementById("algoCallerId");
var p_html = null;
var myWorker = new Worker("find_gcd_subsequence.js");
var result = null;
var progress_html = null;
var chart_html = document.getElementById("chart_div");
var output_html = document.getElementById("outputId");
console.log(output_html.style)
console.log(myWorker);
async function hello(){
    

    if(chart_html.style.display !== "none"){
        chart_html.style.display = "none";       
    }
    
    if(progress_html){
        progress_html.remove();
    }

    if(p_html){
        p_html.remove();
    }
    

    let arr = array.value.split(",");
    
    arrayParsing(arr);
    let t = parseInt(testCase.value);
    let L = parseInt(lowerBound.value);
    let R = parseInt(upperBound.value);
    let n = parseInt(arrSize.value);

    ({t, L, R, n} = userInputChecker(t, L, R, n));

    
    algoRunner(t, L, R, n, arr);
    
    progress_html = document.createElement("progress");
    progress_html.max = t;
    progress_html.value = 0;
    output_html.append(progress_html);

    progress_html_style();
}


function disableArray(){
    if(checkBox.value === "False"){
        array.disabled = true;
        checkBox.value = "True";
        arrSize.disabled = false;
        testCase.disabled = false;
    }else{
        array.disabled = false;
        checkBox.value = "False";
        arrSize.disabled = true;
        testCase.disabled = true;
    }
    console.log(checkBox.value)
}

function arrayParsing(arr){
    let output = "";

    for(let i = 0; i < arr.length; i++){
        output += arr[i];
        arr[i] = parseInt(arr[i]);
    }
}


function algoRunner(t, L, R, n, arr){
    // let subsetsStr = "";
    
    if(checkBox.value === "True"){
        // subsetsStr = mainCallerTtimes(t, L, R, n);
        myWorker.postMessage([t, L, R, n]);
    }else{
        // subsetsStr = mainCallerTtimes(t, L, R, 0, arr);
        myWorker.postMessage([t, L, R, 0, arr]);
    }

    // return subsetsStr;
}


myWorker.onmessage = e =>{

    if(e.data.length !== 1){
        if(progress_html){
            progress_html.remove();
        }
        result = e.data;
        chart_html.style.display = "block";
        chart_html.style.order = "0";
        
        drawChart(e.data);

        p_html = document.createElement("p");
        //shreya
        p_html.setAttribute("class","p_html-class");
        
        p_html.innerHTML = result[0];
        p_html_style();
        output_html_style();
        // document.body.appendChild(p_html);
        output_html.append(p_html);
    }else{
        progress_html.value = parseInt(testCase.value) - e.data[0];
        output_html.style.justifyContent = 'center';
    }
}

function userInputChecker(t, L, R, n){
    if (L > R){
        window.alert("Lower Bound can not be greater than Upper Bound.");
        return;
    }
    
    if(t > 1000){
        t = 1000;
        testCase.value = t;
    }

    if(n > 50){
        n = 50;
        arrSize.value = n;
    }

    if(t <= 0){
        t = 1;
        testCase.value = t;
    }

    if(n <= 0){
        n = 1;
        arrSize.value = n;
    }

    if(L > 100 || R > 100){
        if(L > 100){
            L = 100;
            lowerBound.value = L;
        }
        if(R > 100){
            R = 100;
            upperBound.value = R;
        }
    }

    if(L <= 0){
        L = 1;
        lowerBound.value = L;
    }

    if(R <= 0){
        R = 1;
        upperBound.value = R;
    }

    return {t, L, R, n};
}

function output_html_style(){
    output_html.setAttribute("class", "outputId")
    output_html.style.justifyContent = "flex-start";
}

function progress_html_style(){
    progress_html.style.width = "50%";
    progress_html.style.height = "100px";
    output_html.style.display = "flex";
    output_html.style.alignItems = "center";
    // progress_html_style.cssText += ""

    // progress_html.setAttribute("class", "progressId")
}


function p_html_style(){
    p_html.style.cssText += "font-size: 1.7rem; font-family: sans-serif; color: white; width: 100%";
    p_html.style.order = "2";    
}



window.onresize = () =>{
    drawChart(result);
}


btn.addEventListener("click", hello);

checkBox.addEventListener("click", disableArray);



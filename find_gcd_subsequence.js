
const  MODULO = Math.pow(10, 9) + 7;

function countSubsets(arr){
    let n = arr.length;

    let freq = new Map();

    let subSets = new Map();

    let arrMax = 0;

    for(let i = 0; i < n; i++){
        arrMax = Math.max(arrMax, arr[i]);

        if(freq.has(arr[i])){
            freq.set(arr[i], freq.get(arr[i]) + 1);        
        }else{
            freq.set(arr[i], 1);
        }
    }

    for(let i = arrMax; i >= 1; i--){
        let add = 0;
        let sub = 0;

        if(freq.has(i))
            add = freq.get(i);
        
        for(let j = 2; j * i <= arrMax; j++){
            if(freq.has(i * j)){
                add += freq.get(i * j);
            }

            sub += subSets.get(i * j);
        }

        let pow = 1;

        for(let j = 0; j < add; j++){
            pow = (pow * 2) % MODULO;
        }

        subSets.set(i, pow - 1 - sub);
    }
    
    return subSets;
}

function gcdRange(subsets, L, R){
    let count = 0;
    let n_gcd = R - L + 1;
    let gcd = [];

    for(let i = 0; i < n_gcd; i++){
        gcd[i] = L + i;
    }

    let str = "";

    for(let i = 0; i < n_gcd; i++){
        let subset = subsets.get(gcd[i]);
        
        if(subset === undefined){
            subset = 0;
        }

        // console.log(`Number of subsets with gcd ${gcd[i]} is ${subset}\n`);
        str += `Number of subsets with gcd ${gcd[i]} is ${subset} <br>` ;
        
        if(subsets.get(gcd[i]) != null){
            count += subsets.get(gcd[i]);
        }
    }

    str += `<br>Total Subsequence: ${count}`;
    
    // console.log(`\nTotal Subsequence: ${count}`)
    // console.log(str);

    return [str, gcd, subsets];
}

function getRndInteger(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}
// var arr = [9, 6, 2];
// var arr = [3, 4, 8, 16];

// var arr = [];


function arrayIntilazier(arr, n){
    for(let i = 0; i < n; i++){
        arr.push(getRndInteger(1, Math.pow(10, 5)));
    }    
}




 function main(L, R, n, arr = null){
    if(!arr){
        arr = [];
        arrayIntilazier(arr, n);
    }

    let subsets = countSubsets(arr);

    let result =  gcdRange(subsets, L, R);

    return result;
}

async function mainCallerTtimes(t,L, R, n, arr = null){
    let result;
    let subString = "";
    while(t-- > 0){
        result = await new Promise(resolve => resolve( main(L, R, n, arr)));
        subString += result[0] 
        subString += "<br><br>==============================================<br>";
    }
    
    result[0] = subString;
    return result;
}


onmessage = ( async e =>{
    let result;
    let avgSubsets = new Map();
    let subString = "";
    let t = e.data[0];
    let totalCases = t;
    let L = e.data[1];
    let R = e.data[2];
    let n = e.data[3];
    let arr = null;
    let n_gcd = R - L + 1;
    let gcd = [];

    for(let i = 0; i < n_gcd; i++){            
        gcd[i] = L + i;
        avgSubsets.set(gcd[i], 0);
    }

    if(e.data.length === 5){
        arr = e.data[4];
    }

    while(t > 0){
        postMessage([t]);
        result = await new Promise(resolve => resolve( main(L, R, n, arr)));
        subString += result[0] 
        subString += "<br><br>==============================================<br>";
        gcd = result[1];
        subsets = result[2];
        for(let i = 0; i < gcd.length; i++){            
            avgSubsets.set(gcd[i], (avgSubsets.get(gcd[i]) % MODULO + subsets.get(gcd[i]) % MODULO) % MODULO);
        }
        t--;
    }

    for(let i = 0; i < gcd.length; i++){
        avgSubsets.set(gcd[i], avgSubsets.get(gcd[i]) / totalCases);
        console.log(`${gcd[i]}, ${avgSubsets.get(gcd[i])}`);
    }
    
    result.push(avgSubsets);
    result[0] = subString;
    postMessage(result);
}
)

// export { mainCallerTtimes };
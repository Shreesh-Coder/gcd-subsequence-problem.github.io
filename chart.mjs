 google.charts.load("current", {packages:["bar"]});
 google.charts.setOnLoadCallback(drawChart);

 
function drawChart(result = [0, 0, 0, 0]) {


    let gcd = result[1];
    let subsets = result[3];
    let n_gcd = gcd.length;
    let chartData = [["GCD", "Number of Subsets"]];
    let chartDataInital = [["GCD", "Number of Subsets"]];
    let count = 0;

    for(let i = 0; i < n_gcd; i++){
        let subset = subsets.get(gcd[i]);
        if(subset === undefined){
            subset = 0;
        }
        
        chartData.push([`${gcd[i]}`, subset]);  //Main data
        // chartDataInital.push([`${gcd[i]}`, 0]); //For intial intiallizing

        if(subsets.get(gcd[i]) != null){
            count += subsets.get(gcd[i]);
        }
    }

    var data = google.visualization.arrayToDataTable(chartData);
    // var dataIntial = google.visualization.arrayToDataTable(chartDataInital);

    var options = {
        legend: { position: 'none' },
        chart: {
            title: 'Number of subsets Vs GCD',
            subtitle: 'Number of subsets per GCD'
        },
        axes: {
            x: {
                0: {side: 'top', label: 'GCD'}
            },
            y: {
                0: {side: 'left', label: 'Number of Subsets'}
            }
        },
        bar: { groupWidth: "90%" },

        animation:{ startup: true,
                    duration: 6000,
                    easing: 'inAndOut'},        
    };

    var chart = new google.charts.Bar(document.getElementById('chart_div'));
    // chart.draw(dataIntial, options);
    chart.draw(data, options);
}



export {drawChart};
const data = JSON.parse(sessionStorage.getItem('data'));
const species_sales = data.species_sales;
const burger_sales = data.burger_sales;
const burger_by_species = data.burger_by_species;
const sales = data.sales;

const species_properties = Object.keys(species_sales);
const burger_properties = Object.keys(burger_sales);

Chart.defaults.global.defaultFontColor = '#FFF';

window.onload = function(){

    $('#sale-species').click(function() {
        var spec = document.getElementById('specific-date').value;
        if (spec){
            console.log(spec);
            generateSpeciesSalesData(spec);
        } else {
            console.log("None");
            generateSpeciesSalesData('');
        }
        
    });

    $('#sale-burger').click(function() {
        var spec = document.getElementById('specific-date').value;
        if (spec){
            console.log(spec);
            generateBurgerSalesData(spec);
        } else {
            console.log("None");
            generateBurgerSalesData('');
        }
        
    });


    $('#sale-burger-species').click(function() {
        var spec = document.getElementById('specific-date').value;
        if (spec){
            console.log(spec);
            generateBurgerBySpeciesSalesData(spec);
        } else {
            console.log("None");
            generateBurgerBySpeciesSalesData('');
        }
    });

    $('#sale-growth').click(function(){
        var speciesSelected = $('select#species-filter').children("option:selected").val();
        var burgerSelected = $('select#burger-filter').children("option:selected").val();
        // var keys = Object.keys(sales);
        // var stuff = sales[keys[0]].datetime;
        // var date = moment(stuff,"YYYY-MM-DD HH:mm:ss");
        // console.log(date);

        /* General */

        var check = new Object();

        var availableDates = new Array();
        var vals = new Array();

        Object.keys(sales).map(function(key) {
            var single = sales[key];

            var rawDate = single.datetime;
            var actualDate = moment(rawDate, "YYYY-MM-DD HH:mm:ss");

            var dateString = moment(actualDate).format("MMM D");

            if (!(availableDates.includes(dateString))){
                availableDates.push(dateString);
            }
        });

        for (var i = 0; i < availableDates.length; i++){
            var count = 0;
            Object.keys(sales).map(function(key) {
                var single = sales[key];
    
                var rawDate = single.datetime;
                var actualDate = moment(rawDate, "YYYY-MM-DD HH:mm:ss");

                var dateString = moment(actualDate).format("MMM D");

                if (dateString == availableDates[i]){
                    count++;
                }
    
            });

            vals.push(count);
        }

        console.log(availableDates);
        console.log(vals);

        check['labels'] = availableDates;
        check['values'] = vals;



        clearCanvas();
		var ctx = document.getElementById('myChart').getContext('2d');
        
		var chartData = {
            labels: check.labels,
            datasets: [{
                data: check.values,
                fill: false,
                backgroundColor: 'rgba(255,255,255, 1)',
                borderColor: 'rgba(255,255,255, 1)'
            }]
        };
    
        var myChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                title: {
                    display: true,
                    text: `Sales Over Time`
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        display: true,
                        scaleLabel:{
                            display: true,
                            labelString: 'Number of Burgers Sold'
                        }
                    }]
                },
                legend: {
                    display: false,
                },
                maintainAspectRatio: false
            }
        });

	
	
    });


    $('#show-data').click(function() {
        

        var tableData = Object.keys(sales).map(function(key) {

            var row = new Object();

            var single = sales[key];

            row['id'] = key;
            row['datetime'] = single.datetime;
            row['species'] = single.species;
            row['burger'] = single.burger;
            return row;
        });

        console.log(tableData);

        clearCanvas();

        var table = new Tabulator("#tableDetails", {
            data:tableData, //assign data to table
            height:"100%",
            layout:"fitDataFill", //fit columns to width of table (optional)
            columns:[ //Define Table Columns
                {title:"ID", field:"id", width:150},
                {title:"DateTime", field:"datetime", align:"center", sorter:"date"},
                {title:"Species", field:"species"},
                {title:"Burger Bought", field:"burger", align:"center"},
            ]
       });
    });

    $('#clear-data').click(function() {
        sessionStorage.clear();
        window.location.href="../html/upload.html";
    });

    $('#log-out').click(function() {
        sessionStorage.clear();
        window.location.href="../html/home.html";
    });
};

function clearCanvas(){
    $('#myChart').remove(); // this is my <canvas> element
    $('.dashboard__contents').prepend('<canvas id="myChart" width="400" height="400"></canvas>');
};

function generateSpeciesSalesData(date){

    var exactVals = new Array();
    var check = new Object();

    var titleDate;

    if (date){

        titleDate = date;

        for (var i = 0; i < species_properties.length; i++){
            var count = 0;

            Object.keys(sales).map(function(key) {
                var single = sales[key];

                if ((single.datetime).includes(date) && (single.species).includes(species_properties[i])){
                    console.log(single.datetime + species_properties[i] );
                    count++;
                }
            });

            exactVals.push(count);
        }

        check['species_properties'] = species_properties;
        check['values'] = exactVals;
        console.log(check);

    } else {
        titleDate = 'General';
        var vals = Object.keys(species_sales).map(function(key) {
            return species_sales[key];
        });

        check['species_properties'] = species_properties;
        check['values'] = vals;
        console.log(check);
    }

    clearCanvas();

    check['colors'] = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(123, 222, 10, 1)'
    ];


    var ctx = document.getElementById('myChart').getContext('2d');
    var chartData = {
        labels: check.species_properties,
        datasets: [{
            data: check.values,
            backgroundColor: check.colors,
            borderColor: check.colors
        }]
    };

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            title: {
                display: true,
                text: `${titleDate} Sales By Species`
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    display: true,
                    scaleLabel:{
                        display: true,
                        labelString: 'Number of Burgers Sold'
                    }
                }],
                xAxes: [{
                    display: true,
                    scaleLabel:{
                        display: true,
                        labelString: 'Species'
                    }
                }]
            },
            legend: {
                display: false,
            },
            maintainAspectRatio: false
        }
    });
};

function generateBurgerSalesData(date){

    var exactVals = new Array();
    var check = new Object();

    var titleDate;

    if (date){

        titleDate = date;

        for (var i = 0; i < burger_properties.length; i++){
            var count = 0;

            Object.keys(sales).map(function(key) {
                var single = sales[key];

                if ((single.datetime).includes(date) && (single.burger).includes(burger_properties[i])){
                    console.log(single.datetime + burger_properties[i] );
                    count++;
                }
            });

            exactVals.push(count);
        }

        check['burger_properties'] = burger_properties;
        check['values'] = exactVals;
        console.log(check);

    } else {
        titleDate = 'General';
        var vals = Object.keys(burger_sales).map(function(key) {
            return burger_sales[key];
        });

        check['burger_properties'] = burger_properties;
        check['values'] = vals;
        console.log(check);
    }

    clearCanvas();

    check['colors'] =  [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
    ];

    var ctx = document.getElementById('myChart').getContext('2d');

    var chartData = {
        labels: check.burger_properties,
        datasets: [{
            data: check.values,
            backgroundColor: check.colors,
            borderColor: check.colors
        }]
    };

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            title: {
                display: true,
                text: `${titleDate} Sales by Burger`
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    display: true,
                    scaleLabel:{
                        display: true,
                        labelString: 'Number of Burgers Sold'
                    }
                }],
                xAxes: [{
                    display: true,
                    scaleLabel:{
                        display: true,
                        labelString: 'Burger Variant'
                    }
                }]
            },
            legend: {
                display: false
            },
            maintainAspectRatio: false
        }
    });

};

function generateBurgerBySpeciesSalesData(date){

    var titleDate;
    
    if (date){

        titleDate = date;

        var vals = new Array(); 

        for (var k = 0; k < burger_properties.length; k++) {
            var indiv = new Array();

            for (var i = 0; i < species_properties.length; i++){
                var count = 0;
    
                Object.keys(sales).map(function(key) {
                    var single = sales[key];
    
                    if ((single.datetime).includes(date) && (single.species).includes(species_properties[i]) && (single.burger).includes(burger_properties[k])){
                        console.log(single.datetime + species_properties[i] + burger_properties[k] );
                        count++;
                    }
                });

                indiv.push(count);
    
            }

            vals.push(indiv);
            
        }
        
    } else {
        titleDate = 'General';

        var vals = new Array(); 

        for (var i = 0; i < burger_properties.length; i++) {
            let cat = burger_by_species[burger_properties[i]];
            var data =  Object.keys(cat).map(function(key) {
                return cat[key];
            });

            vals.push(data);
        }
    }

    clearCanvas();

        
    var barChartData = {
        labels: species_properties,
        datasets: [{
            label: burger_properties[0],
            backgroundColor: 'rgb(25, 27, 99)',
            data: vals[0]
        }, {
            label: burger_properties[1],
            backgroundColor: 'rgb(205, 17, 27)',
            data: vals[1]
        }, {
            label: burger_properties[2],
            backgroundColor: 'rgb(122, 217, 122)',
            data: vals[2]
        }]

    };
    
    
    var ctx = document.getElementById('myChart').getContext('2d');
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
            title: {
                display: true,
                text: `${titleDate} Sales By Burger per Species`
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    display: true,
                    scaleLabel:{
                        display: true,
                        labelString: 'Number of Burgers Sold'
                    }
                }],
                xAxes: [{
                    display: true,
                    scaleLabel:{
                        display: true,
                        labelString: 'Burgers by Species'
                    }
                }]
            }
        }
    });
};
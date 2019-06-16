const data = JSON.parse(sessionStorage.getItem('data'));
const species_sales = data.species_sales;
const burger_sales = data.burger_sales;
const burger_by_species = data.burger_by_species;
const sales = data.sales;

const species_properties = Object.keys(species_sales);
const burger_properties = Object.keys(burger_sales);


window.onload = function(){ 

    $('#something').click(function() {
        console.log(data);
    });

    $('#species-sales').click(function() {
        generateSpeciesSalesData('');
    });

    $('#specific-species-sales').click(function() {
        var spec = document.getElementById('specific-date').value;
        if (spec){
            console.log(spec);
        } else {
            console.log("None");
            return;
        }

        generateSpeciesSalesData(spec);
        
    });

    $('#burger-sales').click(function() {
        generateBurgerSalesData('');
    });

    $('#specific-burger-sales').click(function() {
        var spec = document.getElementById('specific-date').value;
        if (spec){
            console.log(spec);
        } else {
            console.log("None");
            return;
        }

        generateBurgerSalesData(spec);
    });

    $('#species-burger-sales').click(function() {
        var burger_properties= Object.keys(burger_by_species);
        var species_properties = Object.keys(burger_by_species[burger_properties[0]]);

        var vals = new Array(); 

        for (var i = 0; i < burger_properties.length; i++) {
            let cat = burger_by_species[burger_properties[i]];
            var data =  Object.keys(cat).map(function(key) {
                return cat[key];
            });

            vals.push(data);
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
                    text: 'Sales by Burger per Species'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                responsive: true,
            }
        });
    });

    $('#specific-species-burger-sales').click(function() {

        var spec = document.getElementById('specific-date').value;
        if (spec){
            console.log(spec);
        } else {
            console.log("None");
            return;
        }

        var vals = new Array(); 

        for (var k = 0; k < burger_properties.length; k++) {
            var indiv = new Array();

            for (var i = 0; i < species_properties.length; i++){
                var count = 0;
    
                Object.keys(sales).map(function(key) {
                    var single = sales[key];
    
                    if ((single.datetime).includes(spec) && (single.species).includes(species_properties[i]) && (single.burger).includes(burger_properties[k])){
                        console.log(single.datetime + species_properties[i] + burger_properties[k] );
                        count++;
                    }
                });

                indiv.push(count);
    
            }

            vals.push(indiv);
            
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
                    text: `${spec} Sales By Species per Burger`
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                responsive: true,
            }
        });
    });

    $('#clear-button').click(function() {
        sessionStorage.clear();
        window.location.href = "stuff.html";
    });

    
};

function clearCanvas(){
    $('#myChart').remove(); // this is my <canvas> element
    $('body').append('<canvas id="myChart" width="400" height="400"></canvas>');
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
                    }
                }]
            },
            legend: {
                display: false
            }
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
                    }
                }]
            },
            legend: {
                display: false
            }
        }
    });

};


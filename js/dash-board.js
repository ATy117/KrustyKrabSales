const data = JSON.parse(sessionStorage.getItem('data'));
const species_sales = data.species_sales;
const burger_sales = data.burger_sales;
const burger_by_species = data.burger_by_species;
const sales = data.sales;

const species_properties = Object.keys(species_sales);
const burger_properties = Object.keys(burger_sales);

Chart.defaults.global.defaultFontColor = '#FFF';
Chart.defaults.global.defaultFontSize = 10;

window.onload = function(){
    
    updateCharts();

    $('#specific-date').change(updateCharts);
    $('#species-filter').change(updateCharts);
    $('#burger-filter').change(updateCharts);



};

// function clearCanvas(){
//     $('#myChart').remove(); // this is my <canvas> element
//     $('.dashboard__contents').prepend('<canvas id="myChart" width="400" height="400"></canvas>');
// };

function updateCharts(){
    var spec = document.getElementById('specific-date').value;
    generateBurgerSalesChart(spec);
    generateSpeciesSalesChart(spec);
    generateBurgerSpeciesChart(spec);
    generateSalesComparative();
    generateSales();

};

function generateBurgerSalesChart(date){

    $('#burger-sales-chart').remove(); // this is my <canvas> element
    $('#burger-sales').prepend('<canvas id="burger-sales-chart"></canvas>');
    var exactVals = new Array();
    var check = new Object();

    var titleDate;

    if (date){

        titleDate = `for ${date}`;

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
        titleDate = '(General)';
        var vals = Object.keys(burger_sales).map(function(key) {
            return burger_sales[key];
        });

        check['burger_properties'] = burger_properties;
        check['values'] = vals;
        console.log(check);
    }

    check['colors'] =  [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
    ];

    var ctx = document.getElementById('burger-sales-chart').getContext('2d');

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
                text: `Burger Sales ${titleDate}`
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    display: true,
                    scaleLabel:{
                        display: true,
                        labelString: 'Burgers Sold'
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

function generateSpeciesSalesChart(date){

    $('#species-sales-chart').remove(); // this is my <canvas> element
    $('#species-sales').prepend('<canvas id="species-sales-chart"></canvas>');

    var exactVals = new Array();
    var check = new Object();

    var titleDate;

    if (date){

        titleDate = `for ${date}`;

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
        titleDate = '(General)';
        var vals = Object.keys(species_sales).map(function(key) {
            return species_sales[key];
        });

        check['species_properties'] = species_properties;
        check['values'] = vals;
        console.log(check);
    }

    check['colors'] = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(123, 222, 10, 1)'
    ];


    var ctx = document.getElementById('species-sales-chart').getContext('2d');
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
                text: `Species Sales ${titleDate}`
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    display: true,
                    scaleLabel:{
                        display: true,
                        labelString: 'Burgers Sold'
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

function generateBurgerSpeciesChart(date){

    $('#burger-species-chart').remove(); // this is my <canvas> element
    $('#burger-species').prepend('<canvas id="burger-species-chart"></canvas>');

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
    
    
    var ctx = document.getElementById('burger-species-chart').getContext('2d');
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
            title: {
                display: true,
                text: `${titleDate} Burger per Species`
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
                        labelString: 'Burgers Sold'
                    }
                }]
            },
            legend: {
                display: false,
            }
        }
    });
};

function generateSalesComparative(){

    $('#comparative-sales-chart').remove(); // this is my <canvas> element
    $('#comparative-sales').prepend('<canvas id="comparative-sales-chart"></canvas>');
    
    var spec = document.getElementById('specific-date').value;
    var speciesSelected = $('select#species-filter').children("option:selected").val();
    var burgerSelected = $('select#burger-filter').children("option:selected").val();

    var title;
    
    var check = new Object();

    if (spec){
        if (burgerSelected != 'general' && speciesSelected == 'general'){
            title = `on ${spec} For ${burgerSelected} over All Species`;

            var availableDates = new Array();
            var vals = new Array();

            Object.keys(sales).map(function(key) {
                var single = sales[key];

                var rawDate = single.datetime;
                var actualDate = moment(rawDate, "YYYY-MM-DD HH:mm:ss");

                var dateString = moment(actualDate).format("HH A");

                if (!(availableDates.includes(dateString)) && single.datetime.includes(spec)){
                    availableDates.push(dateString);
                }
            });

            
            for (var i = 0; i < species_properties.length; i++){
                var counts = new Array();

                for (var k = 0; k < availableDates.length; k++){

                    var count = 0;

                    Object.keys(sales).map(function(key) {
                        var single = sales[key];
            
                        var rawDate = single.datetime;
                        var actualDate = moment(rawDate, "YYYY-MM-DD HH:mm:ss");

                        var dateString = moment(actualDate).format("HH A");

                        if (dateString == availableDates[k] && single.datetime.includes(spec) && single.burger.includes(burgerSelected) && single.species.includes(species_properties[i])){
                            count++;
                        }
            
                    });

                    counts.push(count);
                }

                vals.push(counts);
            }

            check['labels'] = availableDates;
            check['values'] = vals;
            check['properties'] = species_properties;

            check['colors'] = [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(123, 222, 10, 1)'
            ];

            
            var ctx = document.getElementById('comparative-sales-chart').getContext('2d');
            
            
            var chartData = {
                labels: check.labels,
                datasets: [{
                    data: check.values[0],
                    label: check.properties[0],
                    fill: false,
                    backgroundColor: check.colors[0],
                    borderColor: check.colors[0]
                },{
                    data: check.values[1],
                    label: check.properties[1],
                    fill: false,
                    backgroundColor: check.colors[1],
                    borderColor: check.colors[1]
                },
                {
                    data: check.values[2],
                    label: check.properties[2],
                    fill: false,
                    backgroundColor: check.colors[2],
                    borderColor: check.colors[2]
                },
                {
                    data: check.values[3],
                    label: check.properties[3],
                    fill: false,
                    backgroundColor: check.colors[3],
                    borderColor: check.colors[3]
                },
                {
                    data: check.values[4],
                    label: check.properties[4],
                    fill: false,
                    backgroundColor: check.colors[4],
                    borderColor: check.colors[4]
                },
                {
                    data: check.values[5],
                    label: check.properties[5],
                    fill: false,
                    backgroundColor: check.colors[5],
                    borderColor: check.colors[5]
                },
                {
                    data: check.values[6],
                    label: check.properties[6],
                    fill: false,
                    backgroundColor: check.colors[6],
                    borderColor: check.colors[6]
                }]
            };
        
            var myChart = new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: {
                    title: {
                        display: true,
                        text: `Comparative Sales ${title}`
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
                    maintainAspectRatio: false,
                    elements: {
                        line: {
                            tension: 0
                        }
                    }
                }
            });
        } else if (burgerSelected == 'general' && speciesSelected != 'general') {
            title = `on ${spec} For ${speciesSelected} over All Burgers`;

            var availableDates = new Array();
            var vals = new Array();

            Object.keys(sales).map(function(key) {
                var single = sales[key];

                var rawDate = single.datetime;
                var actualDate = moment(rawDate, "YYYY-MM-DD HH:mm:ss");

                var dateString = moment(actualDate).format("HH A");

                if (!(availableDates.includes(dateString)) && single.datetime.includes(spec)){
                    availableDates.push(dateString);
                }
            });

            
            for (var i = 0; i < burger_properties.length; i++){
                var counts = new Array();

                for (var k = 0; k < availableDates.length; k++){

                    var count = 0;

                    Object.keys(sales).map(function(key) {
                        var single = sales[key];
            
                        var rawDate = single.datetime;
                        var actualDate = moment(rawDate, "YYYY-MM-DD HH:mm:ss");

                        var dateString = moment(actualDate).format("HH A");

                        if (dateString == availableDates[k] && single.datetime.includes(spec) && single.species.includes(speciesSelected) && single.burger.includes(burger_properties[i])){
                            count++;
                        }
            
                    });

                    counts.push(count);
                }

                vals.push(counts);
            }

            check['labels'] = availableDates;
            check['values'] = vals;
            check['properties'] = burger_properties;

            check['colors'] =  [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ];

            
            var ctx = document.getElementById('comparative-sales-chart').getContext('2d');
            
            
            var chartData = {
                labels: check.labels,
                datasets: [{
                    data: check.values[0],
                    label: check.properties[0],
                    fill: false,
                    backgroundColor: check.colors[0],
                    borderColor: check.colors[0]
                },{
                    data: check.values[1],
                    label: check.properties[1],
                    fill: false,
                    backgroundColor: check.colors[1],
                    borderColor: check.colors[1]
                },
                {
                    data: check.values[2],
                    label: check.properties[2],
                    fill: false,
                    backgroundColor: check.colors[2],
                    borderColor: check.colors[2]
                }]
            };
        
            var myChart = new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: {
                    title: {
                        display: true,
                        text: `Comparative Sales ${title}`
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
                    maintainAspectRatio: false,
                    elements: {
                        line: {
                            tension: 0
                        }
                    }
                }
            });
        }

    } else {
        if (burgerSelected != 'general' && speciesSelected == 'general'){
            title = `For ${burgerSelected} over All Species`;

            var availableDates = new Array();
            var vals = new Array();

            Object.keys(sales).map(function(key) {
                var single = sales[key];

                var rawDate = single.datetime;
                var actualDate = moment(rawDate, "YYYY-MM-DD HH:mm:ss");

                var dateString = moment(actualDate).format("MMM D, YYYY");

                if (!(availableDates.includes(dateString))){
                    availableDates.push(dateString);
                }
            });

            
            for (var i = 0; i < species_properties.length; i++){
                var counts = new Array();

                for (var k = 0; k < availableDates.length; k++){

                    var count = 0;

                    Object.keys(sales).map(function(key) {
                        var single = sales[key];
            
                        var rawDate = single.datetime;
                        var actualDate = moment(rawDate, "YYYY-MM-DD HH:mm:ss");

                        var dateString = moment(actualDate).format("MMM D, YYYY");

                        if (dateString == availableDates[k] && single.burger.includes(burgerSelected) && single.species.includes(species_properties[i])){
                            count++;
                        }
            
                    });

                    counts.push(count);
                }

                vals.push(counts);
            }

            check['labels'] = availableDates;
            check['values'] = vals;
            check['properties'] = species_properties;

            check['colors'] = [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(123, 222, 10, 1)'
            ];

            
            var ctx = document.getElementById('comparative-sales-chart').getContext('2d');
            
            
            var chartData = {
                labels: check.labels,
                datasets: [{
                    data: check.values[0],
                    label: check.properties[0],
                    fill: false,
                    backgroundColor: check.colors[0],
                    borderColor: check.colors[0]
                },{
                    data: check.values[1],
                    label: check.properties[1],
                    fill: false,
                    backgroundColor: check.colors[1],
                    borderColor: check.colors[1]
                },
                {
                    data: check.values[2],
                    label: check.properties[2],
                    fill: false,
                    backgroundColor: check.colors[2],
                    borderColor: check.colors[2]
                },
                {
                    data: check.values[3],
                    label: check.properties[3],
                    fill: false,
                    backgroundColor: check.colors[3],
                    borderColor: check.colors[3]
                },
                {
                    data: check.values[4],
                    label: check.properties[4],
                    fill: false,
                    backgroundColor: check.colors[4],
                    borderColor: check.colors[4]
                },
                {
                    data: check.values[5],
                    label: check.properties[5],
                    fill: false,
                    backgroundColor: check.colors[5],
                    borderColor: check.colors[5]
                },
                {
                    data: check.values[6],
                    label: check.properties[6],
                    fill: false,
                    backgroundColor: check.colors[6],
                    borderColor: check.colors[6]
                }]
            };
        
            var myChart = new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: {
                    title: {
                        display: true,
                        text: `Comparative Sales ${title}`
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
                    maintainAspectRatio: false,
                    elements: {
                        line: {
                            tension: 0
                        }
                    }
                }
            });
        } else if (burgerSelected == 'general' && speciesSelected != 'general') {
            title = `For ${speciesSelected} over All Burgers`;

            var availableDates = new Array();
            var vals = new Array();

            Object.keys(sales).map(function(key) {
                var single = sales[key];

                var rawDate = single.datetime;
                var actualDate = moment(rawDate, "YYYY-MM-DD HH:mm:ss");

                var dateString = moment(actualDate).format("MMM D, YYYY");

                if (!(availableDates.includes(dateString))){
                    availableDates.push(dateString);
                }
            });

            
            for (var i = 0; i < burger_properties.length; i++){
                var counts = new Array();

                for (var k = 0; k < availableDates.length; k++){

                    var count = 0;

                    Object.keys(sales).map(function(key) {
                        var single = sales[key];
            
                        var rawDate = single.datetime;
                        var actualDate = moment(rawDate, "YYYY-MM-DD HH:mm:ss");

                        var dateString = moment(actualDate).format("MMM D, YYYY");

                        if (dateString == availableDates[k] && single.species.includes(speciesSelected) && single.burger.includes(burger_properties[i])){
                            count++;
                        }
            
                    });

                    counts.push(count);
                }

                vals.push(counts);
            }

            check['labels'] = availableDates;
            check['values'] = vals;
            check['properties'] = burger_properties;

            check['colors'] =  [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ];

            
            var ctx = document.getElementById('comparative-sales-chart').getContext('2d');
            
            
            var chartData = {
                labels: check.labels,
                datasets: [{
                    data: check.values[0],
                    label: check.properties[0],
                    fill: false,
                    backgroundColor: check.colors[0],
                    borderColor: check.colors[0]
                },{
                    data: check.values[1],
                    label: check.properties[1],
                    fill: false,
                    backgroundColor: check.colors[1],
                    borderColor: check.colors[1]
                },
                {
                    data: check.values[2],
                    label: check.properties[2],
                    fill: false,
                    backgroundColor: check.colors[2],
                    borderColor: check.colors[2]
                }]
            };
        
            var myChart = new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: {
                    title: {
                        display: true,
                        text: `Comparative Sales ${title}`
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
                    maintainAspectRatio: false,
                    elements: {
                        line: {
                            tension: 0
                        }
                    }
                }
            });
        }

    }
};

function generateSales(){
    $('#general-sales-chart').remove(); // this is my <canvas> element
    $('#general-sales').prepend('<canvas id="general-sales-chart"></canvas>');

    var spec = document.getElementById('specific-date').value;
    var speciesSelected = $('select#species-filter').children("option:selected").val();
    var burgerSelected = $('select#burger-filter').children("option:selected").val();
    // var keys = Object.keys(sales);
    // var stuff = sales[keys[0]].datetime;
    // var date = moment(stuff,"YYYY-MM-DD HH:mm:ss");
    // console.log(date);

    /* General */

    
    var title;
    
    var check = new Object();

    if (spec){
        if (burgerSelected == 'general' && speciesSelected == 'general'){
            title = `on ${spec}`;

            var availableDates = new Array();
            var vals = new Array();

            Object.keys(sales).map(function(key) {
                var single = sales[key];

                var rawDate = single.datetime;
                if (rawDate.includes(spec)){
                    var actualDate = moment(rawDate, "YYYY-MM-DD HH:mm:ss");

                    var dateString = moment(actualDate).format("HH A");

                    if (!(availableDates.includes(dateString)) && single.datetime.includes(spec)){
                        availableDates.push(dateString);
                    }
                }
            });

            console.log(availableDates);

            for (var i = 0; i < availableDates.length; i++){
                var count = 0;
                Object.keys(sales).map(function(key) {
                    var single = sales[key];
        
                    var rawDate = single.datetime;
                    var actualDate = moment(rawDate, "YYYY-MM-DD HH:mm:ss");

                    var dateString = moment(actualDate).format("HH A");

                    if (dateString == availableDates[i] && single.datetime.includes(spec)){
                        count++;
                    }
        
                });

                vals.push(count);
            }

            check['labels'] = availableDates;
            check['values'] = vals;
        } else if (burgerSelected == 'general' && speciesSelected != 'general'){
            title = `on ${spec} For ${speciesSelected}`;

            var availableDates = new Array();
            var vals = new Array();

            Object.keys(sales).map(function(key) {
                var single = sales[key];

                var rawDate = single.datetime;
                var actualDate = moment(rawDate, "YYYY-MM-DD HH:mm:ss");

                var dateString = moment(actualDate).format("HH A");

                if (!(availableDates.includes(dateString)) && single.datetime.includes(spec)){
                    availableDates.push(dateString);
                }
            });

            for (var i = 0; i < availableDates.length; i++){
                var count = 0;
                Object.keys(sales).map(function(key) {
                    var single = sales[key];
        
                    var rawDate = single.datetime;
                    var actualDate = moment(rawDate, "YYYY-MM-DD HH:mm:ss");

                    var dateString = moment(actualDate).format("HH A");

                    if (dateString == availableDates[i] && single.species.includes(speciesSelected) && single.datetime.includes(spec)){
                        count++;
                    }
        
                });

                vals.push(count);
            }

            check['labels'] = availableDates;
            check['values'] = vals;

        } else if (burgerSelected != 'general' && speciesSelected == 'general'){
            title = `on ${spec} For ${burgerSelected}`;

            var availableDates = new Array();
            var vals = new Array();

            Object.keys(sales).map(function(key) {
                var single = sales[key];

                var rawDate = single.datetime;
                var actualDate = moment(rawDate, "YYYY-MM-DD HH:mm:ss");

                var dateString = moment(actualDate).format("HH A");

                if (!(availableDates.includes(dateString)) && single.datetime.includes(spec)){
                    availableDates.push(dateString);
                }
            });

            for (var i = 0; i < availableDates.length; i++){
                var count = 0;
                Object.keys(sales).map(function(key) {
                    var single = sales[key];
        
                    var rawDate = single.datetime;
                    var actualDate = moment(rawDate, "YYYY-MM-DD HH:mm:ss");

                    var dateString = moment(actualDate).format("HH A");

                    if (dateString == availableDates[i] && single.burger.includes(burgerSelected) && single.datetime.includes(spec)){
                        count++;
                    }
        
                });

                vals.push(count);
            }

            check['labels'] = availableDates;
            check['values'] = vals;

        } else {
            title = `on ${spec} For ${burgerSelected}s bought by ${speciesSelected}s`;

            var availableDates = new Array();
            var vals = new Array();

            Object.keys(sales).map(function(key) {
                var single = sales[key];

                var rawDate = single.datetime;
                var actualDate = moment(rawDate, "YYYY-MM-DD HH:mm:ss");

                var dateString = moment(actualDate).format("HH A");

                if (!(availableDates.includes(dateString))&& single.datetime.includes(spec)){
                    availableDates.push(dateString);
                }
            });

            for (var i = 0; i < availableDates.length; i++){
                var count = 0;
                Object.keys(sales).map(function(key) {
                    var single = sales[key];
        
                    var rawDate = single.datetime;
                    var actualDate = moment(rawDate, "YYYY-MM-DD HH:mm:ss");

                    var dateString = moment(actualDate).format("HH A");

                    if (dateString == availableDates[i] && single.burger.includes(burgerSelected) && single.species.includes(speciesSelected) && single.datetime.includes(spec)){
                        count++;
                    }
        
                });

                vals.push(count);
            }

            check['labels'] = availableDates;
            check['values'] = vals;
        }

    
    } else {
        if (burgerSelected == 'general' && speciesSelected == 'general'){
            title = "(General)";

            var availableDates = new Array();
            var vals = new Array();

            Object.keys(sales).map(function(key) {
                var single = sales[key];

                var rawDate = single.datetime;
                var actualDate = moment(rawDate, "YYYY-MM-DD HH:mm:ss");

                var dateString = moment(actualDate).format("MMM D, YYYY");

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

                    var dateString = moment(actualDate).format("MMM D, YYYY");

                    if (dateString == availableDates[i]){
                        count++;
                    }
        
                });

                vals.push(count);
            }

            check['labels'] = availableDates;
            check['values'] = vals;
        } else if (burgerSelected == 'general' && speciesSelected != 'general'){
            title = `For ${speciesSelected}`;

            var availableDates = new Array();
            var vals = new Array();

            Object.keys(sales).map(function(key) {
                var single = sales[key];

                var rawDate = single.datetime;
                var actualDate = moment(rawDate, "YYYY-MM-DD HH:mm:ss");

                var dateString = moment(actualDate).format("MMM D, YYYY");

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

                    var dateString = moment(actualDate).format("MMM D, YYYY");

                    if (dateString == availableDates[i] && single.species.includes(speciesSelected)){
                        count++;
                    }
        
                });

                vals.push(count);
            }

            check['labels'] = availableDates;
            check['values'] = vals;

        } else if (burgerSelected != 'general' && speciesSelected == 'general'){
            title = `For ${burgerSelected}`;

            var availableDates = new Array();
            var vals = new Array();

            Object.keys(sales).map(function(key) {
                var single = sales[key];

                var rawDate = single.datetime;
                var actualDate = moment(rawDate, "YYYY-MM-DD HH:mm:ss");

                var dateString = moment(actualDate).format("MMM D, YYYY");

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

                    var dateString = moment(actualDate).format("MMM D, YYYY");

                    if (dateString == availableDates[i] && single.burger.includes(burgerSelected)){
                        count++;
                    }
        
                });

                vals.push(count);
            }

            check['labels'] = availableDates;
            check['values'] = vals;

        } else {
            title = `For ${burgerSelected}s bought by ${speciesSelected}s`;

            var availableDates = new Array();
            var vals = new Array();

            Object.keys(sales).map(function(key) {
                var single = sales[key];

                var rawDate = single.datetime;
                var actualDate = moment(rawDate, "YYYY-MM-DD HH:mm:ss");

                var dateString = moment(actualDate).format("MMM D, YYYY");

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

                    var dateString = moment(actualDate).format("MMM D, YYYY");

                    if (dateString == availableDates[i] && single.burger.includes(burgerSelected) && single.species.includes(speciesSelected)){
                        count++;
                    }
        
                });

                vals.push(count);
            }

            check['labels'] = availableDates;
            check['values'] = vals;
        }

    }

    var ctx = document.getElementById('general-sales-chart').getContext('2d');
    
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
                text: `Sales ${title}`
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
            maintainAspectRatio: false,
            elements: {
                line: {
                    tension: 0
                }
            }
        }
    });

}
window.onload = function(){ 

    const data = JSON.parse(sessionStorage.getItem('data'));
    const species_sales = data.species_sales;
    const burger_sales = data.burger_sales;
    const burger_by_species = data.burger_by_species;

    document.getElementById('something').onclick = function() {
        console.log(data);
    };

    document.getElementById('species-sales').onclick = function() {
        var properties = Object.keys(species_sales);
        var vals = Object.keys(species_sales).map(function(key) {
            return species_sales[key];
        });


        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: properties,
                datasets: [{
                    label: 'Species Sales',
                    data: vals,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(123, 222, 10, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(123, 222, 10, 1)'
                    ],
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    };

    document.getElementById('burger-sales').onclick = function() {
        var properties1 = Object.keys(burger_sales);
        var vals1 = Object.keys(burger_sales).map(function(key) {

            return burger_sales[key];
        });


        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: properties1,
                datasets: [{
                    label: 'Sales By Burger',
                    data: vals1,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    };

    document.getElementById('species-burger-sales').onclick = function() {
        var burger_properties= Object.keys(burger_by_species);
        var species_properties = Object.keys(burger_by_species[burger_properties[0]]);
        console.log(burger_properties);
        console.log(species_properties);

        var vals = new Array(); 

        for (var i = 0; i < burger_properties.length; i++) {
            let cat = burger_by_species[burger_properties[i]];
            var data =  Object.keys(cat).map(function(key) {
                return cat[key];
            });

            vals.push(data);
        }

        console.log(vals);

        
		var barChartData = {
			labels: species_properties,
			datasets: [{
				label: burger_properties[0],
				backgroundColor: 'rgb(25, 27, 99)',
				data: vals[0]
			}, {
				label: burger_properties[1],
				backgroundColor: 'rgb(225, 227, 190)',
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
                scales: {
                    xAxes: [{
                        stacked: true,
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
        });
		

	
	

        
    };

    
};


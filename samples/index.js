window.onload = function(){ 
    document.getElementById('import').onclick = function() {
        var files = document.getElementById('selectFiles').files;
        console.log(files);
        if (files.length <= 0) {
            return false;
        }
      
        var fr = new FileReader();
        
        fr.onload = function(e) { 
            console.log(e);
            var result = JSON.parse(e.target.result);
            var formatted = JSON.stringify(result, null, 2);
            sessionStorage.setItem('data', formatted);
            window.location.href = "next.html";
        }
        
        fr.readAsText(files.item(0));
    };

    // document.getElementById('something').onclick = function() {
    //     console.log(data.species_sales);
    //     let species_sales = data.species_sales;
    //     var properties = Object.keys(species_sales);
    //     console.log(properties);
    //     var vals = Object.keys(species_sales).map(function(key) {
    //         return species_sales[key];
    //     });


    //     var ctx = document.getElementById('myChart').getContext('2d');
    //     var myChart = new Chart(ctx, {
    //         type: 'bar',
    //         data: {
    //             labels: properties,
    //             datasets: [{
    //                 label: 'Species Sales',
    //                 data: vals
    //             }]
    //         },
    //         options: {
    //             scales: {
    //                 yAxes: [{
    //                     ticks: {
    //                         beginAtZero: true
    //                     }
    //                 }]
    //             }
    //         }
    //     });
    // };
    
};


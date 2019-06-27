const data = JSON.parse(sessionStorage.getItem('data'));
const species_sales = data.species_sales;
const burger_sales = data.burger_sales;
const burger_by_species = data.burger_by_species;
const sales = data.sales;

const species_properties = Object.keys(species_sales);
const burger_properties = Object.keys(burger_sales);

Chart.defaults.global.defaultFontColor = '#FFF';

window.onload = function(){



};

function generateBurgerSalesChart(date){

};

function generateSpeciesSalesChart(date){

};

function generateBurgerSpeciesChart(date){

};
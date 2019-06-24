const button = document.getElementById("sales_table");
const data_jase = JSON.parse(sessionStorage.getItem('data'));

const species_sales_jase = data_jase.species_sales;
const species_properties_jase = Object.keys(species_sales_jase);
function addCell(tr, val){
    var td = document.createElement('td');

    td.innerHTML = val;
    tr.appendChild(td);
}

function addRow(tbl, val_1, val_2, val_3){
    var tr = document.createElement('tr');

    addCell(tr, val_1);
    addCell(tr, val_2);
    addCell(tr, val_3);

    tbl.appendChild(tr);
}

button.onclick = function (){
    tbl = document.getElementById('table_data');
    addRow(tbl, 'Hello', 'trial', 'test');
    addRow(tbl, 'one', 'two', species_properties_jase[0]);
}


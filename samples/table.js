const button = document.getElementById("sales_table");

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
}


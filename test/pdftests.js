var tap = require('tap');
var form = require('./printFormObject.js');
var fill = require('../lib/fill.js');
var test = tap.test;

//TESTs run by "node pdfcreator.js" 

var dataObject = fill(form);
console.log("Tests of pdfCreator.fill()  function");

//tap.equal(dataObject.length,5,"Test size of data object");




test("test of completeness of data object ",function(t){
    var res1 = false;
    var dataElement;
    for(var i=0; i<dataObject.length;++i) {
        if (dataObject[i].name=="Field2") {
            dataElement = dataObject[i];
            res1 = true; 
            break; 
        }
                  
    }
    
    t.ok(dataObject.length === 5,"size of data object is correct");
    t.ok(res1 === true,"Field2 found ");
    t.ok(dataElement.ref === "InvoiceRows.Price", "InvoiceRows.Price  found");
    t.ok(dataElement.value[0] + dataElement.value[1] + dataElement.value[2] === 1200 , "sum of array correct");
    t.end();
});



var pdf = require('pdfcreator');



var formObject = pdf.getFormObject('./printForm1.json');
var formObject2 = pdf.getFormObject(ReadFromsFromDB);


var invoice = new Invoice();
ReadFirstKey(invoice);


var stockMove = new StockMove();
ReadFirstKey(stockMove);


pdf.create(formObject,invoice);
pdf.create(formObject2,stockMove,"StockMove.pdf");








var formObject3 = pdf.getFormObject('./printForm1.json');

function fillFormHard(form){
    form.data["SerialNr"] = 12;
    form.data["Sum"]= 1000;
    form.data["Comments"]= "Very important document";
    form.data["image1"] = "BASE64JASDHKAHSDKAHSDKASHDLASDKHDKHK"
}


pdf.create(formObject3);




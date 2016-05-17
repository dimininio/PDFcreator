

//Пока нет реальных объектов БД, используем примеры
var DBexampleInvoice = {
    Register: "Invoice",
    InvoiceNr : 111,
    Client : "Jack",
    Sum: 1200
}


var DBexampleInvoiceRows = {
    Register: "InvoiceRows",
    array: [
        {Code: "A32", Name: "Shirt", Price: 100},
        {Code: "J12", Name: "Jacket", Price: 900},
        {Code: "SS3", Name: "Skirt", Price: 200}          
    ]
}
  



function fillFromDB(dataElement,register,formElement){
        var ref =  formElement.ref; 
        var arr = ref.split('.');
        var field = arr[1]; //из формы печати получаем имя поля регистра ("Code" из "Invoice.Code")
        if (register.hasOwnProperty('array')==false){ 
            if (register.hasOwnProperty(field))           
                    dataElement.value.push(register[field]);
        } else {           
            for(var k = 0; k < register.array.length; ++k) {
                if (register.array[k].hasOwnProperty(field))
                    dataElement.value.push(register.array[k][field]);
            }
        }
        return dataElement;
}











//Создает объект данных (dataFormObject) на основе шаблона формы печати и данных "БД"

function fill(form) {
    var dataFormObject = [];
     
    //перебираем все поля формы и заполняем данными из БД 
    for(var i =0; i< form.data.body.length;++i)
    {
        var graphicElement = form.data.body[i];
        var dataElement = {};
        dataElement.name = graphicElement.name;
        dataElement.type = graphicElement.type;
        dataElement.ref = graphicElement.ref;
        dataElement.value = graphicElement.value;
        
        //console.log(graphicElement);
        
        if (graphicElement.type==="field") {
            dataElement.value = []; //создаем пустой массив, чтобы появились свойства push/pop/length
            dataElement = fillFromDB(dataElement,DBexampleInvoice,graphicElement);
            dataElement = fillFromDB(dataElement,DBexampleInvoiceRows,graphicElement);              
        }
      
        
        dataFormObject.push(dataElement);
    }
    
    return dataFormObject;
    //console.log(dataFormObject);

}


module.exports = fill;
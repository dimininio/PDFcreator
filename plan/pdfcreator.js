var PDFkit = require('pdfkit');



function getFormObject(form){
    return form.JSON.parse;
}


//заполняем поля формы значениями из регистра 
function fillForm(form,register){
    
   // var objBD = new registers[obj["register"].constructor];
    //уменьшение кода 
    
   
    for (var field in register)    //перебираем все стандартные поля регистра
    {
        if (register[field].value!=undefined)
            form.data[register[field].name] = register[field].value   //и записываем их в соответствующие поля формы
    }
    
    //расчитываем калькуляционные поля
    if (typeof  CalcORSpecialRegister == 'function'){
        
        form = CalcORSpecialRegister(form);
        //form.special[0].call();
    }    
    
}











module.export.create = function(form,register,path){
    
    if (register!=undefined) 
           fillForm(form,register);
            
    
    
    form.body.data[i].value
                     .name
                     .size
                     .font
    
    
        
    
    //PDFkit.create();
}


module.export.create = function(formObject,dataObject,path){
    
    
    
    
    //PDFkit.create();
}
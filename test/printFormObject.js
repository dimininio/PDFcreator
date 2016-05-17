var printFormObject = {
    version: "0.1",
    register: "ItemVc",
    name: "TestForm1",
    data: {
        header: [
            {
                type: "label",
                name: "TitleLabel1",
                xPos:300,
                yPos: 20,
                width:100,
                height:20,
                clip:false,
                onlyFirstPage:false,
                onlyLastPage:false,
                wordwrap:false,
                align:"left", //temp
                rowsNumber:1,
                value:"_____ created by mansa _____",
                font: {
                    size: 12,
                    style: "Times", //temp
                    color: "#BBBBBB",
                    underline:true,
                    stroke: false,
                    italic: false,
                    bold: true,
                    characterGap:1
                },
                lineGap: 1
                
            }
        ],
        body:[
            {
                type: "label",
                name: "TitleLabel2",
                xPos:100,
                yPos: 40,
                width:200,
                height:20,
                clip:false,
                onlyFirstPage:false,
                onlyLastPage:false,
                wordwrap:false,
                align:"left", //temp
                rowsNumber:1,
                value:"Test Form 1",
                font: {
                    size: 18,
                    style: "Times", //temp
                    color: "#000000",
                    underline:true,
                    stroke: false,
                    italic: false,
                    bold: true,
                    characterGap:1
                },
                lineGap: 1
               
            },
            {
                type: "field",
                name: "Field22",
                xPos:150,
                yPos: 60,
                width:100,
                height:20,
                clip:true,
                onlyFirstPage:false,
                onlyLastPage:false,
                wordwrap:false,
                align:"left", //temp
                rowsNumber:1,
                value:["# 7872"],
                font: {
                    size: 16,
                    style: "Times", //temp
                    color: "#000000",
                    underline:false,
                    stroke: false,
                    italic: false,
                    bold: true,
                    characterGap:1
                },
                lineGap: 1,
                ref: "Invoice.InvoiceNr"                
            },                         
            {
                type: "rectangle",
                name: "Rect1",
                xPos:20,
                yPos: 100,
                width:300,
                height:400,
                clip:false,
                onlyFirstPage:false,
                onlyLastPage:false,
                lineStyle:"solid",//temp
                lineWidth: 2,
                borderColor: "#000020",
                color: "#FFFFFF" //?? should be transparent                
            },
            {
                type: "field",
                name: "Field1",
                xPos:30,
                yPos: 110,
                width:100,
                height:380,
                clip:true,
                onlyFirstPage:false,
                onlyLastPage:false,
                wordwrap:false,
                align:"left", //temp
                rowsNumber:4,
                value:[],
                font: {
                    size: 12,
                    style: "Times", //temp
                    color: "#000000",
                    underline:false,
                    stroke: false,
                    italic: false,
                    bold: true,
                    characterGap:1
                },
                lineGap: 1,
                ref: "InvoiceRows.Code"                
            },
            {
                type: "field",
                name: "Field2",
                xPos:150,
                yPos: 110,
                width:100,
                height:380,
                clip:true,
                onlyFirstPage:false,
                onlyLastPage:false,
                wordwrap:false,
                align:"left", //temp
                rowsNumber:4,
                value:[],
                font: {
                    size: 12,
                    style: "Times", //temp
                    color: "#000000",
                    underline:false,
                    stroke: false,
                    italic: false,
                    bold: true,
                    characterGap:1
                },
                lineGap: 1,
                ref: "InvoiceRows.Price"                
            },            
        ],
        footer:[]
    },
    printSettings:{
        orientation: "portraint",  //temp
        page: "A4",         //temp
        scale: 1.0
    }    
    
}



module.exports = printFormObject;
//var SourceObject = require('./SourceObject');
var Form = require('./printFormObject');
var Data = require('./dataFormObject');
var PDFDocument = require ('pdfkit');
var fs = require('fs');

var PutFormElements = function (doc,elementsArr,valuesObj,posShift)
{
    var fieldValue = '';
    
    if (typeof posShift === 'undefined') {
        posShift = 0;
    }
    if (doc instanceof PDFDocument && typeof elementsArr !== 'undefined') {
        for(var index in elementsArr){
            var curElement = elementsArr[index];
            if (valuesObj) {
                if (valuesObj.hasOwnProperty(curElement.name)) {
                   fieldValue = valuesObj[curElement.name]; 
                }
            }
            else
            {
                fieldValue = curElement.value;
            }
            switch (curElement.type.toUpperCase()){
                case 'FIELD':
                    console.log('Field: ' + curElement.name);
                    doc.save()
                       .fontSize(curElement.font.size)
                       .text(fieldValue,curElement.xPos,curElement.yPos + posShift,{
                            align:curElement.align,
                            width:curElement.width
                        })
                        .restore();
                    break;
                case 'LABEL':
                    console.log('Label: ' + curElement.name);
                    doc.save()
                       .fontSize(curElement.font.size)
                       .text(fieldValue,curElement.xPos,curElement.yPos + posShift,{
                            align:curElement.align,
                            width:curElement.width
                        })
                        .restore();
                    break;
                case 'RECTANGLE':
                    console.log('Rectangle: ' + curElement.name);
                    doc.save()
                       .lineWidth(curElement.lineWidth)
                       .rect(curElement.xPos,curElement.yPos + posShift, 
                            curElement.width, curElement.height)
                       .strokeColor(curElement.borderColor)
                       .stroke()
                       .restore();
                    break;
                default:
                    console.log('Unknown type: ' + curElement.type);
                    break;
            }

        }
    }
};

var matrixRowBox = {
            x1:-1,
            y1:-1,
            x2:-1,
            y2:-1}; //x1,y1,x2,y2 of complex matrix row
var MatrixRowHeight = -1;
    MatrixMaxRowAmount = -1;
    matrixMaxBottomPos = -1,
    x1 = -1,
    y1 = -1,
    x2 = -1,
    y2 = -1;
var matrixMultiData = [];

var printForm = new Form;

if (printForm.Form.data.body.hasOwnProperty('matrixElements')) {
    var matrixRowData = {};
    var  elementsArr = printForm.Form.data.body['matrixElements'];
    //calculate complex matrix row size
    for (var index in elementsArr) {
        matrixRowData[elementsArr[index].name] = elementsArr[index].value;
        x1 = elementsArr[index].xPos;
        y1 = elementsArr[index].yPos;
        x2 = x1 + elementsArr[index].width;
        y2 = y1 + elementsArr[index].height;
        if (matrixRowBox.x1===-1 || (matrixRowBox.x1!==-1 && matrixRowBox.x1>x1)) {
            matrixRowBox.x1 = x1;
        }
        if (matrixRowBox.y1===-1 || (matrixRowBox.y1!==-1 && matrixRowBox.y1>y1)) {
            matrixRowBox.y1 = y1;
        }
        if (matrixRowBox.x2===-1 || (matrixRowBox.x2!==-1 && matrixRowBox.x2<x2)) {
            matrixRowBox.x2 = x2;
        }
        if (matrixRowBox.y2===-1 || (matrixRowBox.y2!==-1 && matrixRowBox.y2<y2)) {
            matrixRowBox.y2 = y2;
        }
    }
    //generate matrix rows data list
    for (var attr in matrixRowData) {
        var list = Data.DataFormObject[matrixRowData[attr]];
        for (var i = 0; i < list.length; i++) {
            if (typeof matrixMultiData[i] === 'undefined') {
                var obj = {};
                for (var attrToAdd in matrixRowData) {
                    obj[attrToAdd] = "";
                }
                matrixMultiData[i] = obj;
            }
            matrixMultiData[i][attr] = list[i];
        }
    }
}

//calculate maximum bottom position for matrix box
if (matrixRowBox.x1!==-1 && matrixRowBox.x2!==-1 && matrixRowBox.y2!==-1) {
    if (printForm.Form.data.body.hasOwnProperty('nonMatrixElements')) {
        var  elementsArr = printForm.Form.data.body['nonMatrixElements'];
        for (var index in elementsArr) {
            x1 = elementsArr[index].xPos;
            y1 = elementsArr[index].yPos;
            x2 = x1 + elementsArr[index].width;
            y2 = y1 + elementsArr[index].height; 
            if (matrixRowBox.x1<=x2 && matrixRowBox.x2>=x1) {
                if (y1>=matrixRowBox.y2) {
                    if (matrixMaxBottomPos === -1 || (matrixMaxBottomPos !== -1
                            && y1<matrixMaxBottomPos)) {
                        matrixMaxBottomPos = y1;
                    }
                }
                else if (y2>=matrixRowBox.y2) {
                    if (matrixMaxBottomPos === -1 || (matrixMaxBottomPos !== -1
                            && y2<matrixMaxBottomPos)) {
                        matrixMaxBottomPos = y2;
                    }
                }
            }
        }
    }    
}

if (matrixMultiData.length!==0 && matrixMaxBottomPos!==-1) {
    //console.log(matrixMultiData);
    //console.log(matrixRowBox);
    //console.log(matrixMaxBottomPos);
    MatrixRowHeight = matrixRowBox.y2 - matrixRowBox.y1;
    MatrixMaxRowAmount = 
            Math.floor((matrixMaxBottomPos - matrixRowBox.y1)/MatrixRowHeight);
}

doc = new PDFDocument();
doc.pipe(fs.createWriteStream('OutputPDF.pdf'));
doc.font('fonts/arial.ttf');

PutFormElements(doc,printForm.Form.data.body['nonMatrixElements']);

var pageRowLoop = 0;
for (var i = 0; i < matrixMultiData.length; i++) {
    if ((pageRowLoop+1)<=MatrixMaxRowAmount) {
        PutFormElements(doc,printForm.Form.data.body['matrixElements'],
        matrixMultiData[i],MatrixRowHeight*pageRowLoop);
        pageRowLoop +=1;
    }
}
/*doc.text("Some text1")
    .scale(0.5)
    .text("Some text2")
    .scale(2)
    .text("Some text3");*/

//console.log(Object.getOwnPropertyNames(doc._font));
//console.log(doc._font.lineGap);
//console.log(doc._font.scaleFactor);
//console.log(doc.currentLineHeight());
//console.log(doc.page.height);

/*console.log(Object.getOwnPropertyNames(doc).filter(function (p) {
    return typeof doc[p] === 'function';
}));*/
//console.log(Object.getPrototypeOf(doc));  
//console.log(doc.path.toString()); 

/*doc.fontSize(20)
   .text('Some text with an embedded font!')
   .text('Another line of text Another line of text',{width:150,height:100})
   .text('Another line of text')
   .moveDown(-0.75)
   .text('Another line of text');*/

doc.end(); //console.log(doc.currentLineHeight() + " " + doc._lineGap);

if (false) {
    
    // Create a document
    doc = new PDFDocument;

    // Pipe it's output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(fs.createWriteStream('OutputPDF.pdf'));

    // Embed a font, set the font size, and render some text
    doc.font('fonts/arial.ttf')
       .fontSize(25)
       .text('Some text with an embedded font!', 100, 100);

    // Add another page
    doc.addPage({
        margin:{
            top:72,
            bottom:72,
            left:72,
            right:72
            }
        }
        )
       .fontSize(25)
       .text('Here is some vector graphics...', 100, 100);

    // Draw a triangle
    doc.save()
       .moveTo(100, 150)
       .lineTo(100, 250)
       .lineTo(200, 250)
       .fill("#FF3300");

    doc.circle(280, 200, 50)
       .lineWidth(3)
       .fillOpacity(0.8)
       .fillAndStroke("red", "#00255");

    // Apply some transforms and render an SVG path with the 'even-odd' fill rule
    doc.scale(0.6)
       .translate(470, 130)
       .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
       .fill('red', 'even-odd')
       .restore();

    // Add some text with annotations
    doc.addPage()
       .fillColor("blue")
       .text('Here is a link!', 100, 100)
       .underline(100, 100, 160, 27)
       .link(100, 100, 160, 27, 'http://google.com/');

    doc.addPage()
       .moveTo(0, 20)                              // set the current point
       .lineTo(100, 160)                            // draw a line
       .quadraticCurveTo(130, 200, 150, 120)        // draw a quadratic curve
       .bezierCurveTo(190, -40, 200, 200, 300, 150) // draw a bezier curve
       .lineTo(400, 90)                             // draw another line
       //.strokeColor('#00FF00')
       .stroke();

    doc.polygon ([100, 300], [50, 400], [150, 400])
        .strokeColor('black')
        .stroke();


    //console.log(doc.ref().compress);
    // Finalize PDF file
    doc.end();
}
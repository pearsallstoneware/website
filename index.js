const textract = require('textract')


textract.fromFileWithPath('./text.odt', 
    {preserveLineBreaks: true},
    function( error, text ) {
  console.log(text)
})

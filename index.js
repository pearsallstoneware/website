const textract = require('textract')
const ghPages = require('gh-pages')
const fs = require('fs')

textract.fromFileWithPath('./t2.odt', 
  {preserveLineBreaks: true},
  function( error, text ) {
    writeIndex(createBody(text)) 
    ghPages.publish('dist', function(err){
      console.log('published')
    })
})

function createBody(text) {
  var out = ''
  const body = text.split(/\r?\n\r?\n/)[1]
  body.split(/\r?\n/).forEach(function(line) {
    if(!line) return
    const parts = line.split(' ')
    out += `<p><b>${parts[0]} ${parts[1]}</b> ${parts.slice(2).join(' ')}</p>`
  })
  out += '</div></body></html>'
  return out
}

function writeIndex(body) {
  const tmpl = fs.readFileSync('./tmpl.html')
  fs.writeFileSync('./dist/index.html', tmpl + body)
}

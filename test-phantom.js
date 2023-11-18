const htmlPdf = require('html-pdf');
const phantomjs = require('phantomjs');

const doc = htmlPdf.create(
  `
  html <!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml">
  <html lang="fr">

    <body>
      Hello world
    </body>

  </html>
`,
  {
    phantomPath: phantomjs.path,
    type: 'pdf',
    format: 'A4'
  }
);

doc.toBuffer((err, buf) => {
  if (err) {
    console.error('Test phantom error', err);
    throw err;
  }

  console.log('Test phantom ok', buf.length);
});

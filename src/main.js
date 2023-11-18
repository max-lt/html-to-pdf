const phantomjs = require('phantomjs');
const htmlPdf = require('html-pdf');
const express = require('express');

// Express app
const app = express();

function htmlToPdf(html) {
  try {
    const doc = htmlPdf.create(html, {
      phantomPath: phantomjs.path,
      type: 'pdf',
      format: 'A4'
    });

    return new Promise((resolve, reject) =>
      doc.toBuffer((err, buf) => (err ? reject(err) : resolve(buf)))
    );
  } catch (err) {
    console.error('Failed to generate pdf', err);
    return Promise.reject(err);
  }
}

// Redirect to /html-to-pdf
app.get('/', (req, res) => {
  res.redirect('/html-to-pdf');
});

// Create example PDF from HTML and use it as documentation
app.get('/html-to-pdf', (req, res) => {
  const html = `
        <html>
          <body style="padding: 20px">
            <h1>Hello world</h1>
            
            <h2>Usage</h2>
            <p>
              <code>POST /html-to-pdf to generate a PDF from HTML</code>
            </p>
          </body>
        </html>
      `;

  htmlToPdf(html)
    .then((buf) => {
      res.setHeader('Content-Type', 'application/pdf');

      res.send(buf);
    })
    .catch((error) => {
      console.error('Test phantom error', error);

      res.json({ error });
    });
});

app.post('/html-to-pdf', express.text({ type: 'text/html' }), (req, res) => {
    if (req.header('Content-Type') !== 'text/html') {
      return res.status(400).json({ error: 'Content-Type must be text/html' });
    }

    if (!req.body) {
      return res.status(400).json({ error: 'Missing body' });
    }

    if (typeof req.body !== 'string') {
      return res.status(400).json({ error: 'Body must be a string' });
    }

    const html = req.body.trim();

    if (!html) {
      return res.status(400).json({ error: 'Body must not be empty' });
    }

    htmlToPdf(html)
      .then((buf) => {
        res.setHeader('Content-Type', 'application/pdf');

        res.send(buf);
      })
      .catch((error) => {
        console.error('Test phantom error', error);

        res.json({ error });
      });
  }
);

// Start server
const server = app.listen(3000, () => {
  console.log('Listening on port 3000');
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down server');
  server.close();
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down server');
  server.close();
});

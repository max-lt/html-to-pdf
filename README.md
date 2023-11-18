# Simple API to generate a PDF from HTML

## Start the server

### Docker

```bash
docker build -t html-to-pdf .
docker run -p 3000:3000 --name html-to-pdf html-to-pdf
```

### Node

```bash
npm install
npm start
```

## Usage

```bash
curl -X POST -H "Content-Type: text/html" --data-binary @input.html http://localhost:3000/html-to-pdf > output.pdf
```

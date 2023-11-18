# Simple API to generate a PDF from HTML

## Start the server

### With NodeJS

```bash
npm install
npm start
```

### With Docker

#### From GitHub Container Registry build

```bash
docker run -p 3000:3000 --rm --name html-to-pdf ghcr.io/max-lt/html-to-pdf:v1.0.0
```

#### From local build

```bash
docker build -t html-to-pdf .
docker run -p 3000:3000 --rm --name html-to-pdf html-to-pdf
```

## Usage

```bash
curl -X POST -H "Content-Type: text/html" --data-binary @input.html http://localhost:3000/html-to-pdf > output.pdf
```

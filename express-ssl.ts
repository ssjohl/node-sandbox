const debug = require("debug")("debug");
const express = require("express")();
const fs = require("fs");
const helmet = require("helmet");
const http = require('http');
const https = require('https');
const morgan = require("morgan");

// Constants
const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 8080;
const PORT_TLS = process.env.PORT_TLS || 8443;
const CORS_ORIGIN = process.env.CORS_ORIGIN || true;
const CORS_SUCCESS_STATUS = process.env.CORS_SUCCESS_STATUS || 200;

// Express SSL
var privateKey = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
var credentials = { key: privateKey, cert: certificate };

// Health check path
express.get('/health', (req: any, res: any) => {
    debug('Called /health');
    return res.send('');
})

// Root path
express.get("/", (req: any, res: any) => {
    res.send("");
});

// Start server
express.use(helmet());
express.use(morgan('combined'));
// express.listen(PORT, HOST, () => debug(`Listening on port ${HOST}:${PORT}`));
let httpServer = http.createServer(express);
let httpsServer = https.createServer(credentials, express);
httpServer.listen(PORT);
httpsServer.listen(PORT_TLS);

#!/usr/bin/env node
require("dotenv").config();
const https = require('https');
const PORT = process.env.PORT;

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.listen(PORT, () => console.log("server" + PORT));

app.get("/deprem/", async (req, res) => {
  res.json("Deprem için kullanılacak apilerin olduğu end point.");
});

app.get("/deprem/wpsendmessage", async (req, res) => {
  try {

    const message = {
      "type": "text",
      "text": {
        "content": req.query.message
      }
    };
    
    const options = {
      hostname: 'api.whatsapp.com',
      port: 443,
      path: `/v1/messages`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${req.query.token}`,
        'Content-Type': 'application/json'
      }
    };
    
    const wpreq = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`);
    
      res.on('data', (d) => {
        process.stdout.write(d);
      });
    });
    
    wpreq.on('error', (error) => {
      console.error(error);
    });
    
    wpreq.write(JSON.stringify(message));
    wpreq.end();

    res.json({result:result});
  } catch (error) {
    res.json({error:'There was an error, please read documentetion.'})
  }
});


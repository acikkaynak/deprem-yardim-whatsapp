# deprem-yardim-whatsapp


# Example Request

```
const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://domain.com/deprem/wpsendmessage',
  params: {message: 'MYMESSAGE', token: 'MYTOKEN'} // Token & Message here...
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
```
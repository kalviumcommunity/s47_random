const express = require('express');
const app = express();
const port = process.env.PUBLIC_PORT || 3000 ;

app.get ('/ping', (request, resolve)=>{
    //showing message as json

    resolve.json({
    message: 'pong',
    date: new Date()});
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`server running on PORT: ${port}`);
  });
}

module.exports = app;
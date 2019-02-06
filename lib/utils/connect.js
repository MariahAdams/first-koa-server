const { parse } = require('url');
const mongoose = require('mongoose');

function redact(uri) {
  const parsedUri = parse(uri);
  const authPart = parsedUri.auth ? '****:****@' : '';
  return `${parsedUri.protocol}://${authPart}${parsedUri.hostname}:${parsedUri.port}${parsedUri.path}`;
}
  
function log(event, dbUri) {
  return function() {
    console.log(`Connection ${event} on ${redact(dbUri)}`);
  };
}

module.exports = function(dbUri = process.env.MONGODB_URI) {
    
  mongoose.connect(dbUri, { useNewUrlParser: true, useCreateIndex: true });

  mongoose.connection.on('open', log('open', dbUri));

  mongoose.connection.on('error', log('error', dbUri));

  mongoose.connection.on('close', log('close', dbUri));
    
  // If the Node process ends, close the Mongoose connection 
  process.on('SIGINT', () => {  
    mongoose.connection.close(() => { 
      console.log('Mongoose default connection disconnected through app termination'); 
      process.exit(0); 
    }); 
  });

};
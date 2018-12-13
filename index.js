console.log('starting lambda')

var AWS = require("aws-sdk");
AWS.config.update({region: 'us-east-1' });

var firehouse = new AWS.Firehose();

exports.handler = function(event, context){

firehouse.putRecord(
{
    DeliveryStreamName:'kinesis-logs', 
    Record: {Data: new Buffer(JSON.stringify({foo: event.Records[0].body})) }
    
}, 
function(err, data) {
  if (err)
    console.log(err, err.stack);
  else     
    console.log(data);         
  
  context.done(err, data)
});
}
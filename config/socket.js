var SocketCluster = require('socketcluster-client');
var config = require('../config/config')
var socket

socket = SocketCluster.create(
     {
   port: config.socketPort,
   hostname: config.host
   })

   module.exports = socket


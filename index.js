const dgram = require("node:dgram");
const dnsPacket = require('dns-packet')

const server = dgram.createSocket("udp4");

const db = {

'piyush.dev':{
  type:'A',
  data:'1.2.3.4'
},
  'blog.piyush.dev':{
    type:'CNAME',
    data:'hashnode.network'
  },
  
}
server.on("message", (msg, rinfo) => {

  const incommingReq = dnsPacket.decode(msg)
  const ipFromDb= db[incommingReq.questions[0].name]

  const ans = dnsPacket.encode({
    type: 'response',
    id: incommingReq.id,
    flags:dnsPacket.AUTHORITATIVE_ANSWER,
    questions:incommingReq.questions,
    answers:[{
      type:ipFromDb.type,
      class:'IN',
      name: incommingReq.questions[0].name,
      data:ipFromDb.data
    }]
    
  })
  
server.send(ans,rinfo.port,rinfo.address )
});


server.bind(53, () => console.log("DNS server is running on PORT 53"));

//code by Sumit Dhonde
//REPL link : https://replit.com/@mytvdor/SIMPLE-DNS-SERVER#index.js 
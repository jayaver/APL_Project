var mysql = require('mysql');
let express = require('express');
let app = express();
var fs = require('fs');
const bodyparser= require('body-parser')
var nodemailer =require('nodemailer');

app.use(bodyparser.urlencoded({extended:false}));
const port = process.env.PORT || 3000;
app.use(express.static('public'));

try {
  // Create connection with MySql Database
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root1234',
    database: 'transport',
  });

  connection.connect();
  // product values comes from products_warehouse table with no duplicate

  app.get('/productval', (req, res) => {
    let select_product = 'select DISTINCT(Resource_Descr) from products_warehouse';
    connection.query(select_product, function(error, results, fields) {
      if (error) {
        throw error;
      }
      res.send(results);
    });
  });

  // Area/Country comes from ports_countries table with no duplicate
  app.get('/Area', (req, res) => {
    let select_area = 'select DISTINCT(Area_Country) from ports_countries';
    connection.query(select_area, function(error, results, fields) {
      if (error) {
        throw error;
      }
      res.send(results);
    });
  });

  // Destination port comes from ports_countries table

  app.get('/Destination/:val', function(req, res) {
    connection.query(
      'SELECT DISTINCT(Destination_port) FROM ports_countries WHERE Area_Country =?',
      [req.params.val],
      function(err, results) {
        if (err) {
          throw err;
        }
        res.send(results);
      },
    );
  });
  // Transport Equipment comes from products_warehouse table with no duplicate

  app.get('/inputProduct1/:val', (req, res) => {
    connection.query(
      'SELECT DISTINCT(Transport_Equipment) FROM products_warehouse WHERE Resource_Descr =?',
      [req.params.val],
      function(error, results) {
        if (error) {
          throw error;
        }
        res.send(results);
      },
    );
  });

  app.get('/inputProduct/:val', function(req, res) {
    connection.query(
      'SELECT Dangerous_Goods,Loading_place FROM products_warehouse WHERE Resource_Descr =?',
      [req.params.val],
      function(err, results) {
        if (err) {
          throw err;
        }
        res.send(results);
      },
    );
  });

  // Free days comes from ports_countries table
  app.get('/inputCountry/:day', function(req, res) {
    connection.query(
      'select DISTINCT(Free_days) from ports_countries WHERE Area_Country =?',
      [req.params.day],
      function(err, results) {
        if (err) {
          throw err;
        }
        res.send(results);
      },
    );
  });
  // Max Payload MT comes from products_warehouse table
  app.get('/inputCountry1/:productval1', function(req, res) {
    connection.query(
      'select Max_Payload_MT from products_warehouse  WHERE Resource_Descr =?',
      [req.params.productval1],
      function(err, results) {
        if (err) {
          throw err;
        }
        res.send(results);
      },
    );
  });
} catch (error) {
  console.error(error);
}

//Excel Creation

app.post('/thankyou', (req,res) => {
 // console.log(req.body)
  const product=req.body.inputProduct
  const trans=req.body.transportEquipment
  const danger=req.body.inputDanger
  const dly=req.body.dlyTerm
  const loadplace=req.body.loadplace
  const country=req.body.inputCountry
  const port=req.body.inputPort
  let ftext=req.body.freeText
  let ftext1=req.body.freeText1
  const qty=req.body.inputQty
  const payload=req.body.maxPayload
  const fdays=req.body.freeDays
  const info=req.body.addInfo
  const email=req.body.email
  const offer=req.body.offerFor
  const sdate=req.body.date

  
  if (ftext === undefined) ftext = ' ';
  //console.log(ftext);
  
  if (ftext1 === undefined) ftext1 = ' '; 
  //console.log(ftext1);

  if (sdate === undefined) sdate = ' ';
  //console.log(sdate);

  fs.unlink('transport_enquiry.xls',function(err){
        if(err) return console.log(err);
        //console.log('file deleted successfully');
   });
  var writeStream = fs.createWriteStream("transport_enquiry.xls");
  //Excel Header
  var header="Quantity/ Max Payload/ Info/ Offer Type/ Validity Date "+"\t"+"\t"+
  +"Loading Place"+"\t"+"Country"+"\t"+"Port"+"\t"+"State/Zip Code"+"\t"+"Transport Equipment"+"\t"+
  "Dangerous Goods"+"\t"+"Product Description"+"\t"+"Delivery Term"+"\t"+"Free Days"
  +"\t"+"Email_Id"+"\n";
  //Excel Row
  var row = qty+" MT/ year"+"/ "+payload+" MT/container"+"/ "+info+"/ "+offer+"/ "+sdate+
  "\t"+"\t"+loadplace+"\t"+country+"\t"+port+ftext+
  "\t"+ftext1+"\t"+trans+"\t"+danger+"\t"+product+"\t"+dly+"\t"+fdays+"\t"+email+"\n";
  //Writing in excel
  writeStream.write(header);
  writeStream.write(row);
  writeStream.close()

  //E-mail Generation

let transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'perstorptransport@gmail.com',
        pass:'Pass@1234'
    }
});

let mailOptions={
    from:'perstorptransport',
    to:email,
    cc:'Per.Derwik@perstorp.com',
    subject:'Perstorp Transport Enquiry'+'( '+product+' / '+danger+' / '+trans+' )',
    text: 'Thank you for submitting enquiry.'+'\nYour enquiry will be processed immediately during office hours.' + '\n' + 
    '\nProduct Description :'  + '\t' + product +
    '\nTransport Equipment :'+ '\t' + trans +
    '\nDangerous Goods :' + '\t' + danger+
    '\nDelivery term :' + '\t' + dly+
    '\nLoading Place :' + '\t'+loadplace+
    '\nCountry :' + '\t'+country+
    '\nPort :'+'\t'+port+ftext+
    '\nState/ Zip Code :'+'\t'+ftext1+
    '\nQuantity :'+'\t' + qty+
    '\nMax Pay Load :' + '\t' + payload +
    '\nAdditional Information :'+ '\t' + info +
    '\nFree Days :'+ '\t' + fdays +
    '\nOffer For :' + '\t' + offer +
    '\nDate :' + '\t' + sdate+
    '\nEmail-id :' + '\t' + email+
    '\n'+
    '\nYour enquiry will be handled by'+
    '\n'+
    '\nPer Derwik' +
    '\nSE-284 80 Perstorp Sweden'+
    '\nPhone +46 435 7886 92' +
    '\nMobile +46 708 279261' +
    '\nper.derwik@perstorp.com' +
    '\nperstorp.com',

   attachments:[
       {
           path: 'transport_enquiry.xls'
       }
   ]

};

transporter.sendMail(mailOptions, function(err,data){
    if (err) {
        console.log('Error Occurs :', err);
    }else{
        console.log('email sent')
    }
    
})

  res.send(`<h1>Thank you for submitting the enquiry.</h1>`)

 
  res.end()
 // connection.end()
  
})

app.listen(port, () => console.log(`Listening on port ${port}....`));

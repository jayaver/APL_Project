function formSubmission(){
var myform = $("form#myform")
myform.submit(function(event){
	event.preventDefault();

	var params = myform.serializeArray().reduce(function(obj, item) {
    console.log(obj);
     obj[item.name] = item.value;
     return obj;
  }, {});

  // Change to your service ID, or keep using the default service
  var service_id = "default_service";

  var template_id = "perstrop1";
  myform.find("button").text("Sending...");
  emailjs.send(service_id, template_id, params)
  	.then(function(){ 
       alert("Sent!");
       myform.find("button").text("Submit");
     }, function(err) {
       alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
       myform.find("button").text("Submit");
    });

  return false;
});
}
//Freetext field validation
document.getElementById('dlyTerm').onchange = function () {
    document.getElementById( "freeText").disabled = (this.value === 'CIF/CFR');
    document.getElementById( "freeText1").disabled = (this.value === 'CIF/CFR');
  }

//offercheck validation
function offerCheck() {
  if (document.getElementById('offerFor1').checked) {
      document.getElementById('date1').style.visibility = 'visible';
      
    }
    else document.getElementById('date1').style.visibility = 'hidden';
  }  

//date validation

$('#date').datepicker({ 
  dateFormat: 'mm/dd/yyyy',
  startDate: new Date(),
}).on('change', function(){
  $('.datepicker').hide();
});

//E-mail Validation

function validateEmail() {
  var email = document.forms['myform']['email'].value;
  var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!reg.test(email)) {
    alert('Provide valid email-id');
    return false;
  }
 }

 //Number validation
 function numberCheck() {
  var x = document.forms['myform']['inputQty'].value;
  if (isNaN(x)) {
    alert('Quantity per year must be numbers');
    return false;
  }
 }


 //Blank field validation
 function validateForm() {
  var a = document.forms['myform']['transportEquipment'].value;
  var b = document.forms['myform']['inputDanger'].value;
  var c = document.forms['myform']['dlyTerm'].value;
  var d = document.forms['myform']['loadplace'].value;
  var e = document.forms['myform']['inputCountry'].value;
  var f = document.forms['myform']['inputPort'].value;
  var g = document.forms['myform']['inputQty'].value;
  var h = document.forms['myform']['maxPayload'].value;
  var i = document.forms['myform']['freeDays'].value;
  var j = document.forms['myform']['email'].value;
  var k = document.forms['myform']['offerFor'].value;
  if (
    (a == null || a == '',
    b == null || b == '',
    c == null || c == '',
    d == null || d == '',
    d == null || d == '',
    e == null || e == '',
    f == null || f == '',
    g == null || g == '',
    h == null || h == '',
    i == null || i == '',
    j == null || j == '',
    k == null || k == '')
  ) {
    alert('Please Fill All Required Field');
    return false;
  }
}
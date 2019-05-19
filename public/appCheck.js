// Data coming in drop-down list
// Data coming in drop-down list
$(function() {
  $.getJSON('/productval', data => {
    $.each(data, function(i, data) {
      $('#inputProduct').append(
        `<option value="${data.Resource_Descr}">${data.Resource_Descr}</option>`,
      );
    });
  });

  $.getJSON('/Loading', data => {
    $.each(data, function(i, data) {
      $('#loadplace').append(
        `<option value="${data.Loading_place}">${data.Loading_place}</option>`,
      );
    });
  });
  $.getJSON('/Area', data => {
    $.each(data, function(i, data) {
      $('#inputCountry').append(
        `<option value="${data.Area_Country}">${data.Area_Country}</option>`,
      );
    });
  });

});

// Destination Port value is coming

$('#inputCountry').on('change', function(e) {
  e.preventDefault();
  $.ajax({
    type: 'GET',
    cache: false,
    contentType: 'application/json',
    datatype: 'text',
    url: 'Destination/' + this.value,
    success: function(result) {
      $('#inputPort').html('');
      $.each(result, function(i, result) {
        $('#inputPort').append(
          `<option value="${result.Destination_port}">${result.Destination_port}</option>`,
        );
      });
    },
  });
});

// Transport Equipment value is coming
$('#inputProduct').on('change', function(e) {
  e.preventDefault();
  $.ajax({
    type: 'GET',
    cache: false,
    contentType: 'application/json',
    datatype: 'text',
    url: 'inputProduct1/' + this.value,
    success: function(result) {
      $('#transportEquipment').html('');
      $.each(result, function(i, result) {
        $('#transportEquipment').append(
          `<option value="${result.Transport_Equipment}">${result.Transport_Equipment}</option>`,
        );
      });
    },
  });
});

$('#inputProduct').on('change', function(e) {
  e.preventDefault();
  $.ajax({
    type: 'GET',
    cache: false,
    contentType: 'application/json',
    datatype: 'text',
    url: 'inputProduct/' + this.value,
    success: function(result) {
      let goods = result[0].Dangerous_Goods;
      let place = result[0].Loading_place;
      $('#inputDanger').val(goods);
      $('#loadplace').val(place);
    },
  });
});

// Free Days is coming
$('#inputCountry').on('change', function(e) {
  e.preventDefault();
  $.ajax({
    type: 'GET',
    cache: false,
    contentType: 'application/json',
    datatype: 'text',
    url: 'inputCountry/' + this.value,
    success: function(result) {
      let count = result[0].Free_days;
      $('#freeDays').val(count);
    },
  });
});

//Max payload value is coming
$('#inputProduct').on('change', function() {
  let productval1 = $('#inputProduct').val();
  $.ajax({
    type: 'GET',
    cache: false,
    contentType: 'application/json',
    datatype: 'text',
    url: 'inputCountry1/' + productval1,
    success: function(result) {
      let payload = result[0].Max_Payload_MT;
      $('#maxPayload').val(payload);
    },
  });
});
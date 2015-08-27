/** Main Function Hooks **/
$(function() {
  var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
  elems.forEach(function(html) { var switchery = new Switchery(html, { size: 'small' });});

  $('.e7-field').hide();
  $('.gas-field').hide();
  $('.single-field').show();
  $('.info').hide();
  $('.datepicker').datepicker({
    onClose: function(){ $(this).trigger("change") },
    autoclose: true,
    todayBtn: 'linked',
    todayHighlight: true,
    weekStart: 1,
    format: 'dd/mm/yyyy'
  });

  $('#dual-fuel').change(fuelToggle);
  $('.sc-update').change(updateStandingCharge);
  $('.meter-update').change(validateMeterReadings);
  $('#standing-charge-calculated').change(updateTotals);
  $('#e7-meter').change(meterToggle);

  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'js/ga.js';
  document.body.appendChild(script);
});

function updateTotals() {

  if (document.querySelector('#e7-meter').checked) {
    var energyTotal = getValueAsFloat('#e7-day-total') + getValueAsFloat('#e7-night-total');
  } else {
    var energyTotal = getValueAsFloat('#single-total');
  }

  var standingTotal = getValueAsFloat('#standing-charge-calculated');

  if(document.querySelector('#dual-fuel').checked){
    var gasStandingTotal = getValueAsFloat('#gas-standing-charge-calculated');
    var gasTotal = getValueAsFloat('#gas-total');
    var subTotal = standingTotal + gasStandingTotal + energyTotal + gasTotal;
  } else {
    var subTotal = standingTotal + energyTotal;
  }

  var vat = subTotal*0.05;
  var grandTotal = subTotal + vat;
  $('#sub-total').val(subTotal.toFixed(2));
  $('#vat').val(vat.toFixed(2))
  $('#grand-total').val(grandTotal.toFixed(2));

  var numberOfDays = getValueAsFloat('#number-of-days');
  if (numberOfDays > 0) {
    var dailyAverage = grandTotal/numberOfDays;
    $('#total-average').val(dailyAverage.toFixed(2));
  }
}

function updateStandingCharge() {
  var startDate = parseDate($('#start-date').val());
  var endDate = parseDate($('#end-date').val());

  if(!validateData(startDate,endDate,'#date-feedback','The start date is after the end date!','number-of-days')) {
    return false;
  }

  var numberOfDays = diffDates(startDate,endDate);
  var standingCharge = getValueAsFloat('#daily-standing-charge');
  var gasStandingCharge = getValueAsFloat('#gas-standing-charge');

  var calculated = ((numberOfDays*standingCharge)/100);
  $('#number-of-days').val(numberOfDays);

  if(document.querySelector('#dual-fuel').checked){
    var gasCalculated = ((numberOfDays*gasStandingCharge)/100);
    $('#gas-standing-charge-calculated').val(gasCalculated.toFixed(2));
  }
  $('#standing-charge-calculated').val(calculated.toFixed(2));

  updateTotals();
}

function validateMeterReadings() {
  if (document.querySelector('#e7-meter').checked) {
    validateReadings('e7-day','The start meter reading is greater than the end meter reading!');
    validateReadings('e7-night','The start meter reading is greater than the end meter reading!');
  } else {
    validateReadings('single','The start meter reading is greater than the end meter reading!');
  }
  if(document.querySelector('#dual-fuel').checked) {
    validateReadings('gas','The start meter reading is greater than the end meter reading!');
  }
}

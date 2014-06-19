/** Main Function Hooks **/
$(function() {
  $('.e7-field').hide();
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
  $('.sc-update').change(updateStandingCharge);
  $('.meter-update').change(validateMeterReadings);
  $('#standing-charge-calculated').change(updateTotals);
  $('#meter-type').change(meterToggle);
});

function updateTotals() {
  if ($('#meter-type').val() == 'single') {
    var energyTotal = getValueAsFloat('#single-total');
  } else {
    var energyTotal = getValueAsFloat('#e7-day-total') + getValueAsFloat('#e7-night-total');
  }
  var standingTotal = getValueAsFloat('#standing-charge-calculated');
  var subTotal = standingTotal + energyTotal;
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
  var calculated = ((numberOfDays*standingCharge)/100);

  $('#number-of-days').val(numberOfDays);
  $('#standing-charge-calculated').val(calculated.toFixed(2));

  updateTotals();
}

function validateMeterReadings() {
  if ($('#meter-type').val() == 'single') {
    validateReadings('single','The start meter reading is greater than the end meter reading!');
  } else {
    validateReadings('e7-day','The start meter reading is greater than the end meter reading!');
    validateReadings('e7-night','The start meter reading is greater than the end meter reading!');
  }
}

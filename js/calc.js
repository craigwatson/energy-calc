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
  $('#start-date').change(updateStandingCharge);
  $('#end-date').change(updateStandingCharge);
  $('#daily-standing-charge').change(updateStandingCharge);
  $('#standing-charge-calculated').change(updateTotals);
  $('#meter-type').change(meterToggle);
});

function updateTotals() {
  if ($('#meter-type').val() == 'single') {
    var energyTotal = getValueAsFloat('#single-total');
  } else {
    var energyTotal = getValueAsFloat('#e7-meter-day-total') + getValueAsFloat('#e7-meter-night-total');
  }

  var standingTotal = getValueAsFloat('#standing-charge-calculated');
  var grandTotal = standingTotal + energyTotal;
  $('#grand-total').val(grandTotal.toFixed(2));
}

function updateStandingCharge() {

  if(!validateDates()) {
    return false;
  }

  var numberOfDays = diffDates(parseDate($('#start-date').val()),parseDate($('#end-date').val()));
  $('#number-of-days').val(numberOfDays);

  var standingCharge = getValueAsFloat('#daily-standing-charge');
  var calculated = numberOfDays*standingCharge;
  $('#standing-charge-calculated').val(calculated.toFixed(2));
  updateTotals();
}

function validateDates() {
  var startDate = parseDate($('#start-date').val());
  var endDate = parseDate($('#end-date').val());
  if ((startDate === false) || (endDate === false)) {
    $('#date-feedback').hide();
    $('#date-feedback').removeClass('green');
    $('#date-feedback').removeClass('red');
    return false;
  } else if (startDate > endDate) {
    $('#date-feedback').show();
    $('#date-feedback').removeClass('green');
    $('#date-feedback').addClass('red');
    $('#date-feedback').html('Your chosen Start Date is after your chosen End Date!');
    $('number-of-days').val(0);
    return false;
  } else {
    $('#date-feedback').hide();
    $('#date-feedback').removeClass('red');
    $('#date-feedback').removeClass('green');
    return true;
  }
}

function getValueAsFloat(field) {
  var fieldValue = $(field).val();
  var parsed = parseFloat(fieldValue);
  if (!parsed) {
    return parseFloat(0);
  } else {
    return parsed;
  }
}
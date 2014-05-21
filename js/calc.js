$(function() {
  $('.e7-field').hide();
  $('.single-field').show();
  $('#date-feedback').hide();
  $('#start-date').datepicker({autoclose: true, todayBtn: 'linked', todayHighlight: true, weekStart: 1, format: 'dd/mm/yyyy'})
  $('#end-date').datepicker({autoclose: true, todayBtn: 'linked', todayHighlight: true, weekStart: 1, format: 'dd/mm/yyyy'})
  $('#start-date').change(calculateStandingCharge);
  $('#end-date').change(calculateStandingCharge);
  $('#daily-standing-charge').change(calculateStandingCharge);
  $('#standing-charge-calculate').change(updateTotals);
  $('#meter-type').change(meterToggle);
});

function meterToggle() {
  if ($('#meter-type').val() == 'e7') {
    $('.e7-field').show();
    $('.single-field').hide();
  } else if($('#meter-type').val() == 'single'){
    $('.e7-field').hide();
    $('.single-field').show();
  }
}

function updateTotals() {
  $('#grand-total').val($('#standing-charge-calculated').val());
}

function calculateStandingCharge () {

  if ($('#start-date').val() != '' && $('#end-date').val() != '') {
    var startDate = parseDate($('#start-date').val());
    var endDate = parseDate($('#end-date').val());

    if (startDate > endDate) {
      $('#date-feedback').show();
      $('#date-feedback').removeClass('green');
      $('#date-feedback').addClass('red');
      $('#date-feedback').html('Start Date is after End Date');
    } else if ($('#daily-standing-charge').val() != ''){
      $('#date-feedback').removeClass('red');
      $('#date-feedback').addClass('green');
      $('#date-feedback').show();
      var numberOfDays = diffDates(parseDate($('#start-date').val()),parseDate($('#end-date').val()));
      var standingCharge = parseInt($('#daily-standing-charge').val());
      var totalPounds = ((standingCharge * numberOfDays)/100);
      $('#standing-charge-calculated').val(totalPounds.formatMoney(2));
      updateTotals();
    } else {
      $('#date-feedback').show();
      $('#date-feedback').removeClass('red');
      $('#date-feedback').addClass('green');
      $('#date-feedback').html(diffDates(startDate,endDate) + ' days');
    }
  } else {
    $('#date-feedback').hide();
  }
}

function parseDate(theDate) {
  var paramDate = theDate.split('/');
  return new Date(paramDate[2],(parseInt(paramDate[1],10)-1),parseInt(paramDate[0],10));
}

function outputDate(theDate) {
  return theDate.getDate() + "/" + pad((theDate.getMonth()+1),2,0) + "/" + theDate.getFullYear();
}

/* Assumes date2 is ALWAYS greater, and both parameters are date objects */
function diffDates(date1,date2) {
  var date1Milliseconds = date1.getTime();
  var date2Milliseconds = date2.getTime();
  var diff = date2Milliseconds - date1Milliseconds;
  return Math.round(diff/86400000);
}

/* From http://stackoverflow.com/questions/10073699 */
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

/* From http://stackoverflow.com/questions/5023901 */
Number.prototype.formatMoney = function(c, d, t){
var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };
/* Toggles display of Economy7/Single meter elements */
function meterToggle() {
  if ($('#meter-type').val() == 'e7') {
    $('.e7-field').show();
    $('.single-field').hide();
  } else if($('#meter-type').val() == 'single'){
    $('.e7-field').hide();
    $('.single-field').show();
  }
}

/* Splits a String DD/MM/YYYY date into a date object */
function parseDate(theDate) {
  var paramDate = theDate.split('/');
  if (paramDate.length < 3) {
    return false;
  } else {
    return new Date(paramDate[2],(parseInt(paramDate[1],10)-1),parseInt(paramDate[0],10));
  }
}

/* Translates a date object into DD/MM/YYYY */
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

/* From http://stackoverflow.com/questions/3885817 */
function isFloat(n) {
    return n === +n && n !== (n|0);
}

function isInteger(n) {
    return n === +n && n === (n|0);
}
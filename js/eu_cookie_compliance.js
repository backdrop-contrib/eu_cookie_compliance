Drupal.behaviors.eu_cookie_compliance_popup = function(context) {   
  enabled = Drupal.settings.eu_cookie_compliance.popup_enabled;
  if(!enabled) return
  
  action = eu_cookie_compliance_has_already_agreed();
  
  if (!action) {
    html = Drupal.settings.eu_cookie_compliance.popup_html_info;
    alert('here');
    $('a').click(function(){
      eu_cookie_compliance_has_agreed(1);
    });
  } else if(action == 1) {
    html = Drupal.settings.eu_cookie_compliance.popup_html_agreed;

  } else {
    return;
  }
  

  height = Drupal.settings.eu_cookie_compliance.popup_height;
  width = Drupal.settings.eu_cookie_compliance.popup_width;
  delay = Drupal.settings.eu_cookie_compliance.popup_delay;
  eu_cookie_compliance_create_popup(html, height, delay);
 
}

function eu_cookie_compliance_create_popup(html, height, delay) {

  var popup = $(html)
    .attr({ "id": "sliding-popup" })
    .css({"bottom": -1 * height})
    .height(height)
    .width(width)
    .hide()
    .appendTo("body");

  popup.show().animate( { bottom: 0 }, delay);
}

function eu_cookie_compliance_has_already_agreed() { 
  search = 'cookie-agreed=';
  offset = document.cookie.indexOf(search);
  if (offset < 1) return 0;
  offset += search.length;
  end = document.cookie.indexOf(';', offset);
  if (end == -1) end = document.cookie.length;
  value = document.cookie.substring(offset, end);
  return value;
}

function eu_cookie_compliance_has_agreed(value) { 
  var date = new Date(); 
  date.setDate(date.getDate() + 100); 
  document.cookie = "cookie-agreed="+value+";expires=" + date.toUTCString() + ";path=/";
  eu_cookie_compliance_destroy_popup(Drupal.settings.eu_cookie_compliance.popup_delay)
  Drupal.behaviors.eu_cookie_compliance_popup();
}

function eu_cookie_compliance_destroy_popup(delay) {
  $("#sliding-popup").animate({ bottom: $("#sliding-popup").height() * -1 }, delay, function () { $("#sliding-popup").remove(); })
}




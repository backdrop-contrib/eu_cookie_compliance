Drupal.behaviors.eu_cookie_compliance_popup = function(context) {
  enabled = Drupal.settings.eu_cookie_compliance.popup_enabled;
  if(!enabled) {
    return;
  }
  status = Drupal.eu_cookie_compliance.getStatus();
  if (status == 0) {
    html = Drupal.settings.eu_cookie_compliance.popup_html_info;
    $('a').click(function(){
      Drupal.eu_cookie_compliance.changeStatus(1);
    });
  } else if(status == 1) {
    html = Drupal.settings.eu_cookie_compliance.popup_html_agreed;
  } else {
    return;
  }

  height = Drupal.settings.eu_cookie_compliance.popup_height;
  width = Drupal.settings.eu_cookie_compliance.popup_width;
  delay = Drupal.settings.eu_cookie_compliance.popup_delay;
  position = Drupal.settings.eu_cookie_compliance.popup_position;

  Drupal.eu_cookie_compliance.createPopup(html, height, delay, position);
}

Drupal.eu_cookie_compliance = {};

Drupal.eu_cookie_compliance.createPopup = function(html, height, delay, position) {
  var popup = $(html)
    .attr({"id": "sliding-popup"})
    .height(height)
    .width(width)
    .hide();

  if(position) {
    popup.show()
      .attr({"class": "sliding-popup-top"})
      .css({"top": -1 * height})
      .prependTo("body")
      .animate({top: 0}, delay);
  } else {
    popup.show()
      .attr({"class": "sliding-popup-bottom"})
      .css({"bottom": -1 * height})
      .animate({bottom: 0}, delay)
      .appendTo("body");
  }

  $('.find-more-button', popup).click(function(){
    window.open(Drupal.settings.eu_cookie_compliance.popup_link);
  });
  $('.agree-button', popup).click(function(){
    Drupal.eu_cookie_compliance.changeStatus(1);
  });
  $('.hide-popup-button', popup).click(function(){
    Drupal.eu_cookie_compliance.changeStatus(2);
  });
}

Drupal.eu_cookie_compliance.getStatus = function() {
  search = 'cookie-agreed-'+Drupal.settings.eu_cookie_compliance.popup_language+'=';
  offset = document.cookie.indexOf(search);
  if (offset < 1) {
    return 0;
  }
  offset += search.length;
  end = document.cookie.indexOf(';', offset);
  if (end == -1) {
    end = document.cookie.length;
  }
  value = document.cookie.substring(offset, end);
  return value;
}

Drupal.eu_cookie_compliance.changeStatus = function(value) {
  var date = new Date();
  date.setDate(date.getDate() + 100);
  document.cookie = "cookie-agreed-"+Drupal.settings.eu_cookie_compliance.popup_language + "="+value+";expires=" + date.toUTCString() + ";path=/";
  Drupal.eu_cookie_compliance.destroyPopup(Drupal.settings.eu_cookie_compliance.popup_delay)
  Drupal.behaviors.eu_cookie_compliance_popup();
}

Drupal.eu_cookie_compliance.destroyPopup = function(delay) {
  $("#sliding-popup").animate({bottom: $("#sliding-popup").height() * -1}, delay, function () {$("#sliding-popup").remove();})
}

Drupal.eu_cookie_compliance.hasAgreed = function() {
  status = Drupal.eu_cookie_compliance.getStatus();
  if(status == 1 || status == 2) {
    return true;
  }
  return false;
}

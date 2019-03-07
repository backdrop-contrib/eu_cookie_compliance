/**
 * @file
 * Cookie Compliance Javascript.
 */

(function ($) {
  'use strict';
  var euCookieComplianceBlockCookies;

  Backdrop.behaviors.eu_cookie_compliance_popup = {
    attach: function (context, settings) {
      $('body', context).once('eu-cookie-compliance', function () {
        // If configured, check JSON callback to determine if in EU.
        if (Backdrop.settings.eu_cookie_compliance.popup_eu_only_js) {
          if (Backdrop.eu_cookie_compliance.showBanner()) {
            var url = Backdrop.settings.basePath + Backdrop.settings.pathPrefix + 'eu-cookie-compliance-check';
            var data = {};
            $.getJSON(url, data, function (data) {
              // If in the EU, show the compliance banner.
              if (data.in_eu) {
                Backdrop.eu_cookie_compliance.execute();
              }

              // If not in EU, set an agreed cookie automatically.
              else {
                Backdrop.eu_cookie_compliance.setStatus(2);
              }
            });
          }
        }

        // Otherwise, fallback to standard behavior which is to render the banner.
        else {
          Backdrop.eu_cookie_compliance.execute();
        }
      });
    }
  };

  Backdrop.eu_cookie_compliance = {};

  Backdrop.eu_cookie_compliance.execute = function () {
    try {
      if (!Backdrop.settings.eu_cookie_compliance.popup_enabled) {
        return;
      }

      if (!Backdrop.eu_cookie_compliance.cookiesEnabled()) {
        return;
      }

      Backdrop.eu_cookie_compliance.updateCheck();
      var status = Backdrop.eu_cookie_compliance.getCurrentStatus();
      if ((status === 0 && Backdrop.settings.eu_cookie_compliance.method === 'default') || status === null) {
        if (!Backdrop.settings.eu_cookie_compliance.disagree_do_not_show_popup || status === null) {
          // Detect mobile here and use mobile_popup_html_info, if we have a mobile device.
          if (window.matchMedia('(max-width: ' + Backdrop.settings.eu_cookie_compliance.mobile_breakpoint + 'px)').matches && Backdrop.settings.eu_cookie_compliance.use_mobile_message) {
            Backdrop.eu_cookie_compliance.createPopup(Backdrop.settings.eu_cookie_compliance.mobile_popup_html_info);
          }
          else {
            Backdrop.eu_cookie_compliance.createPopup(Backdrop.settings.eu_cookie_compliance.popup_html_info);
          }

          Backdrop.eu_cookie_compliance.attachAgreeEvents();
        }
      }
      else if (status === 1 && Backdrop.settings.eu_cookie_compliance.popup_agreed_enabled) {
        Backdrop.eu_cookie_compliance.createPopup(Backdrop.settings.eu_cookie_compliance.popup_html_agreed);
        Backdrop.eu_cookie_compliance.attachHideEvents();
      }
      else if (status === 2 && Backdrop.settings.eu_cookie_compliance.withdraw_enabled) {
        Backdrop.eu_cookie_compliance.createWithdrawBanner(Backdrop.settings.eu_cookie_compliance.withdraw_markup);
        Backdrop.eu_cookie_compliance.attachWithdrawEvents();
      }
    }
    catch (e) {
    }
  };

  Backdrop.eu_cookie_compliance.createWithdrawBanner = function (html) {
    var $html = $('<div></div>').html(html);
    var $banner = $('.eu-cookie-withdraw-banner', $html);
    $html.attr('id', 'sliding-popup');
    $html.addClass('eu-cookie-withdraw-wrapper');

    if (!Backdrop.settings.eu_cookie_compliance.popup_use_bare_css) {
      $banner.height(Backdrop.settings.eu_cookie_compliance.popup_height)
          .width(Backdrop.settings.eu_cookie_compliance.popup_width);
    }
    $html.hide();
    var height = 0;
    if (Backdrop.settings.eu_cookie_compliance.popup_position) {
      $html.prependTo('body');
      height = $html.outerHeight();

      $html.show()
          .addClass('sliding-popup-top')
          .addClass('clearfix')
          .css({ top: -1 * height });
      // For some reason, the tab outerHeight is -10 if we don't use a timeout
      // function to reveal the tab.
      setTimeout(function () {
        $html.animate({ top: -1 * height }, Backdrop.settings.eu_cookie_compliance.popup_delay, null, function () {
          $html.trigger('eu_cookie_compliance_popup_open');
        });
      }.bind($html, height), 0);
    }
    else {
      if (Backdrop.settings.eu_cookie_compliance.better_support_for_screen_readers) {
        $html.prependTo('body');
      }
      else {
        $html.appendTo('body');
      }
      height = $html.outerHeight();
      $html.show()
          .addClass('sliding-popup-bottom')
          .css({ bottom: -1 * height });
      // For some reason, the tab outerHeight is -10 if we don't use a timeout
      // function to reveal the tab.
      setTimeout(function () {
        $html.animate({ bottom: -1 * height }, Backdrop.settings.eu_cookie_compliance.popup_delay, null, function () {
          $html.trigger('eu_cookie_compliance_popup_open');
        });
      }.bind($html, height), 0);
    }
  };

  Backdrop.eu_cookie_compliance.toggleWithdrawBanner = function () {
    var $wrapper = $('#sliding-popup');
    var $tab = $('.eu-cookie-withdraw-tab');
    var $bannerIsShowing = Backdrop.settings.eu_cookie_compliance.popup_position ? parseInt($wrapper.css('top')) === 0 : parseInt($wrapper.css('bottom')) === 0;
    var topBottom = (Backdrop.settings.eu_cookie_compliance.popup_position ? 'top' : 'bottom');
    var height = $wrapper.outerHeight();
    if (Backdrop.settings.eu_cookie_compliance.popup_position) {
      if ($bannerIsShowing) {
        $wrapper.animate({'top' : -1 * height}, Backdrop.settings.eu_cookie_compliance.popup_delay);
      }
      else {
        $wrapper.animate({'top' : 0}, Backdrop.settings.eu_cookie_compliance.popup_delay);
      }
    }
    else {
      if ($bannerIsShowing) {
        $wrapper.animate({'bottom' : -1 * height}, Backdrop.settings.eu_cookie_compliance.popup_delay);
      }
      else {
        $wrapper.animate({'bottom' : 0}, Backdrop.settings.eu_cookie_compliance.popup_delay);
      }
    }
  };

  Backdrop.eu_cookie_compliance.createPopup = function (html) {

    // This fixes a problem with jQuery 1.9.
    var $popup = $('<div></div>').html(html);
    $popup.attr('id', 'sliding-popup');
    if (!Backdrop.settings.eu_cookie_compliance.popup_use_bare_css) {
      $popup.height(Backdrop.settings.eu_cookie_compliance.popup_height)
          .width(Backdrop.settings.eu_cookie_compliance.popup_width);
    }

    $popup.hide();
    var height = 0;
    if (Backdrop.settings.eu_cookie_compliance.popup_position) {
      $popup.prependTo('body');
      height = $popup.outerHeight();
      $popup.show()
        .attr({ 'class': 'sliding-popup-top clearfix' })
        .css({ top: -1 * height })
        .animate({ top: 0 }, Backdrop.settings.eu_cookie_compliance.popup_delay, null, function () {
          $popup.trigger('eu_cookie_compliance_popup_open');
        });
    }
    else {
      if (Backdrop.settings.eu_cookie_compliance.better_support_for_screen_readers) {
        $popup.prependTo('body');
      }
      else {
        $popup.appendTo('body');
      }

      height = $popup.outerHeight();
      $popup.show()
        .attr({ 'class': 'sliding-popup-bottom' })
        .css({ bottom: -1 * height })
        .animate({ bottom: 0 }, Backdrop.settings.eu_cookie_compliance.popup_delay, null, function () {
          $popup.trigger('eu_cookie_compliance_popup_open');
        });
    }
  };

  Backdrop.eu_cookie_compliance.attachAgreeEvents = function () {
    var clickingConfirms = Backdrop.settings.eu_cookie_compliance.popup_clicking_confirmation;
    var scrollConfirms = Backdrop.settings.eu_cookie_compliance.popup_scrolling_confirmation;

    $('.agree-button').click(Backdrop.eu_cookie_compliance.acceptAction);
    $('.decline-button').click(Backdrop.eu_cookie_compliance.declineAction);

    if (clickingConfirms) {
      $('a, input[type=submit], button[type=submit]').not('.popup-content *').bind('click.euCookieCompliance', Backdrop.eu_cookie_compliance.acceptAction);
    }

    if (scrollConfirms) {
      var alreadyScrolled = false;
      var scrollHandler = function () {
        if (alreadyScrolled) {
          Backdrop.eu_cookie_compliance.acceptAction();
          $(window).off('scroll', scrollHandler);
        }
        else {
          alreadyScrolled = true;
        }
      };

      $(window).bind('scroll', scrollHandler);
    }

    $('.find-more-button').not('.find-more-button-processed').addClass('find-more-button-processed').click(Backdrop.eu_cookie_compliance.moreInfoAction);
  };

  Backdrop.eu_cookie_compliance.attachHideEvents = function () {
    var popupHideAgreed = Backdrop.settings.eu_cookie_compliance.popup_hide_agreed;
    var clickingConfirms = Backdrop.settings.eu_cookie_compliance.popup_clicking_confirmation;
    $('.hide-popup-button').click(function () {
      Backdrop.eu_cookie_compliance.changeStatus(2);
    }
    );
    if (clickingConfirms) {
      $('a, input[type=submit], button[type=submit]').unbind('click.euCookieCompliance');
    }

    if (popupHideAgreed) {
      $('a, input[type=submit], button[type=submit]').bind('click.euCookieComplianceHideAgreed', function () {
        Backdrop.eu_cookie_compliance.changeStatus(2);
      });
    }

    $('.find-more-button').not('.find-more-button-processed').addClass('find-more-button-processed').click(Backdrop.eu_cookie_compliance.moreInfoAction);
  };

  Backdrop.eu_cookie_compliance.attachWithdrawEvents = function () {
    $('.eu-cookie-withdraw-button').click(Backdrop.eu_cookie_compliance.withdrawAction);
    $('.eu-cookie-withdraw-tab').click(Backdrop.eu_cookie_compliance.toggleWithdrawBanner);
  };

  Backdrop.eu_cookie_compliance.acceptAction = function () {
    var agreedEnabled = Backdrop.settings.eu_cookie_compliance.popup_agreed_enabled;
    var nextStatus = 1;
    if (!agreedEnabled) {
      Backdrop.eu_cookie_compliance.setStatus(1);
      nextStatus = 2;
    }

    if (!euCookieComplianceHasLoadedScripts) {
      euCookieComplianceLoadScripts();
    }

    if (typeof euCookieComplianceBlockCookies !== 'undefined') {
      clearInterval(euCookieComplianceBlockCookies);
    }

    Backdrop.eu_cookie_compliance.changeStatus(nextStatus);
  };

  Backdrop.eu_cookie_compliance.declineAction = function () {
    Backdrop.eu_cookie_compliance.setStatus(0);
    var popup = $('#sliding-popup');
    if (popup.hasClass('sliding-popup-top')) {
      popup.animate({ top: popup.outerHeight() * -1 }).trigger('eu_cookie_compliance_popup_close');
    }
    else {
      popup.animate({ bottom: popup.outerHeight() * -1 }).trigger('eu_cookie_compliance_popup_close');
    }
  };

  Backdrop.eu_cookie_compliance.withdrawAction = function () {
    Backdrop.eu_cookie_compliance.setStatus(0);

    location.reload();
  };

  Backdrop.eu_cookie_compliance.moreInfoAction = function () {
    if (Backdrop.settings.eu_cookie_compliance.disagree_do_not_show_popup) {
      Backdrop.eu_cookie_compliance.setStatus(0);
      $('#sliding-popup').trigger('eu_cookie_compliance_popup_close').remove();
    }
    else {
      if (Backdrop.settings.eu_cookie_compliance.popup_link_new_window) {
        window.open(Backdrop.settings.eu_cookie_compliance.popup_link);
      }
      else {
        window.location.href = Backdrop.settings.eu_cookie_compliance.popup_link;
      }
    }
  };

  Backdrop.eu_cookie_compliance.getCurrentStatus = function () {
    var cookieName = (typeof eu_cookie_compliance_cookie_name === 'undefined' || eu_cookie_compliance_cookie_name === '') ? 'cookie-agreed' : eu_cookie_compliance_cookie_name;
    var value = $.cookie(cookieName);
    value = parseInt(value);
    if (isNaN(value)) {
      value = null;
    }

    return value;
  };

  Backdrop.eu_cookie_compliance.changeStatus = function (value) {
    var status = Backdrop.eu_cookie_compliance.getCurrentStatus();
    var reloadPage = Backdrop.settings.eu_cookie_compliance.reload_page;
    if (status === value) {
      return;
    }

    if (Backdrop.settings.eu_cookie_compliance.popup_position) {
      $('.sliding-popup-top').animate({ top: $('#sliding-popup').outerHeight() * -1 }, Backdrop.settings.eu_cookie_compliance.popup_delay, function () {
        if (status === null && !reloadPage) {
          $('#sliding-popup').html(Backdrop.settings.eu_cookie_compliance.popup_html_agreed).animate({ top: 0 }, Backdrop.settings.eu_cookie_compliance.popup_delay);
          Backdrop.eu_cookie_compliance.attachHideEvents();
        }
        else if (status === 1) {
          $('#sliding-popup').trigger('eu_cookie_compliance_popup_close').remove();
        }
      });
    }
    else {
      $('.sliding-popup-bottom').animate({ bottom: $('#sliding-popup').outerHeight() * -1 }, Backdrop.settings.eu_cookie_compliance.popup_delay, function () {
        if (status === null && !reloadPage) {
          $('#sliding-popup').html(Backdrop.settings.eu_cookie_compliance.popup_html_agreed).animate({ bottom: 0 }, Backdrop.settings.eu_cookie_compliance.popup_delay);
          Backdrop.eu_cookie_compliance.attachHideEvents();
        }
        else if (status === 1) {
          $('#sliding-popup').trigger('eu_cookie_compliance_popup_close').remove();
        }
      });
    }

    if (reloadPage) {
      location.reload();
    }

    if (value === 2 && Backdrop.settings.eu_cookie_compliance.withdraw_enabled) {
      Backdrop.eu_cookie_compliance.createWithdrawBanner(Backdrop.settings.eu_cookie_compliance.withdraw_markup);
      Backdrop.eu_cookie_compliance.attachWithdrawEvents();
    }

    Backdrop.eu_cookie_compliance.setStatus(value);
  };

  Backdrop.eu_cookie_compliance.setStatus = function (status) {
    var date = new Date();
    var domain = Backdrop.settings.eu_cookie_compliance.domain ? Backdrop.settings.eu_cookie_compliance.domain : '';
    var path = Backdrop.settings.basePath;
    var cookieName = (typeof eu_cookie_compliance_cookie_name === 'undefined' || eu_cookie_compliance_cookie_name === '') ? 'cookie-agreed' : eu_cookie_compliance_cookie_name;
    if (path.length > 1) {
      var pathEnd = path.length - 1;
      if (path.lastIndexOf('/') === pathEnd) {
        path = path.substring(0, pathEnd);
      }
    }

    var cookieSession = parseInt(Backdrop.settings.eu_cookie_compliance.cookie_session);
    if (cookieSession) {
      $.cookie(cookieName, status, { path: path, domain: domain });
    }
    else {
      var lifetime = parseInt(Backdrop.settings.eu_cookie_compliance.cookie_lifetime);
      date.setDate(date.getDate() + lifetime);
      $.cookie(cookieName, status, { expires: date, path: path, domain: domain });
    }
    $(document).trigger('eu_cookie_compliance.changeStatus', [status]);

    // Store consent if applicable.
    if (Backdrop.settings.eu_cookie_compliance.store_consent && ((status === 1 && Backdrop.settings.eu_cookie_compliance.popup_agreed_enabled) || (status === 2  && !Backdrop.settings.eu_cookie_compliance.popup_agreed_enabled))) {
      var url = Backdrop.settings.basePath + Backdrop.settings.pathPrefix + 'eu-cookie-compliance/store_consent/banner';
      $.post(url, {}, function (data) { });
    }
  };

  Backdrop.eu_cookie_compliance.hasAgreed = function () {
    var status = Backdrop.eu_cookie_compliance.getCurrentStatus();
    return (status === 1 || status === 2);
  };

  Backdrop.eu_cookie_compliance.showBanner = function () {
    var showBanner = false;
    var status = Backdrop.eu_cookie_compliance.getCurrentStatus();
    if ((status === 0 && Backdrop.settings.eu_cookie_compliance.method === 'default') || status === null) {
      if (!Backdrop.settings.eu_cookie_compliance.disagree_do_not_show_popup || status === null) {
        showBanner = true;
      }
    }
    else if (status === 1 && Backdrop.settings.eu_cookie_compliance.popup_agreed_enabled) {
      showBanner = true;
    }

    return showBanner;
  };

  Backdrop.eu_cookie_compliance.cookiesEnabled = function () {
    var cookieEnabled = navigator.cookieEnabled;
    if (typeof navigator.cookieEnabled === 'undefined' && !cookieEnabled) {
      document.cookie = 'testCookie';
      cookieEnabled = (document.cookie.indexOf('testCookie') !== -1);
    }

    return cookieEnabled;
  };

  // This code upgrades the cookie agreed status when upgrading for an old version.
  Backdrop.eu_cookie_compliance.updateCheck = function () {
    var legacyCookie = 'cookie-agreed-' + Backdrop.settings.eu_cookie_compliance.popup_language;
    var domain = Backdrop.settings.eu_cookie_compliance.domain ? Backdrop.settings.eu_cookie_compliance.domain : '';
    var path = Backdrop.settings.basePath;
    var cookie = $.cookie(legacyCookie);
    var date = new Date();
    var cookieName = (typeof eu_cookie_compliance_cookie_name === 'undefined' || eu_cookie_compliance_cookie_name === '') ? 'cookie-agreed' : eu_cookie_compliance_cookie_name;

    // jQuery.cookie 1.0 (bundled with Backdrop) returns null,
    // jQuery.cookie 1.4.1 (bundled with some themes) returns undefined.
    // We had a 1.4.1 related bug where the value was set to 'null' (string).
    if (cookie !== undefined && cookie !== null && cookie !== 'null') {
      date.setDate(date.getDate() + parseInt(Backdrop.settings.eu_cookie_compliance.cookie_lifetime));
      $.cookie(cookieName, cookie, { expires: date, path:  path, domain: domain });

      // Use removeCookie if the function exists.
      if (typeof $.removeCookie !== 'undefined') {
        $.removeCookie(legacyCookie);
      }
      else {
        $.cookie(legacyCookie, null, { path: path, domain: domain });
      }
    }
  };

  // Load blocked scripts if the user has agreed to being tracked.
  var euCookieComplianceHasLoadedScripts = false;
  $(function () {
    if (Backdrop.eu_cookie_compliance.hasAgreed()
        || (Backdrop.eu_cookie_compliance.getCurrentStatus() === null && Backdrop.settings.eu_cookie_compliance.method !== 'opt_in')
    ) {
      euCookieComplianceLoadScripts();
      euCookieComplianceHasLoadedScripts = true;
    }
  });

  // Block cookies when the user hasn't agreed.
  Backdrop.behaviors.eu_cookie_compliance_popup_block_cookies = {
    initialized: false,
    attach: function (context, settings) {
      if (!Backdrop.behaviors.eu_cookie_compliance_popup_block_cookies.initialized && settings.eu_cookie_compliance) {
        Backdrop.behaviors.eu_cookie_compliance_popup_block_cookies.initialized = true;
        if ((settings.eu_cookie_compliance.method === 'opt_in' && (Backdrop.eu_cookie_compliance.getCurrentStatus() === null || !Backdrop.eu_cookie_compliance.hasAgreed()))
          || (settings.eu_cookie_compliance.method === 'opt_out' && !Backdrop.eu_cookie_compliance.hasAgreed() && Backdrop.eu_cookie_compliance.getCurrentStatus() !== null)
        ) {
          // Split the white-listed cookies.
          var euCookieComplianceWhitelist = settings.eu_cookie_compliance.whitelisted_cookies.split(/\r\n|\n|\r/g);

          // Add the EU Cookie Compliance cookie.
          euCookieComplianceWhitelist.push((typeof settings.eu_cookie_compliance.cookie_name === 'undefined' || settings.eu_cookie_compliance.cookie_name === '') ? 'cookie-agreed' : settings.eu_cookie_compliance.cookie_name);
          euCookieComplianceBlockCookies = setInterval(function () {
            // Load all cookies from jQuery.
            var cookies = $.cookie();

            // Check each cookie and try to remove it if it's not white-listed.
            for (var i in cookies) {
              var remove = true;
              var hostname = window.location.hostname;
              var cookieRemoved = false;
              var index = 0;

              // Skip the PHP session cookie.
              if (i.indexOf('SESS') === 0 || i.indexOf('SSESS') === 0) {
                remove = false;
              }

              // Check if the cookie is white-listed.
              for (var item in euCookieComplianceWhitelist) {
                if (i === euCookieComplianceWhitelist[item]) {
                  remove = false;
                }
              }

              // Remove the cookie if it's not white-listed.
              if (remove) {
                while (!cookieRemoved && hostname !== '') {
                  // Attempt to remove.
                  cookieRemoved = $.removeCookie(i, { domain: '.' + hostname, path: '/' });
                  if (!cookieRemoved) {
                    cookieRemoved = $.removeCookie(i, { domain: hostname, path: '/' });
                  }

                  index = hostname.indexOf('.');

                  // We can be on a sub-domain, so keep checking the main domain as well.
                  hostname = (index === -1) ? '' : hostname.substring(index + 1);
                }
              }
            }
          }, 5000);
        }
      }
    }
  }

})(jQuery);

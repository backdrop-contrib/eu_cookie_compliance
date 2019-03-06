EU Cookie Compliance
====================

The EU Cookie Compliance module enables a website to meet the
requirements of the EU Directive on Privacy and Electronic Communications
regarding the use of cookies.

If a website makes use of cookies other than for the temporary storage of
data while a transaction is in progress, the user must be informed and
given the opportunity to decline the use of cookies. The site must also
include an explanation of the cookies that are used.

This is a port from the Drupal module of the same name.

### How it works.

The module displays a pop-up at the bottom or at the top of pages to make
users aware of the fact that cookies are being set. The user may then give
his/her consent or move to a page that provides more details. Consent is given
by the user pressing the agree button or by continuing to browse the website.
Once consent is given another pop-up appears with a thank you message.

The module provides a settings page where the pop-up can be customised. There
are also template files for the pop-ups that can be overridden by your theme.

### Status

This is an initial (incomplete) port of the Drupal module.


Installation
------------

- Install this module using the official Backdrop CMS instructions at
  https://backdropcms.org/guide/modules.

- Visit the configuration page under Administration > Configuration > system >
  EU Cookie Compliance (admin/config/system/eu_cookie_compliance) and enter
  the required information.

- If desired, give the administer EU Cookie Compliance popup permissions that
  allow users of certain roles access the administration page. You can do so on
  the admin/user/permissions page.

    - There is also a 'display EU Cookie Compliance popup' permission that helps
      you show the popup to the roles you desire.

- You may want to create a page that would explain how your site uses cookies.
  Alternatively, if you have a privacy policy, you can link the pop-up to that
  page (see next step).

- If you want to customise the pop-up background and text color  type
  in the hex values. Once it exists, you can also use the
  [jQuery Colorpicker module](http://backdropcms.org/project/jquery_colorpicker).

- If you want to theme your pop-up override the themes in the template file.

- If you want to show the message in EU countries only, install the
  [GeoIP module](http://backdropcms.org/project/geoip] and enable that option on
  the settings page.

NOTICE: The module does not audit your cookies nor does it prevent cookies
from being set.

Documentation
-------------

Additional documentation is located in the Wiki:
https://github.com/backdrop-contrib/eu_cookie_compliance/wiki/Documentation.

Issues
------

Bugs and Feature requests should be reported in the Issue Queue:
https://github.com/backdrop-contrib/eu_cookie_compliance/issues.

Current Maintainers
-------------------

- Graham Oliver (https://github.com/Graham-72).
- Seeking additional maintainers.

Credits
-------

- Ported to Backdrop CMS by Betty Boop (https://github.com/username).
- Maintained for Drupal by Sven [Berg Ryen](https://drupal.org/u/svenryen).
- Maintained for Drupal by Sven [Marcin Pajdzik](https://drupal.org/u/marcin-pajdzik).
- Maintained for Drupal by Sven [Achton Smidt Winther](https://drupal.org/u/achton).
- Maintained for Drupal by Sven [id.tornado](https://drupal.org/u/id.tornado).
- Maintained for Drupal by Sven [mibfire](https://drupal.org/u/mibfire).

### Acknowledgement

This port to Backdrop would not, of course, be possible without all the work
done by the developers and maintainers of the Drupal module.

License
-------

This project is GPL v2 software. See the LICENSE.txt file in this directory for
complete text.

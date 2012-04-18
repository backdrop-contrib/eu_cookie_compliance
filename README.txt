EU Cookie Compliance 6.x - 1.x
==============================

This module intends to deal with the EU Directive on Privacy and Electronic Communications that comes into effect on 26th May 2012. More information can be found here
This module is intended for use with Drupal 6 and it is similar to the Cookie Control module developed for Drupal 7 but do not use any third party solution.
The module makes the user aware of the fact that cookies are being set by displaying a pop-up. The user may then give his/her consent or move to a page that provides more details.
The module provides a settings page where the pop-up can be customized. There is also a template file for the pop-up that can be overridden by your theme. 
Unlike the Cookie Control module, this module does not provide, at the moment, any functions for developers that that allow you to conditionally set cookies.

Installation
========
1. Unzip the files to the "sites/all/modules" directory and enable the module.
2. If desired, give the administer EU Cookie Compliance popup permissions that allow users of certain roles access the administration page. You can do so on the admin/user/permissions page.
3. You may want to create a page that would explain how your site uses cookies. Alternatively, if you have a privacy policy, you can link the pop-up to that page (see next step).
4. Go to the admin/settings/eu-cookie-compliance page to configure and enable the pop-up
5. If you want to theme your pop-up override the eu-cookie-compliance-popup.tpl.php template file.


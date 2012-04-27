<?php
/**
 * @file
 * This is a template file for a pop-up prompting user to give their consent for
 * the website to set cookies.
 *
 * When overriding this template it is important to note that jQuery will use
 * the following classes to assign actions to buttons:
 *
 * agree-button      - agree to setting cookies
 * find-more-button  - link to an information page
 * 
 * Variables available:
 * - $message:  Contains the text that will be display whithin the pop-up
 * - $link:     Contains a link to an information page (not used in the original 
 *              template as JQuery redirects to the information page on clinking
 *              the find-more button. $link is available though in case you want
 *              to overrride the template and display the link another way.
 */
?>

<div>
  <div class ="popup-content info">
    <div id="popup-text">
      <?php print $message ?>
    </div>
    <div id="popup-buttons">
      <button type="button" class="agree-button"><?php print t("Yes, I agree"); ?></button>
      <button type="button" class="find-more-button"><?php print t("No, I want to find out more"); ?></button>
    </div>
  </div>
</div>

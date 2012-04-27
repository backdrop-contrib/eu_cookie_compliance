<?php
/**
 * @file
 * This is a template file for a pop-up informing a user that he has already
 * agreed to cookies.
 *
 * When overriding this template it is important to note that jQuery will use
 * the following classes to assign actions to buttons:
 *
 * hide-popup-button - destroy the pop-up
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
  <div class ="popup-content agreed">
    <div id="popup-text">
      <?php print $message ?>
    </div>
    <div id="popup-buttons">
      <button type="button" class="hide-popup-button"><?php print t("Hide this message"); ?> </button>
      <button type="button" class="find-more-button" ><?php print t("More information on cookies"); ?></button>
    </div>
  </div>
</div>

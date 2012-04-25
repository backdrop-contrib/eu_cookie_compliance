<?php
/**
 * @file
 * This is a template file for a pop-up informing a user that he has already
 * agreed to cookies.
 *
 * When overriding this template it is important to note that jQuery will use
 * the following classes to assign actions to buttons:
 *
 * agree-button      - agree to setting cookies
 * hide-popup-button - destroy the pop-up
 * find-more-button  - link to information page
 */
?>

<div>
  <div class ="popup-content agreed">
    <div id="popup-text">
      <?php print $message ?>
    </div>
    <div id="popup-buttons">
      <button type="button" class="hide-popup-button"><?php t("Hide this message"); ?> </button>
      <button type="button" class="find-more-button" ><?php t("More information on cookies"); ?></button>
    </div>
  </div>
</div>

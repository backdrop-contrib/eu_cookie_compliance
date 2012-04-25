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
 * hide-popup-button - destroy the pop-up
 * find-more-button  - link to information page
 */
?>

<div>
  <div class ="popup-content info">
    <div id="popup-text">
      <?php print $message ?>
    </div>
    <div id="popup-buttons">
      <button type="button" class="agree-button"><?php t("Yes, I agree"); ?></button>
      <button type="button" class="find-more-button"><?php t("No, I want to find out more"); ?></button>
    </div>
  </div>
</div>

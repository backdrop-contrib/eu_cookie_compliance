<?php
/**
 * @file
 * Template for the EU Cookie Compliance pop-up.
 */
?>

<div>
  <div class ="popup-content">
    <h2><?php print $title ?></h2>
    <p><?php print $message ?></p>
    <div id="popup-buttons">
      <button type="button" onclick="javascript:eu_cookie_compliance_has_agreed()">Yes, I agree</button>
      <button type="button" <?php if ($link) : ?> onclick="window.location.href='<?php print $link ?>'" <?php endif ?> >No, I want to find out more</button>
    </div>
  </div>
</div>

<div>  
  <div class ="popup-content agreed">
    <div id="popup-text">
      <?php print $message ?>
    </div>
    <div id="popup-buttons">
      <button type="button" onclick="javascript:eu_cookie_compliance_has_agreed(2)">Hide this message</button>
      <button type="button" <?php if ($link) : ?> onclick="window.location.href='<?php print $link ?>'" <?php endif ?> >More information on cookies</button>
    </div>
  </div>
</div>
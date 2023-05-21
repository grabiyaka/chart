<?php

require "core.php";

post_check();

$db->q(" DELETE FROM events WHERE id='$id' ");
<?php

require "core.php";

post_check();

$db->q(" DELETE FROM persons WHERE id='$id' ");
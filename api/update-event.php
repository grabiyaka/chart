<?php

require "core.php";

post_check();

$db->q(" UPDATE events SET $input = '$value' WHERE id='$id' ");
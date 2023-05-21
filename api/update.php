<?php

require "core.php";

post_check();

$db->q(" UPDATE persons SET $input = '$value' WHERE id='$id' ");
<?php

require "core.php";

echo $db -> q("SELECT * FROM events") -> json();
<?php

require "core.php";

echo $db -> q("select * from persons") -> json();
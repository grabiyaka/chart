<?php

require "core.php";

post_check();

$db->q("INSERT into persons SET name='$name', born='$born', age='$age', sons='$sons',
 description='$description', parents='$parents' ");

echo to_json([
    "name"=> $name,
    "born" => $born,
    "age" => $age,
    "sons" => $sons,
    "description" => $description,
    "parents" => $parents
]);
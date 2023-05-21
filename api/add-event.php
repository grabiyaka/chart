<?php

require "core.php";

post_check();

$db->q("INSERT into events SET name_event='$name_event', start='$start', end='$end', text='$text',
 color='$color', opacity='$opacity' ");

echo to_json([
    "name_event"=> $name_event,
    "start" => $start,
    "end" => $end,
    "text" => $text,
    "color" => $color,
    "opacity" => $opacity
]);
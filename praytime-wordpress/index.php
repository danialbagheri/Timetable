<?php

/*
Plugin Name: Manchester PrayerTime
Plugin URI:
Description: This plugin is made for Manchester Islamic Centre.
Author: Danial Bagheri
Author URI: http://danialbagheri.com
Version: 0.1


*/



$connection = new SQLite('timetable.db');
// if ($connection) {
// 	echo "it worked!\n\n";
// }

$today = date("d/m");
$todayDate = (string)$today;

$sql = <<<HEREDOC
SELECT imsaak, sobh, sunrise, afternoon, sunset, maghrib, midnight
FROM manchester
where date = :date
HEREDOC;

$rs = $connection->prepare($sql);

$rs->bindValue(':date', $todayDate, SQLITE3_TEXT);
$result = $rs->execute();
global $result;

function praytime_shortcode_fn() { 
while($row = $result->fetchArray(SQLITE3_ASSOC)) {
  echo "امساک = ". $row['imsaak'] . "<br>";
  echo "صبح = ". $row['sobh'] ."<br>";
  echo "طلوع = ". $row['sunrise'] ."<br>";
  echo "ظهر = ".$row['afternoon'] ."<br>";
  echo "غروب = ".$row['sunset'] ."<br>";
  echo "مغرب = ".$row['maghrib'] ."<br>";
  echo "نیمه شب = ".$row['midnight'] ."<br>";
}


}

add_shortcode( 'praytime', 'praytime_shortcode_fn' );







?>
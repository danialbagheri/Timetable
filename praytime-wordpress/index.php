<?php

/*
Plugin Name: Manchester PrayerTime
Plugin URI:
Description: This plugin is made for Manchester Islamic Centre. Simply add [praytime] shortcode whereever you need the prayer timetable and it should appear.
Author: Danial Bagheri
Author URI: http://danialbagheri.com
Version: 0.1


*/

$host_name = 
$database = 
$user_name = 
$password = 

$connection = new mysqli($host_name, $user_name, $password, $database);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$today = date("d/m");
$todayDate = (string)$today;

$sql = str_replace("todaydate",$todayDate,"SELECT imsaak, sobh, sunrise, afternoon, sunset, maghrib, midnight FROM manchester WHERE date LIKE 'todaydate' ");

$rs = $connection->query($sql);

// $rs->bindParam(':date', $todayDate);
// $result = $rs->execute();


function praytime_shortcode_fn() { 
while($row = $GLOBALS['rs']->fetch_assoc()) {
  echo "<p style='text-align:centre;'>تاریخ امروز: ". date("d/m/y") ." </p>";
  echo "<table dir='rtl' style='width:100%;direction:rtl;background-color:#fff;text-align:right;'>";
  echo "<tr class='praytime'><th>امساک : </th><th>". $row['imsaak'] . "</th></tr>";
  echo "<tr class='praytime'><th>صبح : </th><th>". $row['sobh'] ."</th></tr>";
  echo "<tr class='praytime'><th>طلوع : </th><th>". $row['sunrise'] ."</th></tr>";
  echo "<tr class='praytime'><th>ظهر : </th><th>".$row['afternoon'] ."</th></tr>";
  echo "<tr class='praytime'><th>غروب : </th><th>".$row['sunset'] ."</th></tr>";
  echo "<tr class='praytime'><th>مغرب : </th><th>".$row['maghrib'] ."</th></tr>";
  echo "<tr class='praytime'><th>نیمه شب : </th><th>".$row['midnight'] ."</th></tr>";
  echo "</table>";
}


}

add_shortcode( 'praytime', 'praytime_shortcode_fn' );


// function praytime_shortcode_fn() { 
// while($row = $GLOBALS['rs']->fetch_assoc()) {
//   echo "<table style="width:100%">";
//   echo "<tr>امساک : ". $row['imsaak'] . "<br>";
//   echo "<tr>صبح : ". $row['sobh'] ."<br>";
//   echo "<tr>طلوع : ". $row['sunrise'] ."<br>";
//   echo "<tr>ظهر : ".$row['afternoon'] ."<br>";
//   echo "<tr>غروب : ".$row['sunset'] ."<br>";
//   echo "<tr>مغرب : ".$row['maghrib'] ."<br>";
//   echo "<tr>نیمه شب : ".$row['midnight'] ."<br>";
// }




?>

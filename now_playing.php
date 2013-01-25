<?php
header('Content-Type: application/json');

$d = date("w");

$out = array();

date_default_timezone_set("Europe/Copenhagen"); 

if (date("G") >= 20 && date("G") < 22) {
  $out["onair"] = true;
} else {
  $out["onair"] = false;
}

switch($d) {
	   case 0:
	   $out["title"] = "Radio Resistance CPH";
	   $out["cover"] = "covers/radioresistance.jpg";
	   break;
	   
	   
	   case 1:
	   $out["title"] = "SPOL OP! Radio";
	   $out["cover"] = "covers/spolopradio.jpg";
	   break;

	   case 2:
	   $out["title"] = "Sorte Får Radio";
	   $out["cover"] = "covers/sortefar.jpg";
	   break;

	   case 3:
	   $out["title"] = "Jazzhatten";
	   $out["cover"] = "covers/jazzhatten.jpg";
	   break;

	   case 4:
	   $out["title"] = "Radio Vendetta";
	   $out["cover"] = "covers/radiovendetta.jpg";
	   break;

	   case 4:
	   $out["title"] = "Ingen udsendelse";
	   $out["cover"] = "covers/offair.jpg";
	   break;

	   case 6:
	   $out["title"] = "Ingen udsendelse";
	   $out["cover"] = "covers/offair.jpg";
	   break;

	   case 3:
	   default:
           $out["onair"] = false;
	   $out["title"] = "Ingen udsendelse";
	   $out["cover"] = "covers/offair.jpg";
	   break;
}

print json_encode($out);
?>


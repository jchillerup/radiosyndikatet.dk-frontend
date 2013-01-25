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
           $out["flipside"] = file_get_contents('descriptions/radioresistance.html');
	   break;	   
	   
	   case 1:
	   $out["title"] = "SPOL OP! Radio";
	   $out["cover"] = "covers/spolopradio.jpg";
           $out["flipside"] = file_get_contents('descriptions/spolopradio.html');
	   break;

	   case 2:
	   $out["title"] = "Sorte Får Radio";
	   $out["cover"] = "covers/sortefar.jpg";
           $out["flipside"] = file_get_contents('descriptions/sortefar.html');
	   break;

	   case 3:
	   $out["title"] = "Jazzhatten";
	   $out["cover"] = "covers/jazzhatten.jpg";
           $out["flipside"] = file_get_contents('descriptions/jazzhatten.html');
	   break;

	   case 4:
	   $out["title"] = "Radio Vendetta";
	   $out["cover"] = "covers/radiovendetta.jpg";
           $out["flipside"] = file_get_contents('descriptions/radiovendetta.html');
           break;
             
	   case 6:
	   default:
           $out["onair"] = false;
	   $out["title"] = "Ingen udsendelse";
	   $out["cover"] = "covers/offair.jpg";
           $out["flipside"] = file_get_contents('descriptions/offair.html');
	   break;
}

print json_encode($out);
?>


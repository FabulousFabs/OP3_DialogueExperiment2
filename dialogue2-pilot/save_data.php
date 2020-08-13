<?php
// the $_REQUEST[] array will contain the passed in filename and data
// the directory "data" is writable by the server (chmod 770)
//date_default_timezone_set("Europe/Amsterdam");
//$datetime = date("Y-m-d_H:i:s", time());
//$filename = "data/".$datetime."_".$_REQUEST['filename'];
$filename = "data/".preg_replace( '/[^a-z0-9_\-\.]+/', '-', strtolower($_REQUEST['filename']) );
$data = $_REQUEST['data'];
file_put_contents($filename, $data.",\n", FILE_APPEND | LOCK_EX);
print("success");
?>

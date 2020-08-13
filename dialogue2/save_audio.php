<?php
// the $_REQUEST[] array will contain the passed in filename and data
// the directory "data" is writable by the server (chmod 770)
date_default_timezone_set("Europe/Amsterdam");
$datetime = date("Y-m-d_H-i-s", time());
$filename = "audio/".preg_replace( '/[^a-z0-9_\-\.]+/', '-', strtolower($_REQUEST['filename']) );
// pull the raw binary data from the POST array
$data = substr($_POST['data'], strpos($_POST['data'], ",") + 1);
// decode it
$decodedData = base64_decode($data);
// write the data out to the file
$fp = fopen($filename, 'wb');
fwrite($fp, $decodedData);
fclose($fp);
print("success");
?>

<html>
<body>

<?php

// location.txt has 2 lines: lat, and lng for my location

$myfile = fopen("location.txt", "w") or die("Unable to open file!");
fwrite($myfile, $_GET["lat"]."\n".$_GET["long"]);
fclose($myfile);

// echo "Set Location To ".$_GET["lat"]." ".$_GET["long"];

header( 'Location: http://davidrower.com/' );

?>

</body>
</html>

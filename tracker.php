<!DOCTYPE html>
<html lang="en">
<head>
  <title>Rower Tracker</title>
  <meta property="og:title"  content="Rower Tracker" /> 
  <meta name="description" content="Where am I? Now you know...">
  <meta charset="utf-8"> 
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <style>
    /* Always set the map height explicitly to define the size of the div
     * element that contains the map. */
    #map {
      height: 100%;
      width: 100%;
    }
    /* Optional: Makes the sample page fill the window. */
    html, body {
      height: 100%;
      margin: 0;
      padding: 0;
    }
  </style>
</head>

  <body>
    <?php 
      // location.txt has 2 lines: lat, and lng for my location
      $myfile = fopen("location.txt", "r") or die("Unable to open file!");
      for ($i = 0; $i < 2; $i++) {
        $line = fgets($myfile);
        if ($i == 0) {
          $latitude = $line;
        }
        if ($i == 1) {
          $longitude = $line;
        }
      }
      echo "latitude: $latitude \n";
      echo "longitude: $longitude \n";
      fclose($myfile)
    ?>
    <div id="map"></div>
    <script>
      var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });
        var pos = {
          lat: parseFloat(<?php echo json_encode($latitude); ?>),
          lng: parseFloat(<?php echo json_encode($longitude); ?>)
        };

        var image = 'http://davidrower.com/pictures/myFlag.png';
        var beachMarker = new google.maps.Marker({
          position: pos,
          map: map,
          icon: image
        });
        // var infoWindow;
        //infoWindow = new google.maps.InfoWindow;
        //infoWindow.setPosition(pos);
        //infoWindow.setContent('David is here!');
        //infoWindow.open(map);
        map.setCenter(pos);
      }

    </script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDJucrkLw6rhgbNb5MuAhKEdlHB9LhIrpA&callback=initMap">
    </script>
  </body>
</html>

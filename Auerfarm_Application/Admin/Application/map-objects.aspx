<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="map-objects.aspx.cs" Inherits="Auerfarm_Application.Admin.Anders.map_objects" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
<meta charset="utf-8"/>
	<link href="/Content/bootstrap.min.css" rel="stylesheet"/>
	<link href="/Content/style.css" rel="stylesheet"/>
    <meta name="viewport" content="initial-scale=1.0"/>
    <style>
          /* Always set the map height explicitly to define the size of the div
        * element that contains the map. */
          #map {
              height: 600px;
              width: 80%;
              align-content: center;
              margin-left: auto;
              margin-right: auto;
          }
    </style>
</head>
<body>
<form id="form1" runat="server">
	<nav class="navbar navbar-inverse navbar-fixed-top">
 			<div class="nav-image navbar-left">
 				<a href="index.html"><img src="/Content/auerfarm-logo.jpeg" alt="Auerfarm Logo"/></a>
 			</div>
   			<div class="nav-options navbar-left">
   			 	<ul class="nav navbar-nav">
 	     			<li><a class="hyper-nav" href="announcements.html">Announcements & News</a></li>
 	     			<li><a  class="hyper-nav" href="map-objects.aspx">Interactive Map</a></li>
    			</ul>
    		</div>
    		<div class="nav-welcome navbar-right">
   			 	<h3>Welcome Auerfarm Admin!</h3>
    		</div>
	</nav>

	<div class="container-fluid page-content">
		<div class="row page-title">
			<div class="col-md-2"></div>
			<div class="col-md-8">
				<h2>Interactive Map:</h2>
				<p>Below is the current map that will be displayed to mobile users. To add a new custom marker to 
                    the map, click the "Create a New Map Object" button below. To select a marker,
                    click the marker on the map and it will begin to bounce and the pop-up display that 
                    users will see on mobile will show. In order to Edit or delete an 
                    existing custom marker, press "Edit/Delete Selected Marker" after you have clicked a
                    marker and it is selcted, you will know it is selected when it is bouncing on the map.
				</p>
			</div>
			<div class="col-md-2"></div>
		</div>
        <br /> <br /> <br />
        <div id="map"></div>
        <script>
      var map;
      function initMap() {
          var currentMarker;
          var markers = JSON.parse('<%=ConvertDataTabletoString() %>');
          var auerfarm = {lat: 41.811224, lng: -72.774158};
          map = new google.maps.Map(document.getElementById('map'), {
              center: auerfarm,
              zoom: 18,
              mapTypeId: 'satellite'
          });
          var infoWindow = new google.maps.InfoWindow();
          var iconBase = "/Content/";
          var icons = {
              animal: {
                  icon: iconBase + "animal.png"
              },
              building: {
                  icon: iconBase + "building.png"
              },
              office: {
                  icon: iconBase + "office.png"
              },
              plant: {
                  icon: iconBase + "plant.png"
              },
              other: {
                  icon: iconBase + "other.png"
              }
           };
        for (i = 0; i < markers.length; i++) {
            var data = markers[i]
            var myLatlng = new google.maps.LatLng(data.lat, data.lng);
            var iconType = data.iconimg;
            var marker = new google.maps.Marker({
                position: myLatlng,
                icon: icons[iconType].icon,
                map: map
            });
            (function (marker, data) {

                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function (e) {
                    if (currentMarker && currentMarker != marker)
                    {
                        currentMarker.setAnimation(null);
                    }
                    currentMarker = marker;
                    document.getElementById("Hidden1").value = data.id;
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                    infoWindow.setContent("<h4 style='text-align:center'>" + data.title + "</h4>" +
                    "<img style='height:auto;width:auto;max-width:220px;max-height:125px;' src='/Images/" + data.mimg + "'>" +
                    "<p style='text-align:center'>" + data.description + "</p>");
                    infoWindow.open(map, marker);
                });
            })(marker, data);
        }
      }
        </script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBEIKQKPXffQ-lVn4p5FjI9sBjsb4GAGWQ&libraries=drawing&callback=initMap"
                async defer></script>
        <br /><br />
        <div class="row nav-button-row">
			<div class="col-md-2"></div>
			<div class="col-md-8">
				<a href="new-object.aspx">
					<button type="button" class="btn btn-default form-control">Create a New Map Object</button>
				</a>
			</div>
			<div class="col-md-2"></div>
		</div>
		<div class="row nav-button-row">
			<div class="col-md-2"></div>
			<div class="col-md-8">
					<button type="button" class="btn btn-default form-control" runat="server" onserverclick="edit_marker_clicked">
                        Edit / Delete Selected Marker
					</button>
			</div>
			<div class="col-md-2"></div>
		</div>
	</div>
    <input id="Hidden1" type="hidden" runat="server"/>
    </form>
</body>
</html>

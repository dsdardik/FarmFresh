<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="new-object.aspx.cs" Inherits="Auerfarm_Application.Admin.Anders.new_object" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <meta charset="utf-8"/>
	<link href="/Content/bootstrap.min.css" rel="stylesheet"/>
	<link href="/Content/style.css" rel="stylesheet"/>
	<meta name="viewport" content="width=device-width, initial-scale=1"/>
    <style>
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
 				<a href="index.html"><img src="/Content/auerfarm-logo.jpeg" alt="Auerfarm Logo"></a>
 			</div>
   			<div class="nav-options navbar-left">
   			 	<ul class="nav navbar-nav">
 	     			<li><a class="hyper-nav" href="announcements.html">Announcements & News</a></li>
 	     			<li><a  class="hyper-nav" href="map-objects.aspx">Interactive Map</a></li>
    			</ul>
    		</div>
    		<div class="nav-welcome navbar-right">
   			 	<h3>Welcome Admin!</h3>
    		</div>
	</nav>

	<div class="container-fluid page-content">
		<div class="row page-title">
			<div class="col-md-2"></div>
			<div class="col-md-8">
				<h2>Create a New Map Object:</h2>
                <h6>* = Required fields</h6>
			</div>
			<div class="col-md-2"></div>
		</div>

		<div class="row page-title">
			<div class="col-md-2"></div>
			<div class="col-md-8">
                <asp:Label ID="errorLabel" runat="server" Text="" Visible="False"></asp:Label>
			</div>
			<div class="col-md-2"></div>
		</div>

        <br /><br />
        <div id="map"></div>
        <script>
      var map;
      function initMap() {
          var auerfarm = { lat: 41.811224, lng: -72.774158 };
          map = new google.maps.Map(document.getElementById('map'), {
              center: auerfarm,
              zoom: 18,
              mapTypeId: 'satellite'
          });
          var drawingManager = new google.maps.drawing.DrawingManager({
              drawingMode: google.maps.drawing.OverlayType.MARKER,
              drawingControl: true,
              drawingControlOptions: {
                  position: google.maps.ControlPosition.BOTTOM_CENTER,
                  drawingModes: ['marker']
              },
              markerOptions:
              {
                  draggable: true,
              },
          });
          drawingManager.setMap(map);
          google.maps.event.addListener(drawingManager, 'markercomplete',
              function (marker) {
                  drawingManager.setOptions({
                      drawingControlOptions: {
                          drawingModes: []
                      }
                  });
                  drawingManager.setDrawingMode(null);
                  var point = marker.getPosition();
                  var x = point.lat();
                  var y = point.lng();
                  document.getElementById("Hidden1").value = x;
                  document.getElementById("Hidden2").value = y;
                  google.maps.event.addListener(marker, 'dragend', function (event)
                  {
                      var point = marker.getPosition();
                      var x = point.lat();
                      var y = point.lng();
                      document.getElementById("Hidden1").value = x;
                      document.getElementById("Hidden2").value = y; 
                  });
              });
           }
        </script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBEIKQKPXffQ-lVn4p5FjI9sBjsb4GAGWQ&libraries=drawing&callback=initMap"
                async defer></script>
        <br /><br />
		
		<hr />
        <div class="row input-row">
			<div class="col-md-2"></div>
			<div class="col-md-2">
				<h5 class="input-label">*Marker Type</h5>
			</div>
			<div class="col-md-6">
				<select class="selectpicker form-control" id="object_type_select" runat="server">
					<option value="other">Default Marker</option>
					<option value="animal">Animal</option>
					<option value="plant">Plant</option>
					<option value="building">Building</option>
					<option value="office">Office</option>
				</select>
			</div>
           
			<div class="col-md-2"></div>
		</div>
        <div class="row input-row">
			<div class="col-md-2"></div>
			<div class="col-md-2">
				<h5 class="input-label">*Map Label:</h5>
			</div>
			<div class="col-md-6">
				<input type="text" class="form-control object-name" runat="server" id="map_label" placeholder="" />
			</div>
			<div class="col-md-2"></div>
		</div>
        <div class="row input-row">
			<div class="col-md-2"></div>
			<div class="col-md-2">
				<h5 class="input-label">Object Description:</h5>
			</div>
			<div class="col-md-6">
				<input type="text" class="form-control object-description" runat="server" id="object_desc" />
			</div>
			<div class="col-md-2"></div>
		</div>
		<div class="row input-row">
			<div class="col-md-2"></div>
			<div class="col-md-2">
				<h5 class="input-label" runat="server">Pop-up Image:</h5>
			</div>
			<div class="col-md-6 center-input">
				<asp:FileUpload ID="marker_image" runat="server" />
			</div>
			<div class="col-md-2"></div>
		</div>
		<div class="row input-row">
			<div class="col-md-2"></div>
			<div class="col-md-8">
				<button type="button" class="btn btn-default" runat="server" onserverclick="submit_new_object_clicked">
                    Save and Create New Map Marker
				</button>
			</div>
			<div class="col-md-2"></div>
		</div>
	</div>
        <input id="Hidden1" type="hidden" runat="server"/>
        <input id="Hidden2" type="hidden" runat="server"/>
</form>
</body>
</html>
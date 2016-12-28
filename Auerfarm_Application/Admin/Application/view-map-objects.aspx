﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="view-map-objects.aspx.cs" Inherits="Auerfarm_Application.Admin.Anders.view_map_objects" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <meta charset="utf-8"/>
	<link href="/Content/bootstrap.min.css" rel="stylesheet"/>
	<link href="/Content/style.css" rel="stylesheet"/>
	<meta name="viewport" content="width=device-width, initial-scale=1"/>
</head>
<body>
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
				<h2>Map Objects:</h2>
				<p>Here you can view, edit, or remove current map objects.</p>
			</div>
			<div class="col-md-2"></div>
		</div>
		<div class="row page-sort">
			<div class="col-md-2"></div>
			<div class="col-md-2">
				<h56>Sort By:</h5>
			</div>
			<div class="col-md-6">
				<select class="selectpicker" id="object-sort-select" required>
					<option value="alph" selected>Alphabetical</option>
					<option value="datea">Date added (ascending)</option>
					<option value="dated">Date added (descending)</option>
				</select>
			</div>
			<div class="col-md-2"></div>
		</div>
		<hr />
		<div class="row row-eq-height object-select-row ">
			<div class="col-md-2"></div>
			<div class="col-md-2 ic ic-l">
				<image class="o-image" src="/Content/cow.jpg" alt="cow">
			</div>
			<div class="col-md-2 ic">
				<h4 class="o-name">Cows</h4>
			</div>
			<div class="col-md-2 ic">
				<h5 class="input-label">Date Added:</h5>
				<p>10/15/2016</p>
			</div>
			<div class="col-md-2 ic ic-r">
				<a class="o-action" href="edit-object-cow.html">edit</a>
				<a class="o-action">delete</a>
			</div>
			<div class="col-md-2"></div>
		</div>
		
	</div>
</body>
</html>
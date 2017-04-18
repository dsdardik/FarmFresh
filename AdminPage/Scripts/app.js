var gMapsLoaded = false;

$(document).ready(function () {
    /****************************************************************************************
    GOOGLE MAPS SCRIPTS
    ****************************************************************************************/
    window.gMapsCallback = function () {
        gMapsLoaded = true;
        $(window).trigger('gMapsLoaded');
    }

    window.loadGoogleMaps = function () {
        if (gMapsLoaded) { return window.gMapsCallback(); }
        var script_tag = document.createElement('script');
        script_tag.setAttribute("type", "text/javascript");
        script_tag.setAttribute("src", "http://maps.google.com/maps/api/js?key=AIzaSyBEIKQKPXffQ-lVn4p5FjI9sBjsb4GAGWQ&sensor=false&callback=gMapsCallback");
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
    }

    function initialize() {
        var map;
        var infowindow;
        var messagewindow;
        currentMarker = null;// = null;
        allMarkers = [];

        var auerfarm = { lat: 41.811224, lng: -72.774158 };
        var mapOptions = {
            center: auerfarm,
            zoom: 18,
            mapTypeId: 'satellite'
        };

        map = new google.maps.Map(document.getElementById('map'), mapOptions);

        objects = JSON.parse(GetMapObjects("none"));

        var iconBase = "/Content/";
        var icons = {
            animal: {
                icon: iconBase + "type-animal.png"
            },
            building: {
                icon: iconBase + "type-building.png"
            },
            plant: {
                icon: iconBase + "type-plant.png"
            },
            landmark: {
                icon: iconBase + "type-landmark.png"
            },
            trail: {
                icon: iconBase + "type-trail.png"
            },
            other: {
                icon: iconBase + "type-other.png"
            }
        };

       // console.log(objects);

        for (var i in objects) {
            var ob = objects[i];
            //console.log(ob);
            var long = parseFloat(ob.Long);
            var lat = parseFloat(ob.Lat)
            var pos = new google.maps.LatLng(lat, long);
            var mark = new google.maps.Marker({
                position: pos,
                map: map,
                icon: "/Content/" + ob.Type + ".png",
                draggable: true,
                id: i,
                type: ob.Type,
            });
            //console.log(mark);
            var infowindow;
            
            mark.addListener('mouseover', function () {
               // console.log(mark);
                infowindow = InfoContent(objects[this.id]);
                infowindow.open(map, this);
            });

            mark.addListener('mouseout', function () {
                infowindow.close();
            });

            mark.addListener('click', function () {
                currentMarker = this;
                CreateMapObject(this);
            });
            allMarkers.push(mark);
        }

        google.maps.event.addListener(map, 'click', function (event) {
            if ( !currentMarker) {
                //console.log(event.latLng);
                marker = new google.maps.Marker({
                    position: event.latLng,
                    map: map,
                    icon: "/Content/type-other.png",
                    draggable: true,
                    id: null,
                });

                currentMarker = marker;
                currentMarker.setAnimation(google.maps.Animation.BOUNCE);
                
                console.log(currentMarker);
                console.log("^marker");
                CreateMapObject(currentMarker);
            }
            else {
                $("#map-object-info").toggleClass('no-disp');
                currentMarker = null;
            }
        });
        //$(document).on('click', '.update-map-item', function (event) {
        //    //console.log(currentMarker);
        //    event.preventDefault();
        //    console.log("button clicked");
        //    AddMapObject(currentMarker);
        //});
    }

    $(document).on('click', '.update-map-item', function (event) {
        //console.log(currentMarker);
        event.preventDefault();
        c//onsole.log("button clicked");
        AddMapObject(currentMarker);
    });

    var InfoContent = function (ob) {
        //console.log(ob);
        var content = "<div><h5 class='ob-info-name'>" + ob.Name + "</h4> <div class='info-window-img'> <img src='Content/rafi-filler-pic.jpg' alt='placeholder-pic' /> </div> </div>";
        var infowindow = new google.maps.InfoWindow({
            content: content,
        });
        return infowindow;
    }

    var CreateMapObject = function(m){
        //console.log(m);
        //console.log(m.position);
        if (m.id != null) {
            var info = objects[m.id];
            $("#object-action").html("Update Object");
            $("#item-name").val(info.Name);
            $("#item-desc").val(info.Description);
            $("#item-type").val(info.Type);
            $(".update-map-item").attr('id', info.Id);
            $(".update-map-item").html("Update");
        }
        else {
            $("#object-action").html("Add Object");
            $("#item-name").val(null);
            $("#item-desc").val(null);
            $(".update-map-item").attr('id', null);
            $(".update-map-item").html("Add");
        }
        $("#map-object-info").toggleClass('no-disp');
        location.href = "#";
        location.href = "#map-object-info";
        //console.log($(".update-map-item").attr('id'));
    }

    var AddMapObject = function (m) {
        //console.log("adding map object");
        $(".update-map-item").disabled = true;
        var MapItem =
            {
                Id: $(".update-map-item").attr('id'),
                Type: $("#item-type").val(),
                Name: $("#item-name").val(),
                Description: $('#item-desc').val(),
                Long: m.position.lng(),
                Lat: m.position.lat(),
                Active: true,
            }
        $.ajax({
            type: "POST",
            url: "../../FarmInfo/AddMapObject",
            data: MapItem,
            success: function (response) {
                //console.log(response);
            },
            error: function (error) {
                console.log(response);
            }
        });
        LoadMap();
        $(".update-map-item").disabled = false;
    }

    var AddMapListObject = function (b) {
        var id = $(b).parent().parent().parent().attr('id');
        console.log(id);
        var MapItem =
            {
                Id: id,
                Type: $("#"+ id +" #item-type").val(),
                Name: $("#" + id + " #item-name").val(),
                Description: $("#" + id + ' #item-desc').val(),
                Active: true,
            }
        $.ajax({
            type: "POST",
            url: "../../FarmInfo/AddMapObject",
            data: MapItem,
            success: function (response) {
                //console.log(response);
                $("#" + id).css("background-color : green");
            },
            error: function (error) {
                console.log(response);
            }
        });
    }

    $(document).on('click', '.update-map-list-item', function (event) {
        //console.log(currentMarker);
        event.preventDefault();
        //console.log("button clicked");
        AddMapListObject(this);
    });

    var GetMapObjects = function (filter) {
        //console.log("started");
        var res;
        $.ajax({
            type: "POST",
            url: "../../Home/GetMapObjects",
            data: { 'filter': filter },
           // dataType: "json",
            async: false,
            success: function (response) {
                //console.log(response);
                res = response;
            }
        });
        return res;
    }

    $(document).on("click", "#map-list-view", function (event) {
        event.preventDefault();
        LoadMapList("none");
    });

    $(document).on("click", "#map-map-view", function (event) {
        event.preventDefault();
        LoadMap(false);
    });

    $(document).on("change", "#map-filter", function (event) {
        event.preventDefault();
        var filter = $(this).val();
        //console.log("filter: " + filter);
        //console.log(allMarkers);
        for (var key in allMarkers) {
            var mark = allMarkers[key];
            //console.log(mark.type);
            mark.setVisible(true);
            if (mark.type != filter && filter != "none")
                mark.setVisible(false);
        }
    });

    $(document).on('change', '#map-list-filter', function (event) {
        event.preventDefault();
        var filter = $(this).val();
        //console.log(filter);
        LoadMapList(filter);
    });

    function LoadMapList(filter) {
        $.ajax({
            type: "POST",
            url: "Home/LoadMapList",
            data: { 'filter': filter },
            success: function (response) {
                $("#content").html(response);
                //var selects = $(".map-list-items #item-type").each(function () { $(this).val($(this).attr('name')); });
                $(".map-list-items #item-type").each(function () { $(this).val($(this).attr('name')); });
                //console.log(selects);
                //for (item in selects) {
                //    console.log(item);
                //    var type = $(item).attr('name');
                //    $(item).val(type);
                //}
                $("#map-list-filter").val(filter);
            }
        });
    }

    /****************************************************************************************
    MENU SCRIPTS
    ****************************************************************************************/
    function CollapseMenu() {
        $(".menu-container").animate({ width: "0px" }, 800, function () {
            $(".menu-container").addClass("no-disp");
        });
    }

    function LoadNews(menu) {
        $.ajax({
            type: "GET",
            url: "Home/LoadNews",
            success: function (response) {
                $(".selected-op").removeClass("selected-op");
                $("#content").html(response);
                $("#news-op").toggleClass("selected-op");
            }
        }).done(function () { if (menu) { CollapseMenu() } });
    }

    $(document).on("click", "#news-op", function (event) {
        event.preventDefault();
        LoadNews(false);
    });

    $(document).on("click", "#menu-op-news", function (event) {
        event.preventDefault();
        LoadNews(true);
    });

    function LoadCalendar(menu) {
        $.ajax({
            type: "GET",
            url: "Home/LoadCalendar",
            success: function (response) {
                $(".selected-op").removeClass("selected-op");
                $("#content").html(response);
                $("#calendar-op").toggleClass("selected-op");
            }
        }).done(function () {if (menu) { CollapseMenu(); } });
    }

    $(document).on("click", "#calendar-op", function (event) {
        event.preventDefault();
        LoadCalendar(false);
    });

    $(document).on("click", "#menu-op-calendar", function (event) {
        event.preventDefault();
        LoadCalendar(true);
    });

    function LoadMap(menu) {
        $.ajax({
            type: "GET",
            url: "Home/LoadMap",
            success: function (response) {
                $(".selected-op").removeClass("selected-op");
                $("#content").html(response);
                $("#map-op").toggleClass("selected-op");
                $(window).bind('gMapsLoaded', initialize); window.loadGoogleMaps();
            }
        }).done(function () { if (menu) { CollapseMenu() } });
    }


    $(document).on("click", "#map-op", function (event) {
        event.preventDefault();
        LoadMap(false);
    });

    $(document).on("click", "#menu-op-map", function (event) {
        event.preventDefault();
        LoadMap(true);
    });

    function LoadShop(menu) {
        $.ajax({
            type: "GET",
            url: "Home/LoadShop",
            success: function (response) {
                $(".selected-op").removeClass("selected-op");
                $("#content").html(response);
                $("#shop-op").toggleClass("selected-op");
            }
        }).done(function () { if (menu) { CollapseMenu() } });
    }

    $(document).on("click", "#shop-op", function (event) {
        event.preventDefault();
        LoadShop(false);
    });

    $(document).on("click", "#menu-op-shop", function (event) {
        event.preventDefault();
        LoadShop(true);
    });

    $(document).on("click", ".nav-image img", function () {
        $(".menu-container").removeClass("no-disp");
        $(".menu-container").animate({ width: "100vw" }, 800, function () { $("#content").html(null); });
    });

    /****************************************************************************************
    NEWS/Calendar SCRIPTS
    ****************************************************************************************/
    //Add new item div when user clicks new-news-item
    $(document).on("click", "#new-info-item", function (event) {
        event.preventDefault();
        $(".item-list").prepend('<div class="info-item-container container-fluid new-item" ><div class="row"><div class="col-xs-2"><div class="info-item-image"><img src="~/Content/rafi-filler-pic.jpg" alt="placeholder-pic" /></div></div><div class="col-xs-10 @*beside-img*@"><div class="split-content"><div class="left-content"><div class="ti-label inline-block"><h6>Title:</h6></div><input type="text" class="inline-block form-control" id="item-title"></div><div class="right-content"><div class="ti-label inline-block"><h6>Date:</h6></div><input type="text" class="inline-block form-control" id="item-date"></div></div><div class="ti-label inline-block"><h6>Description:</h6></div><textarea class="inline-block form-control" id="item-desc"></textarea><div class="split-content"><div class="left-content"><div class="ti-label inline-block"><h6>Post Date:  </h6></div><input type="text" class="form-control  inline-block" id="item-post-date"></div><div class="right-content"><div class="ti-label inline-block"><h6>Hide Date:  </h6></div><input type="text" class="form-control inline-block" id="item-remove-date"></div></div></div></div><button type="button" class="form-control" id="submit-new-item">Save Item</button></div>');
    });

    function AddInfoItem(farmInfoItem) {
        var page = farmInfoItem.Type;
        $.ajax({
            type: "POST",
            url: "../../FarmInfo/AddInfoItem",
            data: farmInfoItem,
            success: function (response) {
                console.log(response);
            }
        }).done(function () { if (page == "news") { LoadNews(false); } else { LoadCalendar(false); } });
    }

    $(document).on("click", "#submit-new-item", function (event) {
        event.preventDefault();
        var FarmInfoItem = {
            Id: null,
            Type: $("input[name=item-type]").val(),
            Title: $(".new-item #item-title").val(),
            Description: $(".new-item #item-desc").val(),
            Date: $(".new-item #item-date").val(),
            StartDate: $(".new-item #item-post-date").val(),
            EndDate: $(".new-item #item-remove-date").val(),
        }
        AddInfoItem(FarmInfoItem);
    });

    function UpdateInfoItem(farmInfoItem) {
        $.ajax({
            type: "POST",
            url: "../../FarmInfo/UpdateInfoItem",
            data: farmInfoItem,
            success: function (response) {
                console.log(response);
            }
        });
    }

    $(document).on("click", ".update-item", function (event) {
        event.preventDefault();
        var item = "#" + $(this).attr("id");
        var FarmInfoItem = {
            Id: $(this).attr("id"),
            Type: $("input[name=item-type]").val(),
            Title: $(item + " #item-title").val(),
            Description: $(item + " #item-desc").val(),
            Date: $(item + " #item-date").val(),
            StartDate: $(item + " #item-post-date").val(),
            EndDate: $(item + " #item-remove-date").val(),
        }
        UpdateInfoItem(FarmInfoItem);
    });
});
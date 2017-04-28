var gMapsLoaded = false;

$(document).ready(function () {
    /****************************************************************************************
    GOOGLE MAPS SCRIPTS
    ****************************************************************************************/
    window.gMapsCallback = function () {
        gMapsLoaded = true;
        $(window).trigger('gMapsLoaded');
    };

    window.loadGoogleMaps = function () {
        if (gMapsLoaded) { return window.gMapsCallback(); }
        var script_tag = document.createElement('script');
        script_tag.setAttribute("type", "text/javascript");
        script_tag.setAttribute("src", "http://maps.google.com/maps/api/js?key=AIzaSyBEIKQKPXffQ-lVn4p5FjI9sBjsb4GAGWQ&sensor=false&callback=gMapsCallback");
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
    };

    function initialize() {
        var map;
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
            var lat = parseFloat(ob.Lat);
            var pos = new google.maps.LatLng(lat, long);
            var mark = new google.maps.Marker({
                position: pos,
                map: map,
                icon: "/Content/" + ob.Type + ".png",
                draggable: true,
                id: i,
                type: ob.Type
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
                    id: null
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
        //console.log("button clicked");
        AddMapObject(currentMarker);
    });

    var InfoContent = function (ob) {
        //console.log(ob);
        var content = "<div><h5 class='ob-info-name'>" + ob.Name + "</h4> <div class='info-window-img'> <img src='Content/rafi-filler-pic.jpg' alt='placeholder-pic' /> </div> </div>";
        var infowindow = new google.maps.InfoWindow({
            content: content
        });
        return infowindow;
    };

    var CreateMapObject = function (m) {
        //console.log(m);
        //console.log(m.position);
        if (m.id !== null) {
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
    };

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
                Active: true
            };
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
    };

    var AddMapListObject = function (b) {
        var id = $(b).parent().parent().parent().attr('id');
        console.log(id);
        var MapItem =
            {
                Id: id,
                Type: $("#" + id + " #item-type").val(),
                Name: $("#" + id + " #item-name").val(),
                Description: $("#" + id + ' #item-desc').val(),
                Active: true
            };
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
    };

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
    };

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
            if (mark.type !== filter && filter !== "none")
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
        }).done(function () { if (menu) { CollapseMenu(); } });
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
        }).done(function () { if (menu) { CollapseMenu(); } });
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
        }).done(function () { if (menu) { CollapseMenu(); } });
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
        LoadItem();
    });

    function LoadItem() {
        $.ajax({
            type: "GET",
            url: "Home/LoadItem",
            success: function (response) {
                $(".selected-op").removeClass("selected-op");
                $("#item").html(response);
                $("#news-op").toggleClass("selected-op");
            }
        });
    };

    function LoadEditItem(id) {
        $.ajax({
            type: "GET",
            url: "Home/LoadEditItem",
            data: {id: id},
            success: function (response) {
                $(".selected-op").removeClass("selected-op");
                $("#item").html(response);
                $("#news-op").toggleClass("selected-op");
            }
        });
    };

    //$('#datetimepicker').datetimepicker();

    function AddInfoItem(farmInfoItem) {
        var page = farmInfoItem.Type;
        $.ajax({
            type: "POST",
            url: "/FarmInfo/AddInfoItem",
            data: farmInfoItem,
            success: function (response) {
                console.log(response);
            }
        }).done(function () { if (page === "news") { LoadNews(false); } else { LoadCalendar(false); } });
    };

    $(document).on("click", "#submit-new-item", function (event) {
        event.preventDefault();
        //var fullPath = document.getElementById('#item-image')[0].files[0];
        //debugger;
        var FarmInfoItem = {
            Id: null,
            Type: $("input[name=item-type]").val(),
            Title: $(".new-item #item-title").val(),
            Description: $(".new-item #item-desc").val(),
            Date: $(".new-item #item-date").val(),
            StartDate: $(".new-item #item-post-date").val(),
            EndDate: $(".new-item #item-remove-date").val(),
            Image: "rafi-filler-pic.jpg"
        };
        //var formData = new FormData(FarmInfoItem);
        //formData.append($(".new-item #item-image"));
        AddInfoItem(FarmInfoItem);
    });

    function UpdateInfoItem(farmInfoItem) {
        $.ajax({
            type: "POST",
            url: "/FarmInfo/UpdateInfoItem",
            data: farmInfoItem,
            success: function (response) {
                console.log(response);
            }
        });
    };

    $(document).on("click", ".update-item", function (event) {
        event.preventDefault();
        
        var item = "#" + $(this).attr("id");
        var FarmInfoItem = {
            Id: $(this).attr("id"),
            Type: $("input[name=item-type]").val(),
            Title: $("#item-edit #item-title").val(),
            Description: $("#item-edit #item-desc").val(),
            Date: $("#item-edit #item-date").val(),
            StartDate: $("#item-edit #item-post-date").val(),
            EndDate: $("#item-edit #item-remove-date").val()
        };
        $("#item form").remove();
        UpdateInfoItem(FarmInfoItem);
    });

    $(document).on("click", ".delete-item", function (event) {
        event.preventDefault();
        var id = $(this).attr("id");
        $(this).remove();
        DeleteInfoItem(id);
    });

    function DeleteInfoItem(id) {
        $.ajax({
            type: "POST",
            url: "/FarmInfo/DeleteInfoItem",
            data: {id: id},
            success: function (response) {
                console.log(response);
            }
        });
    };

    $(document).on("click", "#cancel-item", function (event) {
        event.preventDefault();
        $("#item form").remove();
    });

    $(document).on("click", ".edit-item", function (event) {
        event.preventDefault();
        var id = $(this).attr("id");
        $(this).remove();
        LoadEditItem(id);
    });

    /****************************************************************************************
    Product SCRIPTS
    ****************************************************************************************/
    //Add new item div when user clicks new-news-item
        $(document).on("click", "#new-product", function (event) {
            event.preventDefault();
            LoadProduct();
        });

    function LoadProduct() {
        $.ajax({
            type: "GET",
            url: "Home/LoadProduct",
            success: function (response) {
                $(".selected-op").removeClass("selected-op");
                $("#item").html(response);
                $("#news-op").toggleClass("selected-op");
            }
        });
    };

    function LoadEditProduct(id) {
        $.ajax({
            type: "GET",
            url: "Home/LoadEditProduct",
            data: {id: id},
            success: function (response) {
                $(".selected-op").removeClass("selected-op");
                $("#item").html(response);
                $("#news-op").toggleClass("selected-op");
            }
        });
    };

    //$('#datetimepicker').datetimepicker();

    function AddProduct(Product) {
        $.ajax({
            type: "POST",
            url: "/FarmInfo/AddProduct",
            data: Product,
            success: function (response) {
                console.log(response);
            }
        }).done(function () { LoadShop(false); });
    };

    $(document).on("click", "#submit-new-product", function (event) {
        event.preventDefault();
        //var fullPath = document.getElementById('#item-image')[0].files[0];
        //debugger;
        var Product = {
            Id: null,
            Name: $(".new-product #item-title").val(),
            Description: $(".new-product #item-desc").val(),
            Date: $(".new-product #item-date").val(),
            Price: $(".new-product #item-price").val(),
            Image: "rafi-filler-pic.jpg"
        };
        //var formData = new FormData(FarmInfoItem);
        //formData.append($(".new-item #item-image"));
        AddProduct(Product);
    });

    function UpdateProduct(Product) {
        $.ajax({
            type: "POST",
            url: "/FarmInfo/UpdateProduct",
            data: Product,
            success: function (response) {
                console.log(response);
            }
        });
    };

    $(document).on("click", ".update-item", function (event) {
        event.preventDefault();
        
        var item = "#" + $(this).attr("id");
        var Product = {
            Id: $(this).attr("id"),
            Name: $("#item-edit #item-title").val(),
            Description: $("#item-edit #item-desc").val(),
            Date: $("#item-edit #item-date").val(),
            Price: $("#item-edit #item-price").val()
        };
        $("#item form").remove();
        UpdateInfoItem(Product);
    });

    $(document).on("click", ".delete-product", function (event) {
        event.preventDefault();
        var id = $(this).attr("id");
        $('#product-edit').remove();
        DeleteProduct(id);
    });

    function DeleteProduct(id) {
        $.ajax({
            type: "POST",
            url: "/FarmInfo/DeleteProduct",
            data: {id: id},
            success: function (response) {
                console.log(response);
            }
        });
    };

    $(document).on("click", "#cancel-product", function (event) {
        event.preventDefault();
        $("#item form").remove();
    });

    $(document).on("click", ".edit-product", function (event) {
        event.preventDefault();
        var id = $(this).attr("id");
        $(this).remove();
        LoadEditProduct(id);
    });


jQuery(function ($) {
    "use strict";
    // -------------------------------------------------------------
    //   Basic Navigation
    // -------------------------------------------------------------
    (function () {
        var $frame = $("#basic");
        var $slidee = $frame.children("ul").eq(0);
        var $wrap = $frame.parent();

        // Call Sly on frame
        $frame.sly({
            horizontal: 1,
            itemNav: "basic",
            smart: 1,
            activateOn: "click",
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            startAt: 3,
            scrollBar: $wrap.find(".scrollbar"),
            scrollBy: 1,
            pagesBar: $wrap.find(".pages"),
            activatePageOn: "click",
            speed: 300,
            elasticBounds: 1,
            easing: "easeOutExpo",
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,

            // Buttons
            forward: $wrap.find(".forward"),
            backward: $wrap.find(".backward"),
            prev: $wrap.find(".prev"),
            next: $wrap.find(".next"),
            prevPage: $wrap.find(".prevPage"),
            nextPage: $wrap.find(".nextPage")
        });

        // To Start button
        $wrap.find(".toStart").on("click", function () {
            var item = $(this).data("item");
            // Animate a particular item to the start of the frame.
            // If no item is provided, the whole content will be animated.
            $frame.sly("toStart", item);
        });

        // To Center button
        $wrap.find(".toCenter").on("click", function () {
            var item = $(this).data("item");
            // Animate a particular item to the center of the frame.
            // If no item is provided, the whole content will be animated.
            $frame.sly("toCenter", item);
        });

        // To End button
        $wrap.find(".toEnd").on("click", function () {
            var item = $(this).data("item");
            // Animate a particular item to the end of the frame.
            // If no item is provided, the whole content will be animated.
            $frame.sly("toEnd", item);
        });

        // Add item
        $wrap.find(".add").on("click", function () {
            $frame.sly("add", "<li>" + $slidee.children().length + "</li>");
        });

        // Remove item
        $wrap.find(".remove").on("click", function () {
            $frame.sly("remove", -1);
        });
    })();

    // -------------------------------------------------------------
    //   Centered Navigation
    // -------------------------------------------------------------
    (function () {
        var $frame = $("#centered");
        var $wrap = $frame.parent();

        // Call Sly on frame
        $frame.sly({
            horizontal: 1,
            itemNav: "centered",
            smart: 1,
            activateOn: "click",
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            startAt: 4,
            scrollBar: $wrap.find(".scrollbar"),
            scrollBy: 1,
            speed: 300,
            elasticBounds: 1,
            easing: "easeOutExpo",
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,

            // Buttons
            prev: $wrap.find(".prev"),
            next: $wrap.find(".next")
        });
    })();

    // -------------------------------------------------------------
    //   Force Centered Navigation
    // -------------------------------------------------------------
    (function () {
        var $frame = $("#forcecentered");
        var $wrap = $frame.parent();

        // Call Sly on frame
        $frame.sly({
            horizontal: 1,
            itemNav: "forceCentered",
            smart: 1,
            activateMiddle: 1,
            activateOn: "click",
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            startAt: 0,
            scrollBar: $wrap.find(".scrollbar"),
            scrollBy: 1,
            speed: 300,
            elasticBounds: 1,
            easing: "easeOutExpo",
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,

            // Buttons
            prev: $wrap.find(".prev"),
            next: $wrap.find(".next")
        });
    })();

    // -------------------------------------------------------------
    //   Cycle By Items
    // -------------------------------------------------------------
    (function () {
        var $frame = $("#cycleitems");
        var $wrap = $frame.parent();

        // Call Sly on frame
        $frame.sly({
            horizontal: 1,
            itemNav: "basic",
            smart: 1,
            activateOn: "click",
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            startAt: 0,
            scrollBar: $wrap.find(".scrollbar"),
            scrollBy: 1,
            speed: 300,
            elasticBounds: 1,
            easing: "easeOutExpo",
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,

            // Cycling
            cycleBy: "items",
            cycleInterval: 1000,
            pauseOnHover: 1,

            // Buttons
            prev: $wrap.find(".prev"),
            next: $wrap.find(".next")
        });

        // Pause button
        $wrap.find(".pause").on("click", function () {
            $frame.sly("pause");
        });

        // Resume button
        $wrap.find(".resume").on("click", function () {
            $frame.sly("resume");
        });

        // Toggle button
        $wrap.find(".toggle").on("click", function () {
            $frame.sly("toggle");
        });
    })();

    // -------------------------------------------------------------
    //   Cycle By Pages
    // -------------------------------------------------------------
    (function () {
        var $frame = $("#cyclepages");
        var $wrap = $frame.parent();

        // Call Sly on frame
        $frame.sly({
            horizontal: 1,
            itemNav: "basic",
            smart: 1,
            activateOn: "click",
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            startAt: 0,
            scrollBar: $wrap.find(".scrollbar"),
            scrollBy: 1,
            pagesBar: $wrap.find(".pages"),
            activatePageOn: "click",
            speed: 300,
            elasticBounds: 1,
            easing: "easeOutExpo",
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,

            // Cycling
            cycleBy: "pages",
            cycleInterval: 1000,
            pauseOnHover: 1,
            startPaused: 1,

            // Buttons
            prevPage: $wrap.find(".prevPage"),
            nextPage: $wrap.find(".nextPage")
        });

        // Pause button
        $wrap.find(".pause").on("click", function () {
            $frame.sly("pause");
        });

        // Resume button
        $wrap.find(".resume").on("click", function () {
            $frame.sly("resume");
        });

        // Toggle button
        $wrap.find(".toggle").on("click", function () {
            $frame.sly("toggle");
        });
    })();

    // -------------------------------------------------------------
    //   One Item Per Frame
    // -------------------------------------------------------------
    (function () {
        var $frame = $("#oneperframe");
        var $wrap = $frame.parent();

        // Call Sly on frame
        $frame.sly({
            horizontal: 1,
            itemNav: "forceCentered",
            smart: 1,
            activateMiddle: 1,
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            startAt: 0,
            scrollBar: $wrap.find(".scrollbar"),
            scrollBy: 1,
            speed: 300,
            elasticBounds: 1,
            easing: "easeOutExpo",
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,

            // Buttons
            prev: $wrap.find(".prev"),
            next: $wrap.find(".next")
        });
    })();

    // -------------------------------------------------------------
    //   Crazy
    // -------------------------------------------------------------
    (function () {
        var $frame = $("#crazy");
        var $slidee = $frame.children("ul").eq(0);
        var $wrap = $frame.parent();

        // Call Sly on frame
        $frame.sly({
            horizontal: 1,
            itemNav: "basic",
            smart: 1,
            activateOn: "click",
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            startAt: 3,
            scrollBar: $wrap.find(".scrollbar"),
            scrollBy: 1,
            pagesBar: $wrap.find(".pages"),
            activatePageOn: "click",
            speed: 300,
            elasticBounds: 1,
            easing: "easeOutExpo",
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,

            // Buttons
            forward: $wrap.find(".forward"),
            backward: $wrap.find(".backward"),
            prev: $wrap.find(".prev"),
            next: $wrap.find(".next"),
            prevPage: $wrap.find(".prevPage"),
            nextPage: $wrap.find(".nextPage")
        });

        // To Start button
        $wrap.find(".toStart").on("click", function () {
            var item = $(this).data("item");
            // Animate a particular item to the start of the frame.
            // If no item is provided, the whole content will be animated.
            $frame.sly("toStart", item);
        });

        // To Center button
        $wrap.find(".toCenter").on("click", function () {
            var item = $(this).data("item");
            // Animate a particular item to the center of the frame.
            // If no item is provided, the whole content will be animated.
            $frame.sly("toCenter", item);
        });

        // To End button
        $wrap.find(".toEnd").on("click", function () {
            var item = $(this).data("item");
            // Animate a particular item to the end of the frame.
            // If no item is provided, the whole content will be animated.
            $frame.sly("toEnd", item);
        });

        // Add item
        $wrap.find(".add").on("click", function () {
            $frame.sly("add", "<li>" + $slidee.children().length + "</li>");
        });

        // Remove item
        $wrap.find(".remove").on("click", function () {
            $frame.sly("remove", -1);
        });
    })();
});
});
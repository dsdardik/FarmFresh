$(document).ready( function() {

    function CollapseMenu() {
        $(".menu-container").animate({ width: "0px"}, 800, function () {
            $(".menu-container").addClass("no-disp");
            console.log("clled back");
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
        }).done(function () { if (menu) { CollapseMenu() }});
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
        }).done(function () { if (menu) { CollapseMenu() } });
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
        $(".menu-container").animate({ width: "100vw" }, 800, function(){$("#content").html(null);});
    });


});
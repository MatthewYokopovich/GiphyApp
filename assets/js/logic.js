var topics = ["cat", "dog"];
var limit = 10;
var idfix = 0;
var ids = [];



function generateButtons() {
    $("#btnrow").empty();
    console.log("generate buttons");
    for (var i = 0; i < topics.length; i++) {
        var newbut = $("<button>");
        newbut.addClass("tag");
        newbut.attr("data-name", topics[i]);
        newbut.text(topics[i]);
        $("#btnrow").append(newbut);
    }
}

function display(tagstr) {
    var queryurl = 'https://api.giphy.com/v1/gifs/search?q=' + tagstr + '&limit=' + limit + '&api_key=S6mnLoC0b3UsNPPt5Xg3bDY2XAXQux8P';
    console.log(queryurl);
    $.ajax({
        url: queryurl,
        method: "GET"
    }).then(function (response) {
        console.log(response.data);
        var wasdupe = 0;
        response.data.forEach(function (element) {
            if (ids.includes(element.id)) {
                wasdupe += 1;
            } else {
                ids.push(element.id);
                var newdiv = $("<div>");
                var newstr = $("<p>");
                newstr.text("Rating: "+element.rating);
                newdiv.append(newstr);
                var newimg = $("<img>").attr("src", element.images.fixed_height_still.url);
                newimg.attr("data-still", element.images.fixed_height_still.url);
                newimg.attr("data-animate", element.images.fixed_height.url)
                newimg.attr("data-state", "still");
                newimg.addClass("giphy-image");
                newdiv.append(newimg);
                newdiv.addClass("giphy-div");
                $("#imgrow").append(newdiv);
                idfix = 0;
            }
        });
        if (wasdupe > 1) {
            idfix += wasdupe;
            var queryurl = 'https://api.giphy.com/v1/gifs/search?q=' + tagstr + '&limit=' + (limit + idfix) + '&api_key=S6mnLoC0b3UsNPPt5Xg3bDY2XAXQux8P';
            console.log(queryurl);
            $.ajax({
                url: queryurl,
                method: "GET"
            }).then(function (response2) {
                response2.data.forEach(function (element2) {
                    if (ids.includes(element2.id)) {

                    } else {
                        ids.push(element2.id);
                        var newdiv = $("<div>");
                        var newstr = $("<p>");
                        newstr.text("Rating: "+element2.rating);
                        newdiv.append(newstr);
                        var newimg = $("<img>").attr("src", element2.images.fixed_height_still.url);
                        newimg.attr("data-still", element2.images.fixed_height_still.url);
                        newimg.attr("data-animate", element2.images.fixed_height.url)
                        newimg.attr("data-state", "still");
                        newdiv.append(newimg);
                        newdiv.addClass("giphy-div");
                        $("#imgrow").append(newdiv);
                    }
                });
            });
        }
    });
}

function addTag(newTag) {
    topics.push(newTag);
    generateButtons();
}

$(window).on("load", function () {
    generateButtons();
    $(document).on("click", ".tag", function () {
        display($(this).text());
    });

    $(document).on("click", "#add-tag", function () {
        event.preventDefault();
        console.log("add tag");
        var newTag = $("#tag-input").val().trim();
        $("#tag-input").val('');
        addTag(newTag);
    });

    $(document).on("click", ".giphy-image", function(){
        console.log($(this).attr("data-state"));
        if($(this).attr("data-state")==="still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else{
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});
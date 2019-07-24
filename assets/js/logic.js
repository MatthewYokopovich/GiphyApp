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
                newstr.text(element.rating);
                newdiv.append(newstr);
                var newimg = $("<img>").attr("src", element.images.fixed_height.url);
                newdiv.append(newimg);
                $("#imgrow").append(newdiv);
                idfix = 0;
            }
        });
        if (wasdupe > 1) {
            idfix += 10;
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
                        newstr.text(element2.rating);
                        newdiv.append(newstr);
                        var newimg = $("<img>").attr("src", element2.images.fixed_height.url);
                        newdiv.append(newimg);
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
});
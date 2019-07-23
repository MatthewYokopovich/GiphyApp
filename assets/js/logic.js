var topics = ["cat", "dog"];
var limit = 10;
function generateButtons(){
    $("#btnrow").empty();
    console.log("generate buttons");
    for(var i=0; i<topics.length; i++){
        var newbut = $("<button>");
        newbut.addClass("tag");
        newbut.attr("data-name", topics[i]);
        newbut.text(topics[i]);
        $("#btnrow").append(newbut);
    }
}
function display(tagstr){
    var queryurl = 'https://api.giphy.com/v1/gifs/search?q='+tagstr+'&limit='+limit+'&api_key=S6mnLoC0b3UsNPPt5Xg3bDY2XAXQux8P';
    console.log(queryurl);
    $.ajax({
        url: queryurl,
        method: "GET"
      }).then(function(response) {
        console.log(response.data);
        var giphyURL = response.data[0].images.fixed_height.url;
        console.log(giphyURL);
        for(var i=0; i<response.data.length; i++);{
            var newelement = $("<div>");
            var newimg = $("<img>").attr("src", response.data[i].url);
            newelement.append(newimg);
            $("#imgrow").append(newelement);
        }

      });
}

$(window).on("load", function(){ 
    generateButtons();
    $(".tag").click(function(){
        display($(this).text());
    });
});

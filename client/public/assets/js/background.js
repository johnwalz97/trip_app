var background = $("#background");
var count = 0;
function slideBack() {
    $("#"+backgrounds).hide("slide", {direction: "right"});
    $(this).next().hide("slide", {direction: "right"});
    if (count < backgrounds.length - 1) {
        count++
    } else {
        count = 0;
    }
}
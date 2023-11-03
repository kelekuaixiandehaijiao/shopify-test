
$(function () {
  
  $("#exercise-bike-tab").click(function () {
    $(this).addClass("bg-121212 text-white rounded-full");
    $("#ebike-tab").removeClass("bg-121212 text-white rounded-full");

    $("#exercise-bike-layout").css("display", "flex");
    $("#ebike-layout").css("display", "none");
    $("#reviewer-jump-btn").css("display", "block");
  });
  $("#ebike-tab").click(function () {
    $(this).addClass("bg-121212 text-white rounded-full");
    $("#exercise-bike-tab").removeClass("bg-121212 text-white rounded-full");
    $("#exercise-bike-layout").css("display", "none");
    $("#ebike-layout").css("display", "flex");
    $("#reviewer-jump-btn").css("display", "none");
  });
});

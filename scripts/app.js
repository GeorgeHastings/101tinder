'use strict';

var canDrag = false;
var lastAiHeight = 300;
var initY;
var initX;

var colors = ["#ef9a9a", "#F48FB1", "#CE93D8", "#CE93D8", "#9FA8DA", "#9FA8DA", "#9FA8DA", "#9FA8DA", "#A5D6A7", "#E6EE9C", "#FFF59D", "#FFE082", "#FFAB91", "#FFAB91"];

function rollNum(min, max) {
  return (Math.floor(Math.random() * (max - min)) + min).toFixed(0);
}

function getAmtHeight(amount) {
  var multiplier = 1-(0.0015*Math.abs(amount));
  return (amount*multiplier).toFixed(0);
}

function changeColor(amount) {
  rgb = [(amount + 100),200,100];
  if(amount > 100) {
    rgb = [200,200-(amount-100),100];
  }
  if(amount > 200) {
    rgb = [200-(amount-200),100-(amount-200),100-(amount-200)];
  }
  $(".amount-input").css("background", 'rgb('+rgb.join(',')+')');
}

function genNew(){
  setTimeout(function(){
    var newCard = $(".amount-input").clone();
    $(".amount-input").remove();
    newCard.appendTo("#screen");
    newCard.css("-webkit-transform", "translate3d(0px,0,0)")
    $(".show-slide").css("background-color", colors[rollNum(0,colors.length)]).attr("data-x", "0").attr("data-y", "0");
    newCard.addClass("show-slide");
  }, 250);
}

function dragAmount(el, e){
  var y;
  var x;
  var amountY;
  var amountX;
  var overlayOp;
  y = e.originalEvent.targetTouches[0].pageY;
  x = e.originalEvent.targetTouches[0].pageX;
  amountY = (y - initY);
  amountX = (x - initX);

  overlayOp = (amountX)/100;

  if(overlayOp > 0) {
    $(el).find(".like").css("opacity", Math.abs(overlayOp));
  }
  else {
    $(el).find(".nope").css("opacity", Math.abs(overlayOp));
  }

  $(el).css("-webkit-transform", "translate3d("+(getAmtHeight(amountX))+"px, "+(getAmtHeight(amountY))+"px, 0px) rotateZ("+(getAmtHeight(amountY)*0.1)+"deg)");
/*  changeColor(amountY);*/
  $(el).attr("data-x", amountX);
  $(el).attr("data-y", amountY);
}

$(document).on("mousedown touchstart", ".amount-input", function(e){
  canDrag = true;
  // console.log(e.originalEvent.targetTouches[0].pageY);
  // if($(window).width() < 500) {
    initY = e.originalEvent.targetTouches[0].pageY;
    initX = e.originalEvent.targetTouches[0].pageX;
  // }
  // else {
  //   initY = e.pageY;
  //   initX = e.pageX;
  // }
});

$("#screen").on("mouseup touchend", function(e){
  canDrag = false;
  var card = $(".amount-input").last();
  card.css("-webkit-transform", "translate3d(0,0,0)");
  $(".like").css("opacity", "0");
  $(".nope").css("opacity", "0");
  if(card.attr("data-x") > 180){
    card.css("-webkit-transform", "translate3d(367px,5px,0)");
    setTimeout(function(){
      card.remove();
      if(card.attr('id') === 'dk') {
        $('.match').addClass('pop-in');
      }
    }, 300);
    // genNew();
  }
  if(card.attr("data-y") < -200) {
    card.css("-webkit-transform", "translate3d(0px,-580px,0)");
    setTimeout(function(){
      card.remove();
    }, 300);
  }
  if(card.attr("data-y") > 200) {
    card.css("-webkit-transform", "translate3d(0px,580px,0)");
    setTimeout(function(){
      card.remove();
    }, 300);
  }
  if(card.attr("data-x") < -180){
    card.css("-webkit-transform", "translate3d(-367px,5px,0)");
    setTimeout(function(){
      card.remove();
    }, 300);
    // genNew();
  }
});

$(document).on("mouseup touchend", ".amount-input", function(){
  var x = $(this).attr("data-x");
  var y = $(this).attr("data-y");
  if(x > 120 || x < -120 || y > 150 || y < -150) {

  }
  else {
    $(".amount-input textarea").focus();
    $(".amount-input").removeClass("show-slide");
  }
});

$(document).on("blur", ".amount-input textarea", function(){
  $(".amount-input").addClass("show-slide");
});

$(".amount-input").on("mousemove touchmove", function(e){
  if(canDrag == true) {
    dragAmount(this, e);
  }
});

$(window).bind(
  'touchmove',
   function(e) {
    e.preventDefault();
  }
);

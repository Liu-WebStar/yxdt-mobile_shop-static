import $ from "jquery";

export function remCoefficient(){ // rem系数
  var winWidth=$(window).outerWidth();
  var cor=winWidth/750;
  return cor>1 ? 1 : cor;
};

export function stopScroll(_this,query='html'){
  $(query).css('overflow','hidden');
};

export function allowScroll(_this,query='html'){
  $(query).css('overflow','visible');
}
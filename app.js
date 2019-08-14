'use strict'

function Image(item) {
    this.image_url = item.image_url;
    this.title = item.title;
    this.description = item.description;
    this.keyword = item.keyword;
    this.horns = item.horns;
  }

  Image.all = [];
  
  Image.prototype.render = function () {
    let $templateClone = $('<div></div>');
    $templateClone.html($('#photo-template').html());
    $templateClone.find('h2').text(this.title);
    $templateClone.find('img').attr('src', this.image_url);
    $templateClone.find('img').attr('alt', this.description);
    $templateClone.find('p').text(this.description);
    $templateClone.attr('class', this.keyword);
    $('main').append($templateClone);
  };

const photos = $.getJSON('page-1.json', item => {
    
})

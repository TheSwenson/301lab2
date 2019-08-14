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
    $templateClone.find('p').text(this.description);
    $templateClone.attr('class', this.keyword);
    $('main').append($templateClone);
};

Image.readJson = () => {
    $.get('page-1.json', 'json')
        .then(data => {
            data.forEach(item => {
                Image.all.push(new Image(item));
            });
            Image.all.forEach(image => {
                $('main').append(image.render());
            });
        })
        // .then(Image.populateFilter)
        // .then(Image.handleFilter);
};

Image.readJson();
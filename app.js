'use strict';

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
                const context = { title: item.title, image_url: item.image_url, keyword:item.keyword, description: item.description };
                const template = template(context);
            });
            console.log(Image.all);
            Image.all.forEach(image => {
                $('main').append(image.render());
            });
        })
        .then(Image.populateFilter)
        .then(Image.handleFilter);
};

Image.populateFilter = () => {
    let filterKeywords = [];
    console.log(Image.all, Image.all[0], Image.all.length);

    $('option').not(':first').remove();

    Image.all.forEach((image) => {
        if(!filterKeywords.includes(image.keyword)){
            filterKeywords.push(image.keyword)
        }
    });

    filterKeywords.sort();
    console.log(filterKeywords);

    filterKeywords.forEach(keyword => {
        let optionTag = `<option value="${keyword}">${keyword}</option>`;
        $('#select').append(optionTag);
    });
};

Image.handleFilter = () => {
    $('select').on('change', function () {
        let selected = $(this).val();
        if (selected !== 'default') {
            $('div').hide();
            $(`div[class="${selected}"]`).addClass('filtered').fadeIn();

            $(`option[value=${selected}]`).fadeIn();
        } else {
            $('div').removeClass('filtered').fadeIn();
            $(`option[value=${selected}]`).fadeIn();
        }
    });
};


$(() => Image.readJson());
$()
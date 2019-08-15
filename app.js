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
    Image.prototype.render = function() {
        let template = Handlebars.compile($('#photo-template').html());
        return template(this);
       };
};

Image.readJson = (page) => {
    $.get(`page-${page}.json`).then(data => {
        Image.all = [];
            data.forEach(item => {
                Image.all.push(new Image(item));
            });
            
            Image.all.forEach(image => {
                $('main').append(image.render());
                // const context = { title: Item.title, image_url: Item.image_url, keyword: Item.keyword, description: Item.description };
                // const template = template(context);
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

let page = 1
$('#page').click(() => {
    page = page === 1 ? 2 : 1
    $('#page').text(`Page ${page === 1 ? 2 : 1}`)
    $('main').empty()
    Image.readJson(page);
})




$(() => Image.readJson(1));
$()
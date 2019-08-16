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
            });
        })
        .then(Image.populateFilter)
        .then(Image.handleFilter)
        .then(Image.sortImages);
};

Image.populateFilter = () => {
    let filterKeywords = [];

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
            $(`div[class="${selected}"]`).show();

            $(`option[value=${selected}]`).show();
        } else {
            $('div').show();
            $(`option[value=${selected}]`).show();
        }
    });
};
// $('#AZ').click(() => {
//     Image.readJson(page);
// })

let page = 1
$('#page').click(() => {
    page = page === 1 ? 2 : 1
    $('#page').text(`Page ${page === 1 ? 2 : 1}`)
    $('main').empty()
    Image.readJson(page);
})

$(() => Image.readJson(page));
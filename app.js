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
        .then(Image.handleFilter);
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

let page = 1
$('#page').click(() => {
    page = page === 1 ? 2 : 1
    $('#page').text(`Page ${page === 1 ? 2 : 1}`)
    $('#sort').html('Sort A-Z')
    $('main').empty()
    Image.readJson(page);
})

$('#sort').click(() => {
    
    if($('#sort').html() === 'Sort A-Z'){
        $('main').empty()
        $('#sort').html('Sort By Horn #')
        
        Image.all.sort(function(a, b){
            if(a.title < b.title) {return -1}
            if(a.title > b.title) {return 1}
            return 0;
            })
        Image.all.forEach(image => {
            $('main').append(image.render());
        });
    } else if($('#sort').html() === 'Sort By Horn #') {
        $('main').empty();
        $('#sort').html('Sort A-Z');
        
        Image.all.sort(function(a, b){
            if(a.horns < b.horns) {return -1}
            if(a.horns > b.horns) {return 1}
            return 0;
        })
        Image.all.forEach(image => {
            $('main').append(image.render());
        });
    } else {
        alert(`Please refresh the page`)
    }
})

$(() => Image.readJson(page));

let breeds = [];

function loadBreeds() {
    $.get('/api/breeds', function(data) {
        breeds = data;
        updateBreedList();
    });
}

function updateBreedList(query = '') {
    const filteredBreeds = breeds.filter(breed => 
        breed.name.toLowerCase().includes(query.toLowerCase())
    );

    let html = '';
    filteredBreeds.forEach(breed => {
        html += `<a href="#" class="list-group-item list-group-item-action" data-breed-id="${breed.id}">${breed.name}</a>`;
    });
    $('#breed-list').html(html);
}

function displayBreed(breedId) {
    const breed = breeds.find(b => b.id === breedId);
    if (breed) {
        let html = `
            <div class="card mb-3">
                <img src="${breed.image.url}" class="card-img-top" alt="${breed.name}">
                <div class="card-body">
                    <h5 class="card-title">${breed.name}</h5>
                    <p class="card-text">${breed.description}</p>
                    <a href="${breed.wikipedia_url}" target="_blank" class="btn btn-primary">Wikipedia</a>
                </div>
            </div>
        `;
        $('#breed-content').html(html);
    }
}

$(document).ready(function() {
    loadBreeds();

    $('#breed-search').on('focus', function() {
        $('#breed-list').show();
    });

    $('#breed-search').on('input', function() {
        updateBreedList($(this).val());
        $('#breed-list').show();
    });

    $(document).on('click', function(e) {
        if (!$(e.target).closest('#breed-search, #breed-list').length) {
            $('#breed-list').hide();
        }
    });

    $('#breed-list').on('click', '.list-group-item', function(e) {
        e.preventDefault();
        const breedId = $(this).data('breed-id');
        $('#breed-search').val($(this).text());
        $('#breed-list').hide();
        displayBreed(breedId);
    });
});
function loadRandomImage() {
    $.get('/api/random-image', function(data) {
        $('#cat-image').attr('src', data.url);
    });
}

function addFavorite(url) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites.push(url);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

$(document).ready(function() {
    loadRandomImage();

    $('#like-btn, #dislike-btn').click(loadRandomImage);

    $('#fav-btn').click(function() {
        addFavorite($('#cat-image').attr('src'));
        loadRandomImage();
    });
});
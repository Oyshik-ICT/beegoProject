function displayFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let html = '';
    favorites.forEach(fav => {
        html += `
            <div class="col-md-4 mb-3">
                <img src="${fav}" alt="Favorite Cat" class="img-fluid">
            </div>
        `;
    });
    $('#fav-content').html(html);
}

$(document).ready(function() {
    displayFavorites();
});
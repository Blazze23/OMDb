// $(document).ready( function () {
//     $('table').DataTable();
// } );
let favorites=[];
let potentialFavorite;

$("#navbar_search").keyup(function(event) {
    if(event.keyCode === 13) {
       searchSetup();
    }
 })

function searchSetup() {
    let search = $("#navbar_search").val();
    localStorage.setItem("search", search);
    if(search.length == 0) {
        Swal.fire("Error", "You have to enter a title first", "error");
    } else {
        location.href = "search.html";
    }
}

function search() {
        let local_search = localStorage.getItem("search");
        console.log(local_search);
        if(local_search != null) {
            $.getJSON("https://omdbapi.com/?apikey=4194023&s="+local_search, function(json) {
                console.log(json);
                if(json.Response == "True") {
                    $("table tbody").empty();
                   $.each(json.Search, function(key, value) {
                       $("table tbody").append("<tr class='align-middle'><td>"+value.Title+"</td>><td>"+value.Year+"</td><td>"+value.Type+"</td><td><img src='"+value.Poster+"' class='img-fluid' style='max-width: 60px;'></td><td>"+value.imdbID+"</td><td><button class='btn btn-warning btn-xs' id='info_btn' onclick='titleInfoSetup(\""+value.imdbID+"\")'><i class='fas fa-info-circle pe-2'></i>Info</button></td></tr>");
                   })
                } else {
                Swal.fire("Error", json.Error, "error");
                }
            })
        }
        // localStorage.removeItem("search");
}

function titleInfoSetup(titleId) {
    localStorage.setItem("titleID", titleId);
    location.href = "info.html";
}

function titleInfo() {
    let lokal_titleID = localStorage.getItem("titleID");
    $.getJSON("https://omdbapi.com/?apikey=4194023&i="+lokal_titleID, function(json) {
                console.log(json);
                potentialFavorite = json;
                if(json.Type === "movie") {
                    $("#titleName").html(json.Title);
                    $("#titleYear").html(json.Year);
                    $("#ratingIMDB").html("IMDB Rating");
                    $("#ratingMeta").html("Metascore");
                    $("#valueIMDB").html(json.imdbRating+"<i class='fas fa-star ps-2'></i>");
                    $("#valueMeta").html(json.Metascore+"<i class='fas fa-percentage ps-2'></i>");
                    $("#titlePoster").attr("src", json.Poster);
                    $("#titleDirector").html(json.Director);
                    $("#titleWriter").html(json.Writer);
                    $("#titleActors").html(json.Actors);
                    $("#titleGenre").html(json.Genre);
                    $("#titleDuration").html(json.Runtime);
                    $("#titleRated").html(json.Rated);
                    $("#titleGenre").html(json.Genre);
                    $("#titlePlot").html(json.Plot);
                    $("#titleAwards").html(json.Awards);
                    $("#titleBox").html(json.BoxOffice);
                    $("#titleCountry").html(json.Country);
                    $("#titleLanguage").html(json.Language);
                    $("#titleProduction").html(json.Production);
                } else if(json.Type === "series") {
                    $("#titleName").html(json.Title);
                    $("#titleYear").html(json.Year);
                    $("#ratingIMDB").html("IMDB Rating");
                    $("#valueIMDB").html(json.imdbRating+"<i class='fas fa-star ps-2'></i>");
                    $("#titlePoster").attr("src", json.Poster);
                    $("#titleDirector").html(json.Director);
                    $("#titleWriter").html(json.Writer);
                    $("#titleActors").html(json.Actors);
                    $("#titleGenre").html(json.Genre);
                    $("#titleDuration").html(json.Runtime);
                    $("#titleRated").html(json.Rated);
                    $("#titleGenre").html(json.Genre);
                    $("#titlePlot").html(json.Plot);
                    $("#titleAwards").html(json.Awards);
                    $("#titleBox").html("N/A");
                    $("#titleCountry").html(json.Country);
                    $("#titleLanguage").html(json.Language);
                    $("#titleProduction").html("N/A");
                }
            });
}

function addToFavoritesSetup() {
    favorites.push(potentialFavorite);
    let lokal_favorites = JSON.parse(localStorage.getItem("favorites"));
    if(lokal_favorites == null) {
        let json_favorites = JSON.stringify(favorites);
        localStorage.setItem("favorites", json_favorites);
        location.href = "favorites.html";
    } else {
        console.log(favorites);
        console.log(lokal_favorites);
        lokal_favorites.push(favorites[0]);
        console.log(lokal_favorites);
        let json_favorites = JSON.stringify(lokal_favorites)
        localStorage.setItem("favorites", json_favorites);
        location.href = "favorites.html";
    }
}

function addToFavorites() {
    let lokal_favorites = JSON.parse(localStorage.getItem("favorites"));
    console.log(lokal_favorites);
    $.each(lokal_favorites, function(key, value) {
        console.log(value);
        $("#favoritesCard").append("<div class='card p-3 mb-4' id='card-well'><div class='row'><div class='col-lg-6'><div class='card-body'><h5 class='card-title'>"+value.Title+"</h5><p class='card-text'>Director: "+value.Director+"</p><p class='card-text'>Stars: "+value.Actors+"</p><p class='card-text'>Rating: "+value.imdbRating+"<i class='fas fa-star ps-2'></i></p></div></div><div class='col-lg-5'><img src='"+value.Poster+"' class='card-img-top img-fluid' style='max-width: 150px' alt='Poster'></div></div></div>");
    });
}
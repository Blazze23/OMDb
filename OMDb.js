// $(document).ready( function () {
//     $('table').DataTable();
// } );
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
                       $("table tbody").append("<tr class='align-middle'><td>"+value.Title+"</td>><td>"+value.Year+"</td><td>"+value.Type+"</td><td><img src='"+value.Poster+"' class='img-fluid' style='max-width: 60px;'></td><td>"+value.imdbID+"</td><td><button class='btn btn-warning btn-xs' onclick='titleInfoSetup(\""+value.imdbID+"\")'><i class='fas fa-info-circle pe-2'></i>Info</button></td></tr>");
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
                if(json.Type === "movie") {
                    $("#titleName").html(json.Title);
                    $("#titleYear").html(json.Year);
                    $("#ratingIMDB").html("IMDB Rating");
                    $("#ratingMeta").html("Metascore");
                    $("#valueIMDB").html(json.imdbRating);
                    $("#valueMeta").html(json.Metascore);
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
                    $("#valueIMDB").html(json.imdbRating);
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
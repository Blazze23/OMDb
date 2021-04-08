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
                       $("table tbody").append("<tr class='align-middle'><td>"+value.Title+"</td>><td>"+value.Year+"</td><td>"+value.Type+"</td><td><img src='"+value.Poster+"' class='img-fluid' style='max-width: 60px;'></td><td>"+value.imdbID+"</td><td><button class='btn btn-warning btn-xs'><i class='fas fa-info-circle pe-2'></i>Info</button></td></tr>");
                   })
                } else {
                Swal.fire("Error", json.Error, "error");
                }
            })
        }
        localStorage.removeItem("search");
}
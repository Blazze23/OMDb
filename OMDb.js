// $(document).ready( function () {
//     $('table').DataTable();
// } );

function search() {
    let search = $("#navbar_search").val();
    if(search.length == 0) {
        Swal.fire("Error", "You have to enter a title first", "error")
    } else {
        $.getJSON("https://omdbapi.com/?apikey=4194023&s="+search, function(json) {
            console.log(json);
            if(json.Response == "True") {
                $("table tbody").empty();
               $.each(json.Search, function(key, value) {
                   $("table tbody").append("<tr><td>"+value.Title+"</td>><td>"+value.Year+"</td><td>"+value.Type+"</td><td><img src='"+value.Poster+"' class='img-fluid' style='max-width: 100px;'></td><td>"+value.imdbID+"</td><td><button class='btn btn-warning btn-xs'><i class='fas fa-info-circle pe-2'></i>Info</button></td></tr>");
               })
            } else {
            Swal.fire("Error", json.Error, "error")
            }
        })
    }
}
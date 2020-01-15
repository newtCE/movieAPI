(function($){
    Get();
        function processForm( e ){
        var dict = {
            Title : this["title"].value,
            Genre: this["genre"].value,
            Director: this["director"].value
        };
        $.ajax({
            url: 'https://localhost:44352/api/movies',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#movieList').empty();
                Get();
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });
        e.preventDefault();
    }
    $('#my-form').submit( processForm );
})(jQuery);


function putEdit(id)
{
    var dict = {
            Title : $('#titlename').val(),
            Genre: $('#genrename').val(),
            Director: $('#directorname').val(),
            MovieId: id
        };
    $.ajax({
            url: 'https://localhost:44352/api/movies/'+id,
            dataType: 'json',
            type: 'put',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function(data){
                alert('success')
                $('#movieList').empty();
                Get();
            },
            error: function() {
                alert('error loading movie list');
            }})
}

function DeleteEntry(id)
{
            $(function(){
                $.ajax({
                type: 'delete',
                url:'https://localhost:44352/api/movies/'+id,
                data: id,
                success: function(){
                    $('#movieList').empty();
                    Get();
                },
                error: function (){
                    alert('Error deleting entry')
                }
            })
        });
}

function Get()
{
    $.ajax({
            url: 'https://localhost:44352/api/movies',
            dataType: 'json',
            type: 'GET',
            success:function(movies){
            $.each(movies, function(i,movie){
               addmovie(movie);
            });
            },
            error: function() {
                alert('error loading movie list');
            }});
}

function addmovie(movie)
{
         $('#movieList').append('<tr>'+
                        '<td>'+ movie.MovieId+ '</td>'+
                        '<td>'+ movie.Title+ '</td>'+
                        '<td>'+ movie.Genre+ '</td>'+
                        '<td>'+ movie.Director+ '</td>'+
                        '<td>'+'<button onClick="putEdit('+movie.MovieId+')">Edit Entry</button>'+'</td>'+
                        '<td>'+'<button onCLick="DeleteEntry('+movie.MovieId+')">Remove Entry</button>'+'</td>'+
                    '</tr>)');
}
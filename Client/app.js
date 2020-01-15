(function($){
    var $movieList=$('#movieList');
    var id;
    function DeleteEntry(id){
            $(function(){
                $.ajax({
                type: 'delete',
                url:'https://localhost:44352/api/movies'+id,
                success: function(){
                },
                error: function (){
                    alert('Error deleting entry')
                }
            })
        });
    }  
    function addmovie(movie){
         $movieList.append('<tr>'+
                        '<td>'+ movie.MovieId+ '</td>'+
                        '<td>'+ movie.Title+ '</td>'+
                        '<td>'+ movie.Genre+ '</td>'+
                        '<td>'+ movie.Director+ '</td>'+
                        '<td>'+'<button onClick="putEdit('+movie.MovieId+')">Edit Entry</button>'+'</td>'+
                        '<td>'+'<button onCLick="DeleteEntry('+movie.MovieId+')">Remove Entry</button>'+'</td>'+  
                    '</tr>)');
    }
    $.ajax({
            url: 'https://localhost:44352/api/movies',
            dataType: 'json',
            type: 'get',
            success:function(movieList){
            $.each(movieList, function(i,movie){
                $movieList.append(
                    //'<li style="font-size:10px">Title: '+ movie.Title + ' Genre: '+movie.Genre + ' Director: '+ movie.Director +'</li>'
                    '<tr>'+
                        '<td>'+ movie.MovieId+ '</td>'+
                        '<td>'+ movie.Title+ '</td>'+
                        '<td>'+ movie.Genre+ '</td>'+
                        '<td>'+ movie.Director+ '</td>'+
                        '<td>'+'<button onClick="putEdit('+movie.MovieId+')">Edit Entry</button>'+'</td>'+
                        '<td>'+'<button onCLick="DeleteEntry('+movie.MovieId+')">Remove Entry</button>'+'</td>'+                       
                        //'<td>'+'<button onClick="EditEntry(${movie.MovieId})">Edit Entry</button>+'</td>'+
                        //'<td>'+'<button onCLick="DeleteEntry(${movie.MovieId})">Remove Entry</button>+'</td>'+
                    '</tr>)');
            });
            },
            error: function() {
                alert('error loading movie list');
            }
        });
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
                $('#response pre').html( data );
                addmovie(dict);
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });
        e.preventDefault();
    }
    $('#my-form').submit( processForm );
var table = document.getElementById('movieList'),rIndex;
    for (var i = 0; i < table.rows.length; i++)
    {
        table.rows[i].onclick = function()
        {
            rIndex = this.rowIndex;
            document.getElementById("titlename").value = this.cells[0].innerHTML;
        };
    }
    function putEdit(id){
    var dict = {
            Title : this["title"].value,
            Genre: this["genre"].value,
            Director: this["director"].value
        };
    $.ajax({
            url: 'https://localhost:44352/api/movies/'+id,
            dataType: 'json',
            type: 'put',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function(data){
                $('#response pre').html( data );
            addmovie(dict);
            },
            error: function() {
                alert('error loading movie list');
            }})
        };
    $('#Edit').click( function run(){
        putEdit(1);
        });
})(jQuery);
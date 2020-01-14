(function($){

    var $movieList=$('#movieList');

    $.ajax({
            url: 'https://localhost:44352/api/movies',
            dataType: 'json',
            type: 'get',
            success:function(movieList){
            $.each(movieList, function(i,movie){
                $movieList.append(
                    //'<li style="font-size:10px">Title: '+ movie.Title + ' Genre: '+movie.Genre + ' Director: '+ movie.Director +'</li>'
                    '<tr>'+
                        '<td>'+'Title '+ movie.Title+ '</td>'+
                        '<td>'+' Genre '+ movie.Genre+ '</td>'+
                        '<td>'+' Director '+ movie.Director+ '</td>'+
                        '<td>'+' BUTTON'+'</td>'+
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
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

    $('#my-form').submit( processForm );
    
})(jQuery);
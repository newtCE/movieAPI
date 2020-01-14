(function($){
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
$.ajax({
            url: 'https://localhost:44352/api/movies',
            dataType: 'json',
            type: 'get',
            contentType: 'application/json',
            data: JSON.stringify(movies),
            success: function( movies ){
                $.each(movies, function(i, movie){
                    $Movies.append('<li>Title: '+ movie.Title + ' Genre: '+movie.Genre + '</li>');
                })
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });
    $('#my-form').submit( processForm );
})(jQuery);


(function($){
    function processForm( e ){
        var dict = {
            Title: this["Title"].value,
            Genre: this["Genre"].value,
            Director: this["Director"].value
            
        };

        $.ajax({
            url: 'https://localhost:44374/api/movies',
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
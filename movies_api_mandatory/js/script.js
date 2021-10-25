$(document).ready(function(){
    //set value to option, if no option is selected default is moviee
    // ##### TODO: Handle case when details are too big, movie not found
    let option;
    let moviesList = [];
    let personList = [];
    $("select").on("change", function() {
        if (this.value === "movie") {
            option = "movie";
        }
        if (this.value === "years") {
            option = "years";
        }
        if (this.value === "person") {
            option = "person";
        }
    });

    function append(list) {
        const name = list[0]
        list.shift()
        if (list.length > 0) {
            $(`.${name}-list`).append(
                '<p><span>' + name.toUpperCase() + ': </span>' + list.join(', ') + '</p>'
            )
        }
    }

    // search movie and people
    $(".submit").click(function() {
        const input = $("#input").val();
        if (option === "movie" || !option) {
            $.ajax({url: `https://api.themoviedb.org/3/search/movie?api_key=&language=en-US&page=1&query=${input}`, 
            }).done(function(data){
                const movies = data.results
                movies.forEach(movie => {
                    moviesList.push({
                        id: movie.id,
                        title: movie.title
                    })

                    $(".flex-box").append(
                        '<div class="element" style="cursor: pointer;" id="movie"><p class="title"><span>' + movie.title + '</span></p>'
                        + '<p class="year"><span>' + movie.release_date.split('-')[0] + '</span></p>' 
                        + '<p class="language"><span>Language: </span>' + movie.original_language + '</p></div>'
                    )
                })
            })
        }
    
        if (option === "years") {
            console.log(input)
            const [movie, year] = input.split(' ')
            $.ajax({url: `https://api.themoviedb.org/3/search/movie?api_key=&language=en-US&query=${movie}&year=${year}`, 
            }).done(function(data){
                const movies = data.results
                movies.forEach(movie => {
                    if (movie.release_date.split('-')[0] === year) {
                        moviesList.push({
                            id: movie.id,
                            title: movie.title
                        })
                        $(".flex-box").append(
                            '<div class="element" style="cursor: pointer;" id="movie"><p class="title"><span>' + movie.title + '</span></p>'
                            + '<p class="year"><span>' + movie.release_date.split('-')[0] + '</span></p>' 
                            + '<p class="language"><span>Language: </span>' + movie.original_language + '</p></div>'
                        )
                    }
                })           
            })
        }
        if (option === "person") {
            $.ajax({url: `https://api.themoviedb.org/3/search/person?api_key=&language=en-US&query=${input}`
            }).done(function(data){
                const people = data.results
                people.forEach(person => {
                    personList.push({
                        id: person.id,
                        name: person.name
                    })
                    $(".flex-box").append(
                        '<div class="element" style="cursor: pointer;" id="person"><p class="name"><span>' + person.name +'</span></p>'
                        + '<p class="activity"><span>Main activity: </span>' + person.known_for_department +'</p></div>' 
                    )
                })
            })
        }
    })

    let title;
    function isMovie(movie) {
        return movie.title === title
    }

    let name;
    function isPerson(person) {
        return person.name === name
    }

    //create models heres
    $('.flex-box').on("click", ".element" ,function(){
        if( $(".element").attr('id') === "movie") {
            title = $(this).find('p.title').text()
            const movieFound =  moviesList.find(isMovie)
            $.ajax({
                url: `https://api.themoviedb.org/3/movie/${movieFound.id}?api_key=&language=en-US`,
            }).done(function(data) {
                const movie = {
                    title: data.title,
                    releaseDate: data.release_date,
                    language: data.original_language,
                    runtime: data.runtime,
                    overview: data.overview,
                    webPage: data.homepage
                }

                $(".movie-details").append( 
                    '<p><span> Title: </span>' + movie.title + '</p>' +
                    '<p><span> Release data: </span>' + movie.releaseDate + '</p>' + 
                    '<p><span> Language: </span>' + movie.language + '</p>' + 
                    '<p><span> Runtime: </span>' + movie.runtime + '</p>' + 
                    '<p><span> Overview: </span><span id="overview">' + movie.overview + '</span></p>'
                )

                if (movie.webPage) {
                    $(".movie-details").append('<a href="'+ movie.webPage + '" id="homepage">Web page</a>')
                }
                const genres = data.genres.map(genre => {
                    return genre.name
                })
                const companies = data.production_companies.map(company => {
                    return company.name
                })
    
                $(".movie-details").append(
                    '<p><span> Genres:</span> ' + genres.join(', ')+ '</p>' +
                    '<p><span> Production companies:</span> ' + companies.join(', ')+ '</p>'
                )
            })

            $.ajax({
                url: `https://api.themoviedb.org/3/movie/${movieFound.id}/credits?api_key=&language=en-US`
            }).done(function(data) {
                const cast = data.cast
                const crew = data.crew

                const producers = ['producers']
                const directors = ['directors']
                const writers = ['writers']
                const ecProducers = ['executive-producers']
                const composers = ['music-composers']

                crew.map(person => {
                    if (person.job === "Director") {
                        directors.push(person.name)
                    }
                    if (person.job === "Writer") {
                        writers.push(person.name)
                    }
                    if (person.job === "Producer") {
                        producers.push(person.name)
                    }

                    if (person.job === "Original Music Composer") {
                        composers.push(person.name)              
                    }

                    if (person.job === "Executive Producer") {
                        ecProducers.push(person.name)                
                    }

                })

                append(directors)
                append(writers)
                append(producers)
                append(composers)
                append(ecProducers)

                if (cast.length > 0) {
                    cast.forEach(actor => {
                        $(".actors-list").append(
                            '<li>' + actor.name + '<span> ---> </span> ' + actor.character + '</li>'
                        )                   
                    })
                } else if (cast.length === 0) {
                    $(".cast").css("display", "none")
                }
    
            })

            $("#modalMovie").css("display", "block")
        } 

    if( $(".element").attr('id') === "person") {
        name = $(this).find('p.name').text()
            const personFound =  personList.find(isPerson)
        $.ajax({
            url: `https://api.themoviedb.org/3/person/${personFound.id}?api_key=&language=en-US`
        }).done(function(data) {    
            const person = {
                name: data.name,
                mainActivity: data.known_for_department,
                birthday: data.birthday,
                birthdayPlace: data.place_of_birth,
                dayOfDecease: data.deathday,
                biography: data.biography,
                webPage: data.homepage
            }

            $(".person-details").append( 
                '<p><span> Name: </span>' + person.name + '</p>' +
                '<p><span> Main Activity: </span>' + person.mainActivity + '</p>' + 
                '<p><span> Birthday: </span>' + person.birthday + '</p>' + 
                '<p><span> Biography: </span><span id="biography">' + person.biography + '</span></p>'
            )

            if (person.birthdayPlace) {
                $(".person-details").append('<p><span> Birthday Place: </span>' + person.birthdayPlace + '</p>')
            }
            if (person.dayOfDecease) {
                $(".person-details").append('<p><span> Day of Decease: </span><span id="overview">' + person.dayOfDecease + '</span></p>')
            }
            if (person.webPage) {
                $(".person-details").append('<a href="'+ person.webPage + '" id="homepage">Web page</a>')
            }
        })

        $.ajax({
            url: `https://api.themoviedb.org/3/person/${personFound.id}/movie_credits?api_key=&language=en-US`
        }).done(function(data) {
            const crew = data.crew
            const cast = data.cast

            if (cast.length > 0) {
                cast.forEach(movie => {
                    $(".movies-list").append(
                        '<li>' + movie.title + ', ' + 
                        movie.release_date.split('-')[0] + ', Actor</li>'
                    )
                })
            }

            if(crew.length > 0) {
                crew.forEach(movie => {
                    $(".movies-list").append(
                        '<li>' + movie.title + ', ' + 
                        movie.release_date.split('-')[0] + ', ' + movie.job + '</li>'
                    )
                })
            }
        })
        $("#modalPerson").css("display", "block")
    } 
})

  // close modal
    var spanMovie = document.getElementsByClassName("closeMovie")[0]
    var spanPerson = document.getElementsByClassName("closePerson")[0]

    spanMovie.onclick = function() {
        $('.modalMovie').css("display", "none")
        $('.actors-list').empty()
        $('.directors-list').empty()
        $('.producers-list').empty()
        $('.writers-list').empty()
        $('.music-composers-list').empty()
        $('.executive-producers-list').empty()
        $('.modal-movie .movie-details').empty()
        $(".cast").css("display", "block")

    }
    spanPerson.onclick = function() {
        $('.modalPerson').css("display", "none")
        $('.movies-list').empty()
        $('.modal-person .person-details').empty()

    }

    window.onclick = function(event) {
        if (event.target == modalMovie) {
            $('.modalMovie').css("display", "none")
            $('.actors-list').empty()
            $('.directors-list').empty()
            $('.producers-list').empty()
            $('.writers-list').empty()
            $('.music-composers-list').empty()
            $('.executive-producers-list').empty()
            $('.modal-movie .movie-details').empty()
            $(".cast").css("display", "block")

        }

        if (event.target == modalPerson) {
            $('.modalPerson').css("display", "none")
            $('.movies-list').empty()
            $('.modal-person .person-details').empty()
        }
    }  

    // clear search
    $(".clear").click(function() {
        $('.flex-box').empty()
        $('.search').val('')
        $('.modalMovie').css("display", "none")
        $('.modalPerson').css("display", "none")
        moviesList = []
    })
})
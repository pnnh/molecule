package com.huable.venus.movies;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MoviesController {

    /**
     * Static Movie Array containing all the list of Movies.
     */
    private static final Movie[] PAIDMOVIES = {
            new Movie(1L, "Paid Movie 1"),
            new Movie(2L, "Paid Movie 2"),
            new Movie(3L, "Paid Movie 3"),
            new Movie(4L, "Paid Movie 4"),
            new Movie(5L, "Paid Movie 5"),
            new Movie(6L, "Paid Movie 6"),
            new Movie(7L, "Paid Movie 7"),
            new Movie(8L, "Paid Movie 8"),
            new Movie(9L, "Paid Movie 9"),
            new Movie(10L, "Paid Movie 10")
    };

    /**
     * REST API method to get all the Movies based on AWS App Config parameter.
     *
     * @return List of Movies
     */
    @GetMapping("/movies/getMovies")
    public Movie[] movie() {

        return PAIDMOVIES;
    }

}
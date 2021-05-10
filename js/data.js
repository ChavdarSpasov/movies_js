
function host(endpoint) {
    return `https://eu-api.backendless.com/1EC73731-A338-440B-A409-3BF133A7A6E5/163AB1C7-379E-4A97-8E45-DF05C58FDC93/${endpoint}`;        
}

const endpoint = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout', 
    MOVIES: 'data/movies',
    MOVIE_BY_ID: 'data/movies/'
}

async function register(username, password) {
    return (await fetch(host(endpoint.REGISTER), {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({
                username,
                password
        })
   })).json(); 
}

async function login(username, password) {
    const result = await (await fetch(host(endpoint.LOGIN), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: username,
            password
        })
    })).json();

    localStorage.setItem('userToken', result['user-token']);
    localStorage.setItem('username', result.username);
    localStorage.setItem('userId', result.objectId);

    return result;
}

function logout() {
    const token = localStorage.getItem('userToken');

    return fetch(host(endpoint.LOGOUT), {
        headers: {
            'user-token': token
        }
    });
}

async function getMovies() {
    const token = localStorage.getItem('userToken');

    return (await fetch(host(endpoint.MOVIES), {
        headers: {
            'user-token': token
        }
    })).json();
}

async function getMovieById(id) {
    const token = localStorage.getItem('userToken');

    return (await fetch(host(endpoint.MOVIE_BY_ID + id), {
        headers: {
            'user-token': token
        }
    })).json();
}

async function createMovie(movie) {
    const token = localStorage.getItem('userToken');
    
    return (await fetch(host(endpoint.MOVIES), {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(movie)
    })).json();
}

async function updateMovie(id, updatedProps) {
    const token = localStorage.getItem('userToken');
    
    return (await fetch(host(endpoint.MOVIE_BY_ID + id), {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(updatedProps)
    })).json();
}

async function deleteMovie(id) {
    const token = localStorage.getItem('userToken');
    
    return (await fetch(host(endpoint.MOVIE_BY_ID + id), {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        }
    })).json();
}

async function getMovieByOwner(ownerId) {
    const token = localStorage.getItem('userToken');

    return (await fetch(host(endpoint.MOVIES + `?where=ownerId%3D%27${ownerId}%27`), {
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        }
    })).json();
}

async function buyTicket(movie) {
    const newTicket = movie.tickets - 1;
    const movieId = movie.objectId; 

    return updateMovie(movieId, { tickets: newTicket });

}
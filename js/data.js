
import { startRequest, endRequest} from './notification.js';

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

export async function register(username, password) {
    startRequest();

    const result = (await fetch(host(endpoint.REGISTER), {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({
                username,
                password
        })
   })).json();
   
   endRequest();

   return result;
}

export async function login(username, password) {
    startRequest();

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

    endRequest();

    return result;
}

export async function logout() {
    startRequest();

    const token = localStorage.getItem('userToken');

    localStorage.removeItem('userToken')
    
    const result = fetch(host(endpoint.LOGOUT), {
        headers: {
            'user-token': token
        }
    });

    endRequest();
    
    return result;

}

export async function getMovies(search) {
    startRequest();

    const token = localStorage.getItem('userToken');

    let result;

    if(!search) {
        result = (await fetch(host(endpoint.MOVIES), {
            headers: {
                'user-token': token
            }
        })).json();
    } else {
        result = (await fetch(host(endpoint.MOVIES + `?where=${escape(`genres LIKE '%${search}'`)}%`), {
            headers: {
                'user-token': token
            }
        })).json();
    }


    endRequest();
    
    return result;
}

export async function getMovieById(id) {
    startRequest();

    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoint.MOVIE_BY_ID + id), {
        headers: {
            'user-token': token
        }
    })).json();

    endRequest();
    
    return result;
}

export async function createMovie(movie) {
    startRequest();

    const token = localStorage.getItem('userToken');
    
    const result = (await fetch(host(endpoint.MOVIES), {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(movie)
    })).json();

    endRequest();
    
    return result;
}

export async function updateMovie(id, updatedProps) {
    startRequest();

    const token = localStorage.getItem('userToken');
    
    const result = (await fetch(host(endpoint.MOVIE_BY_ID + id), {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(updatedProps)
    })).json();

    endRequest();
    
    return result;
}

export async function deleteMovie(id) {
    startRequest();

    const token = localStorage.getItem('userToken');
    
    const result = (await fetch(host(endpoint.MOVIE_BY_ID + id), {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        }
    })).json();

    endRequest();
    
    return result;
}

export async function getMovieByOwner() {
    startRequest();

    const token = localStorage.getItem('userToken');
    const ownerId = localStorage.getItem('userId')

    const result = (await fetch(host(endpoint.MOVIES + `?where=ownerId%3D%27${ownerId}%27`), {
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        }
    })).json();

    endRequest();
    
    return result;
}

export async function buyTicket(movie) {
    if(movie.tickets == 0){
        throw new Error('Tickes is zero');
    }

    const newTicket = movie.tickets - 1;
    const movieId = movie.objectId; 

    return updateMovie(movieId, { tickets: newTicket });

}
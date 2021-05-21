
const elemnts = {
    info: document.querySelector('#infoBox'),
    loading: document.querySelector('#loadingBox'),
    error: document.querySelector('#errorBox')
}

elemnts.info.addEventListener('click', hideInfo);
elemnts.error.addEventListener('click', hideError);


export function showInfo(data) {
    elemnts.info.children[0].textContent = data;
    elemnts.info.style.display = 'block';

    setTimeout(hideInfo, 3000);
}

function hideInfo() {
    elemnts.info.style.display = 'none';
}

export function showError(data) {
    elemnts.error.children[0].textContent = data;
    elemnts.error.style.display = 'block';
}

function hideError() {
    elemnts.error.style.display = 'none'; 
}

let request = 0;

export function startRequest() {
    request ++;
    elemnts.loading.style.display = 'block';
}

export function endRequest() {
    request --;
    if(request === 0 ) {
        elemnts.loading.style.display = 'none';
    }
}

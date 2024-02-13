const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-6',
    headers: {
      authorization: 'b64d6bba-3ca6-4758-9fac-467e7ac2d9e0',
      'Content-Type': 'application/json'
    }
  };

const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    }).then((res) => {
        if (res.ok) {
            return res.json();}
            return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err); 
    }) 
};

const getCard = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    }).then((res) => {
        if (res.ok) {
            return res.json();}
            return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err); 
    }) 
};

const patchUserInfo = (profileName, profileJob) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: profileName.value,
            about: profileJob.value
          })
    }).then((res) => {
        if (res.ok) {
            return res.json();}
            return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err)} )
}

const patchAvatar = (url) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: url
          })
    }).then((res) => {
        if (res.ok) {
            return res.json();}
            return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err)} )
}

const postNewCard = (nameCard, linkCard) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: nameCard,
            link: linkCard
          })
    }).then((res) => {
        if (res.ok) {
            return res.json();}
            return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err)} )
}

const deleteOwnCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    }).then((res) => {
        if (res.ok) {
            return res.json();}
            return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err)} )
}

const putLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      headers: config.headers,
      method: 'PUT',
    }).then((res) => {
        if (res.ok) {
            return res.json();}
            return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err)} )
  };


  const deleteLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      headers: config.headers,
      method: 'DELETE',
    }).then((res) => {
        if (res.ok) {
            return res.json();}
            return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err)} )
    }

export {getCard, getUserInfo, deleteOwnCard, putLike, deleteLike, patchUserInfo, patchAvatar, postNewCard}


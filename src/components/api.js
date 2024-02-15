const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-6',
    headers: {
      authorization: 'b64d6bba-3ca6-4758-9fac-467e7ac2d9e0',
      'Content-Type': 'application/json'
    }
  };

  const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
        return Promise.reject(`Ошибка: ${res.status}`);
    };

const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(handleResponse);
};

const getCard = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(handleResponse);
};

const patchUserInfo = (userName, userAbout) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: userName,
            about: userAbout,
          })
    })
    .then(handleResponse);
}

const patchAvatar = (avatarUrl) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarUrl,
          })
    })
    .then(handleResponse);
}

const postNewCard = (nameCard, linkCard) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: nameCard,
            link: linkCard
          })
    })
    .then(handleResponse);
}

const deleteOwnCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(handleResponse);
}

const putLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      headers: config.headers,
      method: 'PUT',
    })
    .then(handleResponse);
  };


  const deleteLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      headers: config.headers,
      method: 'DELETE',
    })
    .then(handleResponse);
    }

export {getCard, getUserInfo, deleteOwnCard, putLike, deleteLike, patchUserInfo, patchAvatar, postNewCard}


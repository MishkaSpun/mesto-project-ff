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
        const data = res.json();
        return data;
    })
    .catch((err) => {
        return Promise.reject(`Error: ${res.status}`);
    }) 
};

const getCard = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    }).then((res) => {
        const data = res.json();
        return data;
    })
    .catch((err) => {
        return Promise.reject(`Error: ${res.status}`);
    }) 
};

const updateUserInfo = (profileName, profileJob) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: profileName,
            about: profileJob
          })
    }).then((res) => {
        const data = res.json();
        return data;
    })
    .catch((err) => {
        return Promise.reject(`Error: ${res.status}`);
    })
};

const postNewCard = (nameCard, linkCard) => {
    return fetch(`${config.baseUrl}/cards`), {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: nameCard,
            link: linkCard
        }).then((res) => {
            const data = res.json();
            return data;
        })
        .catch((err) => {
            return Promise.reject(`Error: ${res.status}`);
        }) 
    }
};
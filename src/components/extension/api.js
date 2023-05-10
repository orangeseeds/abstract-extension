export const getDataWithDelay = async (
    /** @type {string} */ data,
    delay = 0
) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data)
        }, delay);
    });
};
export const getDataWithDelayAPI = async (
    /** @type {string} */ id,
    delay = 0
) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            getData(id)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    resolve(null);
                    throw Error(error);
                });
        }, delay);
    });
};

export const getData = async (/** @type {string} */ id) => {
    let resource = `https://pokeapi.co/api/v2/ability/${id}`;
    let response = await fetch(resource);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error(`Request failed to ${resource}`);
    }
};

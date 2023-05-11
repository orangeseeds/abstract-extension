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
                    alert(error)
                    reject(null);
                    throw Error(error);
                });
        }, delay);
    });
};

export const getData = async (/** @type {string} */ id) => {
    let resource = `http://localhost:8000/api/status`;
    let response = await fetch(resource);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error("Not allowed!!");
    }
};

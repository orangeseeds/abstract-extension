import { writable } from "svelte/store"

// function createLocalStorageStor(key, initialValue) {
//     const storedValue = localStorage.getItem(key);
//     const initialData = storedValue ? JSON.parse(storedValue) : initialValue;
//
//     const { subscribe, set, update } = writable(initialData);
//
//     subscribe((currentValue) => {
//         localStorage.setItem(key, JSON.stringify(currentValue));
//     });
//
//     return {
//         subscribe,
//         set,
//         update
//     };
// }

const storeToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

const getFromLocalStorage = (key) => {
    let dataFromStorage = localStorage.getItem(key)
    if (dataFromStorage == null) {
        return []
    }
    return JSON.parse(
        dataFromStorage
    )
}

const createLocalStorageStore = (key) => {
    let storageData = getFromLocalStorage(key)
    const { subscribe, set, update } = writable(storageData)

    subscribe((data) => {
        storeToLocalStorage(key, data)
    })

    return {
        subscribe,
        update,
        clear: () => {
            set([])
        },
        set,
    }

}

export const localStore = createLocalStorageStore("extensionData")
export const jwtToken = createLocalStorageStore("jwtToken")

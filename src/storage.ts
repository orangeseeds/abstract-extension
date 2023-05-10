// Template
// Need a parent class storage
// other storage classes can inherit this storage
// a storage can be subscribed to.
// and when subscribed it returns a unsubscribe function.

type IStorage = {
    count: number;
};

const defaultStorage: IStorage = {
    count: 0,
};

export const storage = {
    get: (): Promise<IStorage> =>
        chrome.storage.sync.get(defaultStorage) as Promise<IStorage>,
    set: (value: IStorage): Promise<void> => chrome.storage.sync.set(value),
};

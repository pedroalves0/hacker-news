let storage = {};

export const getLocalStorageItem = key => storage[key];

export const __setItem = (key, value) => { 
    storage[key] = value;
};

export const __reset = () => { 
    storage = {};
};
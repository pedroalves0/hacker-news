let ids = null;
let items = {};
let shouldThrow = false;

export const fetchItemsIds = () => {
    hasError();
    return ids; 
};

export const fetchItem = id => {
    hasError();
    return items[id];

};

export const __setIds = _ids => { 
    ids = _ids;
};

export const __setItems = _items => { 
    items = _items;
};

export const __setShouldThrow = _shouldThrow => {
    shouldThrow = _shouldThrow;
};

export const __reset = () => {
    ids = null;
    items = {};
    shouldThrow = false;
};

function hasError() {
    if (shouldThrow) {
        throw new Error();
    }
}
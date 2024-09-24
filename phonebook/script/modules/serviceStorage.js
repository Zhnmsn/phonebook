


export const getStorage = (key) => {
    const emptyArr = [];
    const localData = JSON.parse(localStorage.getItem(key));
    if(localData === null) {
        return emptyArr;
    }
    return localData;
    };

export const setStorage = (key, obj) => {
    const localData = getStorage(key);
    localData.push(obj);
    let setNewContact = localStorage.setItem('data', JSON.stringify(localData));
    return setNewContact;
};
    
export const removeStorage = (phone) => {
    const localData = getStorage('data');
    for(let i=0; i<localData.length; i++) {
        if(localData[i].phone === phone) {
                localData.splice(i, 1);
            }
    }  localStorage.setItem('data', JSON.stringify(localData));
};
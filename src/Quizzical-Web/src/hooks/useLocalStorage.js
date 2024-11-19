export const useLocalStorage = (key) => {

    const get = () => {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : undefined;
    }
    
    const set = (value) => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
    
    const remove = () => {
        window.localStorage.removeItem(key);
    }
    
    return [ get, set, remove ]
}
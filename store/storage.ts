import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

// Helper function to set data
export const setItem = (key: string, value: string) => {
    storage.set(key, value);
};

// Helper function to get data
export const getItem = (key: string) => {
    return storage.getString(key);
};

// Helper function to remove data
export const removeItem = (key: string) => {
    storage.delete(key);
};

/* eslint-disable no-undef */
export const upload = (eventType, attachTo, callback) => $(document).on(eventType, attachTo, callback);

export const search = (eventType, attachTo, callback) => $(attachTo).on(eventType, attachTo, callback);

export const myUploads = (eventType, attachTo, callback) => $(document).on(eventType, attachTo, callback);

export const showSearch = (eventType, attachTo, callback) => $(document).on(eventType, attachTo, callback);

export const showUploaded = (eventType, attachTo, callback) => $(document).on(eventType, attachTo, callback);

export const showFavorites = (eventType, attachTo, callback) => $(document).on(eventType, attachTo, callback);

export const showTrending = (eventType, attachTo, callback) => $(document).on(eventType, attachTo, callback);



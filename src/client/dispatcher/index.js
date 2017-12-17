const dispatcher = (name, payload) => {
    const customEvent = new CustomEvent(name, {
        detail: { payload }
    });

    document.dispatchEvent(customEvent);
};

export default dispatcher;

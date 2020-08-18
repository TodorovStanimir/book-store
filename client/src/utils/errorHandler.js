const errorHandler = ({ forCheck, showNotification, message }) => {
    if (Array.isArray(forCheck) || forCheck.isAxiosError) {
        showNotification(message ? [{ msg: `${message}` }] : forCheck);
        return true;
    }
    return false;
}

export default errorHandler;

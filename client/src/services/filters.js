export function substr(value, count) {
    const ind = value.substr(count).indexOf(' ');
    return value.substr(0, count + ind) + '....'
}

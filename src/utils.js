export function formatDate(date, includeDay) {
    if (includeDay === false) {
        return new Date(date).toLocaleDateString('en-US', {
            year: "numeric",
            month: "short",
            timeZone: "UTC"
        });
    } else {
        return new Date(date).toLocaleDateString('en-US', {
            year: "numeric",
            month: "short",
            day: "numeric",
            timeZone: "UTC"
        });
    }
}
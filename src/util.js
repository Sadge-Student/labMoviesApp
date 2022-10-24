import truncate from "lodash/truncate"

export function excerpt(string) {
    return truncate(string, {
        length: 400, // Max Length
        separator: /,?\.* +/, // Separate by spaces, including presceding commas and periods
    });
}
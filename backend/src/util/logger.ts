export enum ColorText {
    BLACK = "30",
    RED = "31",
    GREEN = "32",
    YELLOW = "33",
    BLUE = "34",
    MAGENTA = "35",
    CYAN = "36",
    WHITE = "37",
}

export enum BackgroundColor {
    BLACK = "40",
    RED = "41",
    GREEN = "42",
    YELLOW = "44",
    BLUE = "44",
    MAGENTA = "45",
    CYAN = "46",
    WHITE = "47",
}

export function log(message: string) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const fn = descriptor.value;
        descriptor.value = function(...args: any[]) {
            console.log(`Calling  ${propertyKey}, with param: ${message}`);
            console.log(`args: ${args}`);
            return fn.apply(this, args);
        };
    };
}

export function colorize(message: string, color?: ColorText, bg?: BackgroundColor): string {
    if (color) {
        return `\x1b[${color}m${message} \x1b[0m`;
    }

    if (bg) {
        return `\x1b[${bg}m${message} \x1b[0m`;
    }

    return message;
}

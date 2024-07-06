import colors from 'ansi-colors';

export enum LogLevels {
    Debug,
    Info,
    Warn,
    Error,
    Fatal,
}

const prefixes = new Map<LogLevels, string>([
    [LogLevels.Debug, 'DEBUG'],
    [LogLevels.Info, 'INFO'],
    [LogLevels.Warn, 'WARN'],
    [LogLevels.Error, 'ERROR'],
    [LogLevels.Fatal, 'FATAL'],
])

const noColor: (str: string) => string = (msg) => msg
const colorFunctions = new Map<LogLevels, (str: string) => string>([
    [LogLevels.Debug, colors.gray],
    [LogLevels.Info, colors.cyan],
    [LogLevels.Warn, colors.yellow],
    [LogLevels.Error, (str: string) => colors.red(str)],
    [LogLevels.Fatal, (str: string) => colors.red(colors.bold(colors.italic(str)))],
])
function logger({
    Name,
}: {
    logLevel?: LogLevels
    Name?: string
} = {}) {
    function log(level: LogLevels, ...args: any[]) {
        let color = colorFunctions.get(level)
        if (!color) color = noColor

        const date = new Date();
        const log = [
            colors.gray(`[${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB]`),
            colors.gray(`[${date.toLocaleDateString()} ${date.toLocaleTimeString()}]`),
            color(prefixes.get(level) ?? 'DEBUG'),
            Name ? `[Discord -> ${Name}] >` : '>',
            ...args,
        ]

        switch (level) {
            case LogLevels.Debug:
                return console.debug(...log);
            case LogLevels.Info:
                return console.info(...log);
            case LogLevels.Warn:
                return console.warn(...log);
            case LogLevels.Error:
                return console.error(...log);
            case LogLevels.Fatal:
                return console.error(...log);
            default:
                return console.log(...log);
        }
    }

    function setName(name: string, req: boolean) {
        Name = name
        if (req) log(LogLevels.Info, `Name set to ${name}`)
    }

    function debug(...args: any[]) {
        log(LogLevels.Debug, ...args)
    }

    function info(...args: any[]) {
        log(LogLevels.Info, ...args)
    }

    function warn(...args: any[]) {
        log(LogLevels.Warn, ...args)
    }

    function error(...args: any[]) {
        log(LogLevels.Error, ...args)
    }

    function fatal(...args: any[]) {
        log(LogLevels.Fatal, ...args)
    }

    return {
        log,
        setName,
        debug,
        info,
        warn,
        error,
        fatal,
    }
}
export const Logger = logger({ Name: "Client" })
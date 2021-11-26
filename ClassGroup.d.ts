export interface Output {
    [key: string]: string;
}

export type OptionValue = boolean | string | Array<string> | Options;

export interface Options {
    [key: string]: OptionValue;
}

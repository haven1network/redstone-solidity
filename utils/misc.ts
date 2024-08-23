export function env(name: string): string {
    return process.env[name] as string;
}

export function err(msg: string): never {
    throw new Error(msg);
}

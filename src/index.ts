import { spawn } from "child_process";

export function stty(devicePath: string, baudRate: number) {
    const args = [`--file=${devicePath}`, baudRate.toString(), "raw", "-echo", "-echoe", "-echok"];

    return new Promise<void>((resolve, reject) => {
        const process = spawn("stty", args, { detached: false });
        process.on("error", err => reject(err));
        process.on("close", code => {
            if (code === 0) resolve();
            else reject(new Error(`stty exited with a non-zero code (${code})`));
        });
    });
}

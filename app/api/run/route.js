import { NextResponse } from "next/server";
import { exec } from "child_process";
import util from "util";

const execPromise = util.promisify(exec);

export async function POST(req) {
    try {
        const { code } = await req.json();
        if (!code) return NextResponse.json({ error: "No code provided" }, { status: 400 });

        const { stdout, stderr } = await execPromise(`node -e "${code.replace(/"/g, '\\"')}"`);
        return NextResponse.json({ output: stderr || stdout });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

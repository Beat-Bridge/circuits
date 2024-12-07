import { v4 } from "uuid";
export const makeRunCommand = (cwd?: string) => async (command: string) => {
  const { exec } = await import("child_process");
  const { promisify } = await import("util");
  const execAsync = promisify(exec);
  // TODO(security): escape command arguments (use template strings)
  try {
    const { stdout, stderr } = await execAsync(command, {
      cwd,
      maxBuffer: Infinity,
    });
    if (stdout) {
      console.log(stdout);
    }
    if (stderr) {
      console.error(stderr);
    }
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error((error as any).stderr || (error as any).message); // Log only error messages
    throw error;
  }
};


export function generateFixedLengthUUID(length: number) {
  if (length > 36) {
    throw new Error("Length cannot exceed 36 for a UUID.");
  }
  return v4().toString().replace(/-/g, "").slice(0, length);
}

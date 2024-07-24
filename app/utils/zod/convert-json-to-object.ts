export function convertJsonToObject(json: string): any {
  try {
    return JSON.parse(json);
  } catch {
    throw new Error('Invalid address');
  }
}
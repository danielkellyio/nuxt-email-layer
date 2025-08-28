import { vi } from "vitest";

/**
 * Mock the useStorage function to store data in a global object
 * This is a workaround to avoid the need to use a real storage provider in the tests
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockedStorage: Record<string, any> = {};

vi.stubGlobal("useStorage", () => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setItem: async (key: string, value: any) => {
      mockedStorage[key] = value;
      return value;
    },
    getItem: async (key: string) => {
      return mockedStorage[key];
    },
    removeItem: async (key: string) => {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete mockedStorage[key];
      return true;
    },
  };
});

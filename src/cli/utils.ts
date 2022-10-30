export const validOrExist = (predicate: boolean, existMessage: string) => {
  if (predicate) {
    console.error(existMessage);
    process.exit(1);
  }
};

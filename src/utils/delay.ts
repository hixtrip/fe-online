function delay<T>(data: T, time: number = 400): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), time);
  });
}

export default delay;

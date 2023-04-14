import { dequeue } from "./store";

export const submit = async (urls: string[]): Promise<void> => {
  // put array to api.
  const endpoint =
    "https://asia-northeast1-seioclub.cloudfunctions.net/dqx9mbrpz1jhx";

  await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ urls }),
  });
};

export const upload = (): void => {
  dequeue().then(
    (keys: string[]) => {
      console.log(keys);
    },
    () => {}
  );
};

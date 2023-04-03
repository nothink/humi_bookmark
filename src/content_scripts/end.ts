const unuseds = ["ambHeader", "ambFooter"];

const remove = (ids: string[]): void => {
  ids.forEach((id: string) => {
    document.getElementById(id)?.remove();
  });
};

remove(unuseds);

export {};

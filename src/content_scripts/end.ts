/**
 * document_endで発火するcontent_scripts
 */
const unuseds = ["ambHeader", "ambFooter"];

/**
 * いらない要素を削除する
 * @param ids elementのid
 */
const remove = (ids: string[]): void => {
  ids.forEach((id: string) => {
    document.getElementById(id)?.remove();
  });
};

/**
 * document_end時のメインエントリポイント
 */
const main = (): void => {
  remove(unuseds);
};

main();
export {};

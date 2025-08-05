module.exports = async (tp) => {
  const file = tp.file;
  const title = file.title;

  const folderPath = `${file.folder}/${title}`;
  await tp.system.mkdir(folderPath);

  new Notice(`Subfolder created: ${folderPath}\nUse Note Refactor and choose this folder.`);

  return '';
};

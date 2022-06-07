export const getStylesForCategory = (categoryId) => {
  if (categoryId) {
    const Colors = require("./categoryColors.json");

    const { color, img } = Colors.categoryColors.find(
      (category) => category.id == categoryId
    );

    return [color, img];
  }
  return "";
};

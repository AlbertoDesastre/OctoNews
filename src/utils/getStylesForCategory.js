export const getStylesForCategory = (categoryName) => {
  if (categoryName) {
    const Colors = require("./categoryColors.json");

    const { color, img } = Colors.categoryColors.find(
      (category) => category.name == categoryName.toLowerCase()
    );

    return [color, img];
  }
  return "";
};

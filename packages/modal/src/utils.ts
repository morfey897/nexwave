export const totalHeight = (element: Element | null | undefined) => {
  if (!element || typeof element.getBoundingClientRect != "function") return 0;
  const rect = element.getBoundingClientRect();
  const height = rect.height;
  const style = window.getComputedStyle(element);
  const totalHeight = ["top", "bottom"]
    .map((side) => parseInt(style["margin-" + side], 10))
    .reduce((total, side) => total + side, height);
  return totalHeight;
};

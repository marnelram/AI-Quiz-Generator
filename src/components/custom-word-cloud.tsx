"use client";

import { useTheme } from "next-themes";
import D3WordCloud from "react-d3-cloud";

// Fake Data
const data = [
  {
    text: "Hey",
    value: 3,
  },
  {
    text: "Hi",
    value: 3,
  },
  {
    text: "Computer",
    value: 10,
  },
  {
    text: "nextjs",
    value: 15,
  },
  {
    text: "live",
    value: 2,
  },
];

const fontSizeMapper = (word: { value: number }) => {
  return Math.log2(word.value) * 5 + 16;
};

/** packages: react-d3-cloud **SECURITY VULERABLE**
 *
 * @returns
 */
export default function CustomWordCloud() {
  const theme = useTheme();
  return (
    <D3WordCloud
      height={550}
      font="Times"
      fontSize={fontSizeMapper}
      rotate={0}
      padding={10}
      fill={theme.theme == "dark" ? "white" : "black"}
      data={data}
    />
  );
}

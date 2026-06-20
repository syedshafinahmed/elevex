import localFont from "next/font/local";
import { Sansation } from "next/font/google";

export const trunkey = localFont({
  src: [
    {
      path: "../../public/fonts/Trunkey.otf",
      weight: "400",
      style: "normal",
    },
  ],
});

export const pinkAverage = localFont({
  src: [
    {
      path: "../../public/fonts/PinkAverage.otf",
      weight: "400",
      style: "normal",
    },
  ],
});

export const sansation = Sansation({
  weight: "400",
});

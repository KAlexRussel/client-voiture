import { BoxProps } from "@mui/system";
import { MotionProps } from "framer-motion";



export type TextAnimateProps = BoxProps &
  MotionProps & {
    text: string;
  };
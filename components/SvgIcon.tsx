import { Icon } from "@mui/material";
import Image from "next/image";

type SvgProps={
    height?:number,
    width?:number,
    src:string
}

export default function SvgIcon({
    height,width,src,...rest
}:SvgProps){

    return      <Icon
    sx={{
      textAlign: "center",
      height,
      width,
    }}
    {...rest}
  >
    <Image
      alt=""
       width={0}
       height={0}
      style={{
     
          display: "flex",
          height: "inherit",
          width: "inherit",
      
      }}
      src={`/static/${src}`}
    />
  </Icon>
}
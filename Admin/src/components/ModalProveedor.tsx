import React from "react";
import Image from "../../node_modules/next/image";
import Logo from "../../public/LogoBloque.png";
import { Copy } from "lucide-react";
import { Separator } from "./ui/separator";

export default function ModalProveedor() {
  return (
    <div className="flex flex-col justify-center items-center h-[655px] rounded-lg w-[823px] bg-slate-500">
      <div className="flex border h-[360px] w-[763px]">
        <Image
          src={Logo}
          alt="Green Circle"
          width={1000}
          height={46}
          className="w-full h-full basis-6/12"
        />
        <div className="basis-6/12">
          <h2 className="text-[20px] font-bold mt-[20px]">
            Lorem ipsum dolor sit amet
          </h2>
          <div className="flex items-center text-[#589A74] py-[10px]">
            <Copy className="mr-2 h-4 w-4" /> Santiago de Querétaro, Querétaro
          </div>
          <Separator />
          <div className="flex items-center text-[#589A74] py-[10px]">
            <Copy className="mr-2 h-4 w-4" /> Sabinos 190, Jurica, 76100,
            Querétaro
          </div>
          <Separator />
          <div className="flex items-center text-[#589A74] py-[10px]">
            <Copy className="mr-2 h-4 w-4" /> 442-123-4567
          </div>
          <Separator />
          <div className="flex items-center text-[#589A74] py-[10px]">
            <Copy className="mr-2 h-4 w-4" /> 442-123-4567
          </div>
          <Separator />
          <div className="flex items-center text-[#589A74] py-[10px]">
            <Copy className="mr-2 h-4 w-4" /> www.mitec.com.mx
          </div>
          <h2 className="text-[14px] font-bold mt-[20px]">Documentos</h2>
          <div className="bg-black rounded w-[60px] flex flex-col items-center">
            <Image
              src={Logo}
              alt="Green Circle"
              width={46}
              height={46}
              className="w-[50px] h-[50px] basis-6/12"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

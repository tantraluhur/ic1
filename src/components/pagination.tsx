import "../styles/index.css"
import React from "react";

interface PaginationProps {
    pages:string,
    select:boolean,
    arrow:boolean,
    direction:string,
    check:boolean,
}

const Pagination = ({
    pages,
    select,
    arrow,
    direction,
    check,

}: PaginationProps): JSX.Element => {
    return (
        <div className={`${check? "bg-white": "bg-[#919EAB] border-none opacity-50"} 
                        bg-white w-6 h-6 rounded flex justify-center items-center 
                        ${select? "border-[#4200FF] border-2":""} 
                            border-2`}>

            <p className={arrow? `arrow ${direction}`: `font-bold text-xs ${select?"text-[#4200FF]":""}`}>
                {pages}
            </p>

        </div>
      );
}
  
export default Pagination;
  
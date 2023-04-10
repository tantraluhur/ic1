import "../styles/index.css"
import dollarImage from "../images/dolar.png"
import React from "react";

interface ExpensesProps {
    total:string
}

const Expenses = ({
    total,
}: ExpensesProps): JSX.Element => {

    return (
        <div className="bg-white w-[24rem] h-28 rounded-lg flex flex-col justify-start gap-y-2 pr-20 pl-6 pt-3" >
            <p className="font-bold text-xl">Current Expenses</p>
            <div className="flex items-center gap-x-3">
                <div className="w-8">
                    <img src={dollarImage} alt="logo"></img>
                </div>
                <div className="text-[#19A7CE] font-bold text-lg">
                    <p>{total},00</p>
                </div>
            </div>
        </div>
      );
}
  
export default Expenses;
  
import "../styles/index.css"
import homeImage from "../images/house.png"
import dollarImage from "../images/dolar.png"
import carImage from "../images/car.png"
import foodImage from "../images/food.png"
import drinkImage from "../images/drink.png"
import React from "react";
import { useNavigate } from 'react-router-dom';




interface Detail {
    amount:string;
    name:string;
    id: string;
    type:string;
    image:any;
    date:string;
    notes:string;
    time:string;
}

const Detail = ({
    amount,
    name,
    id,
    type,
    image,
    date,
    notes,
    time,
}: Detail): JSX.Element => {
    const categoryImage = {
        "Food" : foodImage,
        "Transportation" : carImage,
        "Housing" : homeImage,
        "Personal Spending" : drinkImage
    }
    const images = categoryImage[image]
    const navigate = useNavigate();

    function handleClick() {
        navigate(-1);
    }

    return (
        <div className="flex flex-col w-4/5 items-center">
            <div className="self-start text-white font-bold text-2xl">
                <div className="flex gap-x-2 items-center">
                    <button onClick={handleClick}>
                        <div className="text-3xl">
                            &larr; 
                        </div>
                    </button>
                    <button onClick={handleClick}>
                        <div>
                            Back
                        </div>
                    </button>
                </div>
            </div>
            <div className="bg-white w-[34.188rem] h-[32.813rem] rounded-lg flex flex-col justify-start pr-12 pl-12 pt-12 pb-12 gap-y-5" >
                <div className="flex justify-between">
                    <div className="flex justify-center items-center gap-x-2">
                        <div className="w-12">
                            <img src={images} alt="logo" />
                        </div>
                        <div className="text-xs font-medium">
                            {name}
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <div className="w-7">
                            <img src={dollarImage} alt="logo" />
                        </div>
                        <div className="text-[#19A7CE] font-bold text-sm">
                            {amount},00
                        </div>
                    </div>
                </div>
                <hr className="w-[27rem] border-black border-[1px] border-solid"/>
                <div className="font-semibold text-xs">
                    Transaction Details
                </div>
                <div className="flex justify-between">
                    <div className="text-xs">
                        ID
                    </div>
                    <div className="text-xs font-bold">
                        {id}
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="text-xs">
                        Type
                    </div>
                    <div className="text-xs font-bold">
                        {type}
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="text-xs">
                        Time
                    </div>
                    <div className="text-xs font-bold">
                    {date}, {time} WIB
                    </div>
                </div>
                <hr className="w-[27rem] border-black border-[1px] border-solid"/>
                <div className="font-semibold text-xs">
                    Notes
                </div>
                <div className="text-xs font-medium overflow-auto">
                    {notes}
                </div>
            </div>
        </div>
      );
}
  
export default Detail;
  
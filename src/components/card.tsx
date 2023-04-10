import "../styles/index.css"
import homeImage from "../images/house.png"
import dollarImage from "../images/dolar.png"
import carImage from "../images/car.png"
import foodImage from "../images/food.png"
import drinkImage from "../images/drink.png"
import React from "react";

interface CardProps {
    categoryName:string;
    desc: string;
    price:string;
    image:any;
}

const Card = ({
    categoryName,
    desc,
    price,
    image
}: CardProps): JSX.Element => {
    const categoryImage = {
        "Food" : foodImage,
        "Transportation" : carImage,
        "Housing" : homeImage,
        "Personal Spending" : drinkImage
    }
    const images = categoryImage[image]
    return (
        <div className="bg-white w-[44rem] h-28 rounded-lg flex justify-between items-center pr-20 pl-4" >
          <div className="flex gap-x-4 justify-center items-center">
              <div className="w-11">
                  <img src={images} alt="logo"/>
              </div>
              <div>
                  <p className="text-xs">{categoryName}</p>
                  <p className="text-base font-medium">{desc}</p>
              </div>
          </div>
          <div className="flex gap-x-4 justify-center items-center">
              <div className="w-8">
                  <img src={dollarImage} alt="dolar logo"/>
              </div>
              <div className="text-[#19A7CE] font-bold">
                  {price},00
              </div>
          </div>
        </div>
      );
}
  
export default Card;
  
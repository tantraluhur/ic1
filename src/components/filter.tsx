import "../styles/index.css"
import filterImage from "../images/filter.png"
import homeImage from "../images/house.png"
import carImage from "../images/car.png"
import foodImage from "../images/food.png"
import drinkImage from "../images/drink.png"
import iconImage from "../images/Icon.png"
import React, { useContext } from "react";


import { DataContext } from '../DataProvider.js';


interface ExpensesProps {
    func:Function
}

const Expenses = ({
    func,
}: ExpensesProps): JSX.Element => {

    const { selectedFilter, setSelectedFilter, currentPage, setCurrentPage, min, setMin, max, setMax, filter } = useContext(DataContext);

    return (
        <div className="bg-white w-[24rem] h-[24.5rem] rounded-lg flex flex-col pl-10 pt-7 gap-y-4" >
            <div className="flex items-center gap-x-5">
                <div className="w-6">
                    <img src={filterImage}/>
                </div>
                <div className="font-bold text-xl">
                    <p>Filters</p>
                </div>
            </div>
            <div className="font-bold text-xs">
                <p>Filter by Transaction Category</p>
            </div>
            <div className="flex flex-col">
                <div className="flex items-center gap-x-2 items-center">
                    <div className="pt-1">
                        <input type="checkbox" onChange={() => func("Housing")} checked={filter["Housing"] === ""? false: true}/>
                    </div>
                    <div className="w-6">
                        <img src={homeImage} alt="logo"/>
                    </div>
                    <div className="font-semibold text-xs">
                        <p>Housing</p>
                    </div>
                </div>

                <div className="flex items-center gap-x-2">
                    <div className="pt-1">
                        <input type="checkbox" onChange={() => func("Food")} checked={filter["Food"] === ""? false: true}/>
                    </div>
                    <div className="w-6">
                        <img src={foodImage} alt="logo"/>
                    </div>
                    <div className="font-semibold text-xs">
                        <p>Food</p>
                    </div>
                </div>

                <div className="flex items-center gap-x-2">
                    <div className="pt-1">
                        <input type="checkbox" onChange={() => func("Transportation")} checked={filter["Transportation"] === ""? false: true}/>
                    </div>
                    <div className="w-6">
                        <img src={carImage} alt="logo"/>
                    </div>
                    <div className="font-semibold text-xs">
                        <p>Transportation</p>
                    </div>
                </div>

                <div className="flex items-center gap-x-2">
                    <div className="pt-1">
                        <input type="checkbox" onChange={() => func("Personal Spending")} checked={filter["Personal Spending"] === ""? false: true}/>
                    </div>
                    <div className="w-6">
                        <img src={drinkImage} alt="logo"/>
                    </div>
                    <div className="font-semibold text-xs">
                        <p>Personal Spending</p>
                    </div>
                </div>
            </div>
            <hr className="w-80 border-black border-[1px] border-solid"/>
            <div className="font-bold text-xs">
                <p>Filter by Expenses Range</p>
            </div>
            <div className="flex gap-x-3">
                <div className="flex flex-col">
                    <div className="text-xs italic font-medium self-center">
                        Min
                    </div>
                    <div className="w-28 h-8 border-black border-[1px] rounded-lg flex items-center justify-start gap-x-2 pl-3">
                        <div className="w-4">
                            <img src={iconImage} alt="logo"/>
                        </div>
                        <div className="text-xs font-bold self-center">
                            <input className="w-14 pl-2 pr-2" placeholder="100" value={min === ""? "" : min}
                            onChange={(event) => func({Min: event.target.value})}/>
                        </div>
                    </div>
                </div>
                <hr className="w-16 border-black border-[1px] border-solid self-center mt-4"/>
                <div className="flex flex-col">
                    <div className="text-xs italic font-medium self-center">
                        Max
                    </div>
                    <div className="w-28 h-8 border-black border-[1px] rounded-lg flex items-center justify-start gap-x-2 pl-3">
                        <div className="w-4">
                            <img src={iconImage} alt="logo"/>
                        </div>
                        <div className="text-xs font-bold self-center">
                            <input className="w-14 pl-2 pr-2" placeholder="200" value={max === ""? "" : max}
                            onChange={(event) => func({Max: event.target.value})}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
}
  
export default Expenses;
  
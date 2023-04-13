import Card from "../components/card.tsx"
import CardExpenses from "../components/expenses.tsx"
import CardFilter from "../components/filter.tsx"
import Pagination from "../components/pagination.tsx"

import "../styles/index.css"

import { Link } from "react-router-dom"

import { DataContext } from '../DataProvider.js';


import { useEffect, useState, useContext } from "react";

function Home() {
  const { selectedFilter, setSelectedFilter, currentPage, setCurrentPage, min, setMin, max, setMax, filter } = useContext(DataContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [secLoading, setSecLoading] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [detailExpenses, setdetailExpenses] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [current, setCurrent] = useState(0);
  const [pagesRange, setPagesRange] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [currentFilter, setCurrentFilter] = useState("");
  const [category, setCategory] = useState([]);
  const [filterPrice, setFilterPrice] = useState("");

  const URL = "https://utbmu5o3smxuba2iverkgqqj440temhn.lambda-url.ap-southeast-1.on.aws" 
  
  const calculatePageNumber = () => {
    const pages = []
    if(totalPages <= 5){
      for(let i = 1; i <= totalPages ; i++){
        pages.push(i)
      }
    }
    else {
      pages.push(1)
      if(hasPreviousPage){
        if((currentPage - 1) - 1 > 1){
          pages.push("...")
        }
        if(currentPage - 1 !== 1){
          pages.push(currentPage-1)
        }
      }
      if(currentPage !== 1 && currentPage !== totalPages){
        pages.push(currentPage)
      }
      if(hasNextPage){
        if(currentPage + 1 !== totalPages){
          pages.push(currentPage + 1)
        }
        if(totalPages - (currentPage + 1) > 1){
          pages.push("...")
        }
      }
      pages.push(totalPages)
    }
    setPagesRange(pages)
    setSecLoading(true)
  }

  const handleFilter = (value) => {
    let temp = ""
    let max = ""
    let min = ""
    if(filter[value]){
      filter[value] = ""
    }
    else {
      filter[value] = value
    }
    if(value['Max'] !== undefined){
      max = value['Max']
      setMax(max)
    }

    if(value['Min']  !== undefined){
      min = value['Min']
      setMin(min)
    }
    category.map((categories) => {
      if(filter[categories.name]){
        if(temp === ""){
          temp += categories.id
        }
        else {
          temp += "," + categories.id
        }
      }
      return ""
    })
    setSelectedFilter(temp)
    setCurrentPage(1)
  }

  const fetchCategoryData = async () => {
    let response = await fetch(`${URL}/expenses/category`)
    const data = await response.json()
    setCategory(data)
  }

  const fetchExpensesData = async () => {
    let customURL = ""
    if(currentPage == null){
      customURL = `${URL}/expenses?page=${1}&limit=${4}`
    }
    else {
      customURL = `${URL}/expenses?page=${currentPage}&limit=${4}`
    }
    if(selectedFilter !== ""){
      customURL += `&category_id=${selectedFilter}`
    }
    if(min !== "" && max !== "" && Number(min) <= Number(max)) {
      customURL += `&min_price=${min}`
      customURL += `&max_price=${max}`
    }
    try {
      let response = await fetch(`${customURL}`);
      const data = await response.json();
      setExpenses(data);
      setCurrentPage(data.paging.page);
      setTotalPages(data.paging.pageCount);
      setHasNextPage(data.paging.hasNextPage);
      setHasPreviousPage(data.paging.hasPreviousPage);
      setCurrent(data.paging.page);
      setCurrentFilter(selectedFilter);
      setFilterPrice(data);
    }
    catch (error) {
      setError(error)
    }
  }

  const fetchExpensesDetailData = async () => {
    try {
      const item = await Promise.all(expenses.data.map(async (items) => {
        let response = await fetch(`${URL}/expenses/${items.id}`)
        const data = await response.json()
        items['name'] = data.name;
        return items;
      }))
      setdetailExpenses(item)
    }
    catch (error) {
      setError(error)
    }
    setIsLoading(true)
  }

  const fetchTotalExpensesData = async () => {
    try{
      let response = await fetch(`${URL}/expenses/total`)
      const data = await response.json()
      setTotalExpenses(data.total)
    }
    catch (error){
      setError(error)
    }
  }

  const changePage = (selectedPage = null, next = false, prev = false) => {

    if(selectedPage == null && next){
      setCurrentPage(currentPage + 1)
    }
    else if(selectedPage == null && prev){
      setCurrentPage(currentPage - 1)
    }
    else if(selectedPage !== null){
      setCurrentPage(selectedPage)
    }

  }
  useEffect(() => {
    fetchTotalExpensesData()
    fetchCategoryData()
   }, [])

  useEffect(() => {
    fetchExpensesData()
  }, [currentPage, selectedFilter, min, max])
  
  useEffect(() => {
    if(expenses.data) {
      fetchExpensesDetailData()
    }
  }, [expenses])
  
  useEffect(() => {
    calculatePageNumber()
  }, [current, currentFilter, filterPrice])
  
  if(error){
    return <div>ERROR</div>
  }
  
  if (!isLoading || !secLoading){
    return <div>LOADING..</div>
  }
  return (
    <div className="h-screen flex justify-center items-center gap-x-10">
      <div className="flex flex-col gap-y-7 justify-start items-center h-[37rem]">
        {
          detailExpenses.map((items)=>{
            return <Link to={`/detail/${items.id}`}>
                    <Card 
                      key={items.id} 
                      categoryName={items.category.name} 
                      price={items.amount} 
                      desc={items.name}
                      image={items.category.name}>
                      </Card>
                  </Link>
          })
        }
        <div className="flex gap-x-4">
          <button disabled={hasPreviousPage?false:true} onClick={() => changePage(null, false, true)}>
            <Pagination check={hasPreviousPage} 
                        selected={false} 
                        arrow={true} 
                        direction="left" 
                      />
          </button>
                      
          {
            pagesRange.map((number, index) => {
             return  <button disabled={number==="..."?true:false} key={`${number} - ${index}`} onClick={() => changePage(number, false, false)}>
                        <Pagination check={true} selected={false} arrow={false} pages={number} select={currentPage===number?true:false}/>
                     </button>
            })
          }

          <button disabled={hasNextPage?false:true} onClick={() => changePage(null, true, false)}>
            <Pagination check={hasNextPage} 
                        selected={false} 
                        arrow={true} 
                        direction="right" 
                      />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-y-7 justify-start h-[37rem]">
          <CardExpenses total={totalExpenses}/>
          <CardFilter func={handleFilter}/>
      </div>
    </div>
  );
  }
  
  export default Home;
  
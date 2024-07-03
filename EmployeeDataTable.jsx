import React, {useState} from 'react'
import { CiMenuKebab } from "react-icons/ci"; 
import { GrEdit } from "react-icons/gr";

const EmployeeDataTable = () => {

    let [head,setHead]=useState(["DATE","CHECH IN","CHECH OUT","STATUS","ACTION"]);
    let [data,setData]=useState([{"id": 1, "DATE":"22 OCT, 2023", "CHECH IN":"05:51 am","CHECH OUT":"12:01 pm","STATUS":"PRESENT"},
                {"id": 2, "DATE":"01 FEB, 2023", "CHECH IN":"01:08 am","CHECH OUT":"05:49 pm","STATUS":"PRESENT"},
                {"id": 3, "DATE":"08 SEP, 2023", "CHECH IN":"05:36 am","CHECH OUT":"11:23 pm","STATUS":"LEAVE"},
                {"id": 4, "DATE":"21 SEP, 2023", "CHECH IN":"11:49 am","CHECH OUT":"07:40 pm","STATUS":"PRESENT"},
                {"id": 3, "DATE":"17 OCT, 2023", "CHECH IN":"02:02 am","CHECH OUT":"11:49 pm","STATUS":"LEAVE"},
                {"id": 5, "DATE":"24 MAY, 2023", "CHECH IN":"02:34 am","CHECH OUT":"10:41 pm","STATUS":"PRESENT"}])
  

  return (
    <div className=' sm0:overflow-x-scroll sm0:ml-[20%] sm:text-xl sm0:w-[80%] md:ml-[7vw] md:w-[92vw] md:overflow-hidden ' >
        
    <div className="sm0:ml-[2vw] rounded-xl  sm0:w-[800px]  sm0:overflow-X-scroll md:w-[90vw] h-[45vh]  border shadow-lg   " >
       
         <div className='flex justify-around font-bold h-[16%]  w-[100%] '  >
           {head.map((title)=><><span className='sm0:mt-2 sm0:ml-[65px]'>{title}</span></>)}
         </div>
       
         <div className=' md:text-lg lx:text-sm flex flex-col h-[80%] w-[100%] '>
         {
           data.map(e=>
       
           <div key={e.id} className=' flex justify-around h-[80%] w-[100%]' >
             <span className='md:ml-2 '>{e.DATE}</span>
             <span className='md:mr-12 sm0:ml-12'>{e['CHECH IN']}</span>
             <span className='md:mr-12 sm0:ml-12'>{e['CHECH OUT']}</span>


             <span className= { 
               e.STATUS === "PRESENT" ? 
               "text-green-500 text-sm border border-green-500 rounded-xl md:p-0 md:px-2 md:mt-2 md:mr-12 sm0:ml-12 sm0:mr-6 sm0:h-6 sm0:px-2" :
               "text-red-500   text-sm border border-red-500   rounded-xl md:p-0 md:px-2 md:mt-2 md:mr-[6%] sm0:ml-12 sm0:mr-12 sm0:h-6 sm0:px-2"
               }>{e['STATUS']}</span>
             <span className='flex gap-2 '>
             

               <button className='flex border border-blue-600 text-blue-600 h-[70%] w-[100%] rounded-md mt-2 p-0  '>
               <GrEdit className='mt-1 mr-1' /><span>Edit</span>
               </button>
               <button className='border border-blue-600 text-blue-600 h-[70%] w-[100%] rounded-md mt-2 p-1'> 
                   <CiMenuKebab className='text-blue-600'/>
               </button>
             </span>

           </div>)
         }
         </div>
   </div>
</div>
  )
}

export default EmployeeDataTable
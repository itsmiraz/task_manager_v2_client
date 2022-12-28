import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from '../../Components/LoadingAnimation/LoadingAnimation';
import { AuthContext } from '../../Context/UserContext';
const MyTask = () => {
    // const tasks = useSelector((state) => state.tasks.value)
    const { user } = useContext(AuthContext)
    // console.log(tasks)
    const { data: tasks=[],isLoading,refetch } = useQuery({
        queryKey: ['task'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/tasks?email=${user.email}`)
            const data = res.json()
            return data
        }
    })
    const [undone, setundone] = useState([])
    const navigate = useNavigate()

   
    useEffect(() => {
        
            const undoneTask = tasks.filter(task => !task.done)
            console.log(undoneTask)
    
            setundone(undoneTask)

       
    }, [tasks])

    const [open, setopen] = useState('')


    const accordianOpenClose = (id) => {
        if (id === open) {
            setopen('')
        }
        else {

            setopen(id)
        }
    }


    const handledelete = (id) => {
        console.log(id);
        fetch(`http://localhost:5000/task/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.error('Deleted')
                refetch()
            })
    }


    const handleDone = (id) => {
        fetch(`http://localhost:5000/donetask/${id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success('Great')
                navigate('/completed')
                refetch()
            })

    }
    if (isLoading) {
        return <LoadingAnimation></LoadingAnimation>
    }

    return (
        <section >
            <h1 className='text-start font-semibold text-xl my-4 mx-4 md:mx-10 text-white'>My Task</h1>
            <div>
                {
                    undone?.length === 0 ?
                        <div className='flex justify-center items-center m-20'>
                            <p className='text-xl font-semibold'>
                                You Dont Have Any Task Left
                            </p>



                        </div>
                        :
                        <>

                            {
                                undone?.map((task, i) =>
                                    <div key={task._id} id="accordion-collapse" className=' md:w-[500px] mx-4 md:mx-10 my-2 bg-gray-900 font-semibold rounded-md' data-accordion="collapse">
                                        <h2 className='flex items-center px-2'>

                                            <span>{i + 1}.</span>
                                            <button onClick={() => accordianOpenClose(task._id)} type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500   dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 " data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
                                                <span className='text-white'>{task.title}</span>
                                                {/* <svg data-accordion-icon className={`w-6 h-6 shrink-0 ${open === task._id ? 'rotate-180' : ' rotate-360 '}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg> */}
                                            </button>
                                            <button onClick={() => handleDone(task._id)} className='px-4 py-1 rounded text-gray-800 bg-white  '>
                                            Completed
                                            </button>
                                        </h2>
                                        <div className={`${open === task._id ? '' : 'hidden'} bg-gray-800  rounded-md  duration-200 ease-in p-2 font-semibold`} aria-labelledby="accordion-collapse-heading-1">
                                            <img src={task.image} alt="" />
                                            <p className='bg-gray-700 my-2 p-2 w-full text-white font-normal text-sm shadow-lg rounded-md '>
                                                {
                                                    task.details
                                                }
                                            </p>
                                            <button className='px-4 py-1 bg-red-600 text-white' onClick={() => handledelete(task._id)}>Delete</button>
                                        </div>
                                    </div>

                                )
                            }
                        </>
                }

            </div>








        </section>
    );
};

export default MyTask;
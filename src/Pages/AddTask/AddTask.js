import React, { useEffect } from 'react';
import uploadimg from '../../assets/images/cloud-upload-regular-240.png'
const AddTask = () => {
  
    const handleform = event => {
        event.preventDefault()
        console.log('submited')
        const form = event.target;
        const title = form.title.value;
        const details = form.details.value;
        const task = {
            title,
            details
        }
        console.log(task);
    
    }

    // useEffect(() => {
    //     const listener = event => {
    //       if (event.code === "Enter" || event.code === "NumpadEnter") {           
    //         handleform()
    //       }
    //     };
    //     document.addEventListener("keydown", listener);
    //     return () => {
    //       document.removeEventListener("keydown", listener);
    //     };
    //   }, []);
 
    return (
        <div>
            <h1 className='text-start font-semibold text-xl mx-10 text-white'>Add Task</h1>
            <div>
                <form onSubmit={handleform} className='w-96 bg-gray-800 p-4 shadow-2xl mx-auto flex justify-center flex-col' action="">
                    <div className=' relative flex flex-col justify-center '>
                        <img className='w-24 mx-auto' src={uploadimg} alt="" />
                        <input className='' type="file" />
                        <p className='font-semibold text-sm mt-2 text-white'>Tittle</p>
                        <input required name='title' className='my-2 p-2 rounded text-gray-900 font-semibold shadow-md' type="text" placeholder='Add a Title' />
                        <p className='font-semibold text-sm mt-2 text-white'>Details</p>
                        <textarea name='details' className='my-2 p-2 text-gray-900 font-semibold rounded shadow-md'   id="" placeholder='Add Some Details'></textarea>
                            <button type='submit' className='px-4 py-2 my-2 bg-orange-600 text-white rounded'>Add</button>
                    </div>


                </form>
            </div>

        </div>
    );
};

export default AddTask;
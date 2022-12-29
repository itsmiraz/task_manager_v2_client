import React, { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import uploadimg from '../../assets/images/cloud-upload-regular-240.png'
import { AuthContext } from '../../Context/UserContext';
const AddTask = () => {

    const { user, } = useContext(AuthContext)
    const imgHostKey = process.env.REACT_APP_imgbbKey
    const [animation, setanimation] = useState(false)
    const navigate = useNavigate()
    const [fileList, setFileList] = useState([]);
    const [previewImg, setPreviewImg] = useState(undefined)

    const handleform = event => {
        const image = previewImg
        event.preventDefault()
        console.log('submited')
        const form = event.target;
        const title = form.title.value;
        const details = form.details.value;
        const task = {
            title,
            userEmail: user.email,
            details,
            done: false,
            comments:[],
            image
        }
        fetch(`https://task-manager-v2-server.vercel.app/task`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                form.reset()
                setPreviewImg(undefined)
                navigate('/')

                toast.success('Added')
            })
        console.log(task);

    }


    useEffect(() => {
        if (fileList?.target?.files[0]) {

            const filesize = fileList?.target?.files.item(0).size
            const filemb = filesize / 1024
            if (filemb > 500) {
                toast.error('Please Upload a photo under 500kb')
            }
            else {

                const image = fileList?.target?.files[0];
                console.log(image)
                setanimation(true)
                const formData = new FormData();
                formData.append('image', image);
                const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`
                fetch(url, {
                    method: 'POST',
                    body: formData,
                })
                    .then(res => res.json())
                    .then(imgData => {
                        console.log(imgData)
                        setPreviewImg(imgData?.data?.url)
                        setanimation(false)
                        // setSave(true)
                    })
            }
        }

    }, [fileList?.target?.files, imgHostKey])

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
            <h1 className='text-start font-semibold text-xl my-4 mx-10 text-white'>Add Task</h1>
            <div>
                <form onSubmit={handleform} className='w-full md:w-96 bg-gray-800 p-4 shadow-2xl mx-auto flex justify-center flex-col' action="">
                    <div className=' relative flex flex-col justify-center '>

                        {
                            previewImg ?
                                <div className='w-full h-[120px] overflow-hidden'>
                                    <img src={previewImg} className='w-full ' alt="" />
                                </div>
                                :
                                <>

                                    {
                                        animation ?
                                            <div className='w-full h-24 bg-gray-700 animate-pulse'>
                                            </div>
                                            :
                                            <div className='relative '>
                                                <img className='w-24 mx-auto' src={uploadimg} alt="" />

                                                <input onChange={setFileList} className='h-[120px] opacity-0 absolute top-0 w-full bg-red-400' type="file" />
                                            </div>
                                    }


                                </>
                        }
                        <p className='font-semibold text-sm mt-2 text-white'>Tittle</p>
                        <input required name='title' className='my-2 p-2 rounded text-gray-900 font-semibold shadow-md' type="text" placeholder='Add a Title' />
                        <p className='font-semibold text-sm mt-2 text-white'>Details</p>
                        <textarea name='details' className='my-2 p-2 text-gray-900 font-semibold rounded shadow-md' id="" placeholder='Add Some Details'></textarea>
                        {
                            animation ?
                                <>
                                    <span>Please for wait until the image loads</span>
                                    <button type='submit' disabled className='px-4 py-2 my-2 bg-blue-600 text-white rounded'>Add</button>

                                </>
                                :
                                <>
                                    <button type='submit' className='px-4 py-2 my-2 bg-blue-600 text-white rounded'>Add</button>
                                </>
                        }
                    </div>


                </form>
            </div>

        </div>
    );
};

export default AddTask;
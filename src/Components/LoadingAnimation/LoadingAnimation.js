import React from 'react';
import { HashLoader } from 'react-spinners';

const LoadingAnimation = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
            <HashLoader color="#36a1d6" />
        </div>
    );
};

export default LoadingAnimation;
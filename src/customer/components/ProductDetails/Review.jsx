import { Rating } from '@mui/material';
import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { commentService } from '../../apiServices/productService';

const Review = ({data}) => {
    const [comment, setComment] = useState('');
    const [rate, setRate] = useState(0);
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.id : null;
    

    const handleCommentChange = (event) => {
      setComment(event.target.value);
    };
    const handleRate = (event) => { 
        setRate(event.target.value);
    }
    let averageRate;
    if (data?.previews && data.previews?.length > 0) {
    const totalRate = data.previews?.reduce((acc, preview) => acc + preview.rate, 0);
    averageRate =Math.round(totalRate / data.previews.length);
  } else {
    console.log("Không có dữ liệu hoặc mảng previews rỗng.");
  }
  const fetchComent = async () => {
    try {
        const cmt = await commentService(rate, comment, userId, data?.id);
        console.log("Comment success:", cmt);
    } catch (error) {
        console.error("Error fetching:", error);
    }
};
const handleSubmit =(event)=>{
    
    fetchComent();
    console.log("Submit success:");
}
  
  return (
    <section className="flex items-center py-16 bg-gray-100 font-poppins dark:bg-gray-800 ">
        <div className="justify-center flex-1 max-w-6xl px-4 py-6 mx-auto lg:py-4 md:px-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="p-6 mb-6 bg-gray-50 dark:bg-gray-900">
                    <h2 className="mb-6 text-xl font-semibold text-left font-gray-600 dark:text-gray-400">
                        Ratings & Reviews</h2>
                    <div className="flex justify-start ">
                        <div
                            className="flex items-center mb-2 space-x-2 text-3xl leading-none text-gray-600 dark:text-gray-400 ">
                            <div className="items-center font-bold ">{averageRate?averageRate:''}</div>
                            <div className="items-center">
                            <Rating name="read-only" value={averageRate?averageRate:''} readOnly />
                            </div>
                        </div>
                    </div>
                    <div className="mb-6 text-xs dark:text-gray-400">{data.previews?.length} customer reviews</div>
   
                </div>
                <div className="p-6 mb-6 bg-white dark:bg-gray-900">
                    <h2 className="mb-6 text-xl font-semibold text-left font-gray-600 dark:text-gray-400">
                        Leave a comment</h2>
                    <form action="" className="">
                        <div className="mb-6 ">
                        <Rating
                            className='ml-4'
                            name="read-only"
                            value={rate}
                            onChange={handleRate}
                            readOnly={false}
                            />

                        <textarea
                            type="message"
                            placeholder="write a comment"
                            required=""
                            value={comment}
                            onChange={handleCommentChange}
                            className="block w-full px-4 leading-tight text-gray-700 bg-gray-100 border rounded dark:placeholder-gray-500 py-7 dark:text-gray-400 dark:border-gray-800 dark:bg-gray-800"
                        ></textarea>
                        </div>
                        <div className="">
                           {userId?<button
                             onClick={handleSubmit}
                                className="px-4 py-2 text-xs font-medium text-gray-100 bg-blue-500 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-700">
                                Submit comment
                            </button>:"" } 
                        </div>
                    </form>
                </div>
            </div>
            <div className="p-6 dark:bg-gray-900 bg-gray-50 max-h-[400px] overflow-y-auto">
                {data.previews?.map((item, index) => (
                    <div className="flex flex-wrap items-center mb-4 space-x-2" key={index}>
                    <div className="flex self-start flex-shrink-0 cursor-pointer">
                        <img
                        src={item?.imageUrl != null ? item?.imageUrl : "https://icons.veryicon.com/png/o/miscellaneous/administration/account-25.png"}
                        alt=""
                        className="object-fill w-16 h-16 rounded-full"
                        />
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                        <div className="block">
                        <div className="w-auto px-2 pb-2">
                            <div className="font-medium">
                            <div className="text-lg font-semibold dark:text-gray-400 hover:underline">
                                <small>{item?.userName} </small> <Rating className='ml-4' name="read-only" value={item?.rate?item.rate:''} readOnly />
                            </div>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                            {item?.content}
                            </div>
                        </div>
                        <div className="flex items-center justify-start w-full text-xs">
                            <div className="flex items-center justify-center px-2 space-x-1 font-semibold text-gray-700 dark:text-gray-400">
                            <span className="self-center">.</span>
                            <div className="hover:underline">
                                <span>Reply</span>
                            </div>
                            <span className="self-center">.</span>
                            <div className="hover:underline">
                            <span>
                                {item && item.createDate && (
                                    format(parseISO(item.createDate), 'dd/MM/yyyy HH:mm:ss')
                                )}
                                </span>

                            </div>
                            </div>
                        </div>
                        {item.repPreviews?.map((rep, repIndex) => (
                            <div className="flex flex-wrap ml-5 items-center mt-4 mb-4 space-x-2" key={repIndex}>
                                <div className="flex self-start flex-shrink-0 cursor-pointer">
                                        <SupervisorAccountIcon></SupervisorAccountIcon>
                                </div>
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="block">
                                    <div className="w-auto px-2 pb-2">
                                        <div className="font-medium">
                                        <div className="text-lg font-semibold dark:text-gray-400 hover:underline">
                                            <small>admin:{rep.content}</small>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-start w-full text-xs">
                                        <div className="flex items-center justify-center px-2 space-x-1 font-semibold text-gray-700 dark:text-gray-400">
                                        <span className="self-center">.</span>
                                        <span className="self-center">.</span>
                                        <div className="hover:underline">
                                             {rep && rep.createDate && (
                                    format(parseISO(rep.createDate), 'dd/MM/yyyy HH:mm:ss')
                                )}
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                        ))}
                        </div>
                    </div>
                    </div>
                ))}
            </div>

        </div>
    </section>
  )
}

export default Review

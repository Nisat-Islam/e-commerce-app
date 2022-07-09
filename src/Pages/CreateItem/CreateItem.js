import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdMoney } from 'react-icons/md';

import { categoryData, ratingData } from '../../utils/dataProvider';

import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from '../../firebase/firebase.config';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import PageLoading from '../../utils/PageLoading';
import { RiImageAddFill } from 'react-icons/ri';
const CreateItem = () => {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [uploadProgress, setUploadProgress] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState('');
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = (e) => {
    let imageFile = e.target.files[0];

    const storageRef = ref(
      storage,
      `Images/${Date.now()} - ${imageFile.name}-${Math.random()}`
    );

    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setIsLoading(true);
        setUploadProgress(progress);
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setIsLoading(false);
          setImageAsset(downloadURL);
        });
      }
    );
  };
  const saveDetails = (e) => {
    e.preventDefault();
    if (!title || !price || !imageAsset || !rating || !category) {
      setFields(true);
      setAlertStatus('danger');
      setMsg('No fields can be empty');
      setTimeout(() => {
        setFields(false);
      }, 4000);
    } else {
      const ref = collection(db, 'foods');
      addDoc(ref, {
        id: Math.random() + Date.now(),
        title: title,
        rating: rating,
        price: price,
        category: category,
        imageURL: imageAsset,
      });
      clearFields();
    }
  };
  const clearFields = () => {
    setTitle('');
    setRating('');
    setPrice('');
    setCategory('');
    setImageAsset(null);
  };

  const handleDelete = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setIsLoading(false);
      setFields(true);
      setMsg('Image deleted successfully');
      setAlertStatus('successful');
      setImageAsset(null);
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };
  return (
    <div className="bg-slate-900 border-b border-orange-400">
      <div className="bg-gradient-to-tr from-orange-300 to-orange-400  w-full h-full flex items-center justify-center pt-16 rounded-tl-full rounded-br-full">
        <div className="bg-slate-900 w-[90%] md:w-[75%] flex flex-col gap-2 border border-orange-400 rounded-lg p-4 shadow-md shadow-slate-700">
          <div className="flex md:flex-row flex-col gap-2">
            {' '}
            <div className="w-full shadow-sm shadow-orange-300 py-2 flex gap-2 items-center justify-center rounded-md bg-slate-800 px-2">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-full  outline-none bg-transparent font-semibold text-lg placeholder:text-orange-300 placeholder:italic text-orange-400"
                placeholder="Enter Product Name..."
              />
            </div>
            <div className="w-full">
              <select
                className="w-full bg-slate-800 text-orange-300 outline-none font-semibold text-[1.1rem] p-2  rounded-md cursor-pointer shadow-sm shadow-orange-300"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option
                  value="other"
                  className=" text-[1.1rem]
            ] "
                >
                  Select Category
                </option>
                {categoryData &&
                  categoryData.map((food) => (
                    <option
                      className=" bg-orange-400  text-[1.1rem] text-headingColor font-semibold odd:bg-slate-900 odd:text-orange-400"
                      key={food.id}
                      value={food.urlParamName}
                    >
                      {food.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className=" flex flex-col md:flex-row items center gap-2">
            <select
              className=" w-full outline-none font-semibold text-[1.1rem] p-2 shadow-sm shadow-orange-300 rounded-md cursor-pointer bg-slate-800 text-orange-400 tracking-wide "
              onChange={(e) => setRating(e.target.value)}
              value={rating}
            >
              <option
                value="other"
                className=" bg-slate-800 text-orange-300 text-[1.1rem
            ] "
              >
                Initial Rating
              </option>
              {ratingData.map((rate) => (
                <option
                  className=" bg-slate-800 outline-0 border-none text-[1.1rem] text-orange-400 font-semibold border-2 border-slate-800 even:bg-slate-900"
                  key={ratingData.indexOf(rate)}
                  value={rate}
                >
                  {rate}
                </option>
              ))}
            </select>
            <div className="w-full p-2 flex gap-2 items-center justify-center bg-slate-800 shadow-sm shadow-orange-400  rounded-md">
              <MdMoney className="text-xl text-green-400" />
              <input
                required
                className=" w-full h-full border-none outline-none bg-transparent font-semibold text-lg placeholder:text-orange-300  text-orange-400 italic"
                placeholder=" Enter Product Price..."
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>
          </div>

          <div
            className={`relative mt-3 group flex 
         flex-col items-center 
         justify-center border-4 
         border-double w-full 
         h-225 md:h-370 
         border-orange-500  ${
           isLoading ? 'cursor-wait' : 'cursor-pointer'
         } rounded-lg`}
          >
            {isLoading ? (
              <div className="text-orange-400 font-semibold">
                <div className="bg-orange-400 flex items-center justify-center">
                  <PageLoading />
                </div>
                {!imageAsset ? (
                  <p>Upload is {Math.round(uploadProgress)} % done</p>
                ) : (
                  <p>Delete is {Math.round(uploadProgress)} % done</p>
                )}
              </div>
            ) : (
              <>
                {!imageAsset ? (
                  <>
                    <label className="group flex flex-col items-center justify-center w-full h-full cursor-pointer">
                      <div className="flex flex-col items-center justify-center w-full h-full gap-3">
                        <RiImageAddFill className="text-4xl text-orange-400 group-hover:text-orange-500 group-hover:animate-bounce" />
                        <p className="text-lg text-orange-400 group-hover:text-orange-500">
                          Upload Product Image
                        </p>
                      </div>
                      <input
                        type="file"
                        required
                        accept="image/*"
                        className="w-0 h-0"
                        onChange={uploadImage}
                      />
                    </label>
                  </>
                ) : (
                  <div className=" w-full flex items-center justify-center">
                    <div className="w-full">
                      <img
                        alt="upload"
                        className=" w-full h-[200px] md:h-370 object-contain md:py-3"
                        src={imageAsset}
                      />
                    </div>
                    <div className="absolute w-full h-full">
                      <p
                        className="w-[130px] ml-1 mt-1 flex bg-gradient-to-tr from-slate-800 to-slate-900
                       rounded-md items-center justify-center mr-auto text-orange-300 font-semibold whitespace-nowrap p-2 border-2 border-orange-400"
                        onClick={handleDelete}
                      >
                        Delete Image
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {fields && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
                alertStatus === 'danger'
                  ? 'bg-red-600'
                  : 'bg-emerald-400 text-emerald-800'
              }`}
            >
              {msg}
            </motion.p>
          )}
          <div className="w-full flex items-center mt-2">
            <button
              type="button"
              className="bg-gradient-to-t from-slate-800 to-slate-900 hover:bg-gradient-to-t hover:from-slate-900 hover:to-slate-800 border border-orange-300 w-full h-full   md:py-3 md:px-7 rounded-md py-2 font-semibold text-orange-300 hover:text-orange-400"
              onClick={saveDetails}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateItem;

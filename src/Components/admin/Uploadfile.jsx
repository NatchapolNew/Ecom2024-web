import React, { useState } from "react";
import { toast } from "react-toastify";
import Resize from "react-image-file-resizer";
import { removeFiles, uploadFiles } from "../../Api/Product";
import { data } from "autoprefixer";
import useEcomStore from "../../Store/ecom-store";
import { Loader } from 'lucide-react';


const Uploadfile = ({ form, setForm }) => {
  //Javascript
  const [isLoading, setIsLoading] = useState(false);
  const token = useEcomStore((state) => state.token);


  const handleOnChange = (e) => {
    //code
    setIsLoading(true)
    const files = e.target.files;
    if (files) {
      setIsLoading(true);
      let allFiles = form.images; //[] empty array
      for (let i = 0; i < files.length; i++) {
        console.log(files[i]);

        //validate
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} not image`);
          continue;
        }

        //image resize
        Resize.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (data) => {
            //endpoint backend
            uploadFiles(token, data)
          
              .then((res) => {
                console.log(res)
                toast.success("Upload Image Success!!!");
                allFiles.push(res.data);
                setForm({
                  ...form,
                  images: allFiles,
                })
                setIsLoading(false)
              })
              .catch((err) => {
                console.log(err);
                setIsLoading(false)
              });
          },
          "base64"
        );
      }
    }
  };

  const handleDelete = (public_id) => {
    const images = form.images
    console.log(public_id);
    removeFiles(token,public_id)
    .then((res)=>{
      const filterImages = images.filter((item,index)=>{
          return item.public_id !== public_id
      })
      console.log('filterimages',filterImages)
      toast.error(res.data)
      setForm({
        ...form,
        images:filterImages
      })
    })
    .catch((err)=>{
      console.log(err)
    })
  };

  return (
    <div className="my-4">
      <div className="flex mx-4 gap-4 my-4">
        {
          isLoading && <Loader className="w-16 h-16 animate-spin" />
        }
        {/*image*/}
        {form.images.map((item, index) => (
          <div className="relative " key={index}>
            <img
              className="w-24 h-24 hover:scale-105 hover:cursor-pointer"
              src={item.url}
              alt=""
            />
            <span
              onClick={() => handleDelete(item.public_id)}
              className="absolute top-0 right-0
               bg-red-500 p-1 rounded-md cursor-pointer"
            >
              x
            </span>
          </div>
        ))}
      </div>
      <div>
        <input type="file" name="images" multiple onChange={handleOnChange} />
      </div>
    </div>
  );
};

export default Uploadfile;

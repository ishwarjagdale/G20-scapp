import {deleteImage, newImage} from "../../api/adminAPI";
import {notify} from "../../components/notifier";
import {UilMultiply, UilSpinner} from "@iconscout/react-unicons";
import FallBackImage from "../../images/fallback.png";
import ImagePagination from "../../components/ImagePagination";
import React, {useState} from "react";

function ImageUpload({id, images, setImages}) {

    const [current, setCurrent] = useState(0);
    const [uploading, setUploading] = useState(false);

    const _deleteImage = (index) => {
        if(id) {
            notify("Deleting image!", 'info');
            deleteImage(id, images[index]).then((res) => {
                if(res.status === 200) {
                    notify("Image deleted", 'success')
                    setImages(images.filter((i) => i !== images[index]));
                    setCurrent(Math.min(current, images.length - 1));
                }
            }).catch((err) => {console.log(err); notify(err.response.data.message, 'failed')})
        }
    }

    const setFile = (file, f) => {
        let reader = new FileReader()
        reader.onload = f;
        console.log(file);
        reader.readAsDataURL(file)
    }

    const uploadImage = (e) => {
        for(let file of e.target.files) {
            setFile(file, (f) => {
                const formData = new FormData();
                formData.append(`image-${images.length}`, file)
                setUploading(true);
                notify("Uploading Image", 'info')
                newImage(id, formData).then((res) => {
                    if(res.status === 200) {
                        notify("Image uploaded!", 'success');
                        setImages([...(new Set([...images, ...res.data.urls]))])
                        setUploading(false)
                    }
                }).catch((err) => notify(err.data.response, 'failed'));
            })
        }
    }


    return (
        <div className={"flex flex-col w-full md:px-4 relative"}>
            {
                !uploading ? images[current] && <button onClick={() => _deleteImage(current)} className={"absolute rounded-full right-6 p-2 top-2 bg-black hover:bg-slate-700"}><UilMultiply size={'16px'} color={"white"}/></button>
                :
                    <span className={"absolute rounded-full right-6 p-2 bg-green-400 top-2 hover:bg-slate-700 animate-spin"}><UilSpinner size={'16px'} color={"black"}/></span>
            }
            <button onClick={() => {
                id ?
                document.getElementById('imageInput').click()
                    :
                    notify("Create a new monument first", "info")
            }} className={"w-full h-fit scale-98 rounded-2xl"}>
                <input id={'imageInput'} onChange={uploadImage} type={"file"} hidden={true} multiple={true}/>
                <img src={images[current] || ""} onError={(e) => e.target.src = FallBackImage} className={"w-full h-[150px] object-cover rounded-2xl"} alt={""} />
            </button>
            <ImagePagination k={id} setCurrent={setCurrent} length={images.length} current={current} />
        </div>
    )
}

export default ImageUpload

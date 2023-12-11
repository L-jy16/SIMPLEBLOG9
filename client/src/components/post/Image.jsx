import React from 'react'
import axios from 'axios';

const Image = (props) => {

    const FileUpload = (e) => {
        // console.log(e.target.files);
        const formData = new FormData();
        formData.append("file", (e.target.files[0]));
        // for (const keyValu of formData) {console.log(keyValu) }

        axios.post("/api/post/image/upload", formData)
            .then((response) => {
                console.log(response);
                props.setImage(response.data.filePath)
            })

    }

    return (
        <div>
            <input
                type='file'
                accept='imge/*'
                onChange={(e) => FileUpload(e)}
            />
        </div>
    )
}

export default Image

import React from 'react';
import SelectedImagesVideoName from '../UploadImage/SelctedImagesVideoTitle';

const FilesNameContainer=({fileNameArray})=>{

    return(
        <div>
            {
                fileNameArray.map((name,index)=>(
                    <SelectedImagesVideoName
                        key={index}
                        name={name.name}
                    />
                ))
            }
        </div>
    )
}
export default FilesNameContainer;
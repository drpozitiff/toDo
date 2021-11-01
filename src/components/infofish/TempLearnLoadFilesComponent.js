import React, {useState} from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDg_iiLmZkYjp0Ku8WP3L87G6oegAyjSsI",
    authDomain: "fish-app-b7f31.firebaseapp.com",
    projectId: "fish-app-b7f31",
    storageBucket: "fish-app-b7f31.appspot.com",
    messagingSenderId: "209301878446",
    appId: "1:209301878446:web:dec2044c6c2df83dab9f3f"
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export const TempLearnLoadFilesComponent = () => {
    const [imgSrc, setImgSrc] = useState({});
    const [files, setFiles] = useState([]);
    const [uploadFlag, setUploadFlag] = useState(false);
    const props = {
        multi: true,
        accept: ['.png', '.jpg', 'jpeg', '.gif'],
    };

    const changeHandler = (event) => {
        if(!event.target.files.length) {console.log(1); return};
        const files = Array.from(event.target.files);
        setFiles(files);
        let imgSrcs = {};
        files.forEach((file, index) => {
            if(!file.type.match('image')){console.log(2); return};
            console.log("file", file)
            const reader = new FileReader();

            reader.onload = ev => {
                let dynoKey = file.name;
                imgSrcs = {
                    ...imgSrcs, [dynoKey] : {
                        result: ev.target.result,
                        removing: '',
                        percentage: ''
                    }
                };
                setImgSrc(imgSrcs);
            };
            reader.readAsDataURL(file)
        })
    };

    const removeHandler = (key, imgSrcs, setImgSrcs) => {
        const newImgSrc = JSON.parse(JSON.stringify(imgSrcs));
        const {[key]: foo, ...newObj} = newImgSrc;
        console.log("newObj", newObj)
        setTimeout(() => {
            setImgSrcs(newObj);
        }, 350)
    };

    const addRemovingFlag = (key, imgSrc, setImgSrc) => {
        const newImgSrc = JSON.parse(JSON.stringify(imgSrc));
        Object.keys(newImgSrc).forEach((elem) => {
            if(key === elem) {
                newImgSrc[key].removing = 'removing';
                setImgSrc(newImgSrc);
            }
        })
    };

    const uploadHandler = (images) => {
        setUploadFlag(true);
        images.forEach((img) => {
            // const ref = storage.ref(`images/${img.name}`)
            const storageRef = ref(storage, `images/${img.name}`);
            const uploadTask = uploadBytesResumable(storageRef, img);
            uploadTask.on('state_changed', snapshot => {
                const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
                const newImgSrc = JSON.parse(JSON.stringify(imgSrc));
                Object.keys(newImgSrc).forEach((elem) => {
                    if(img.name === elem) {
                        newImgSrc[elem].percentage = percentage + '%';
                        setImgSrc(newImgSrc);
                    }
                })
            }, error => {
                console.log(error)
            },
            () => {
                console.log('Complete')
            })
        });
    };

    return (
        <div style={{marginTop: 50}}>
            <div className="card">
                <label htmlFor="file">
                    <input
                        onChange={changeHandler}
                        style={{display: 'none'}}
                        type="file"
                        id="file"
                        multiple={props.multi && true}
                        accept={props.accept && Array.isArray(props.accept) && props.accept.join(',')}
                    />
                    <IconButton sx={{color: 'black'}} aria-label="upload picture" component="span">
                        <PhotoCamera />
                    </IconButton>
                </label>
                <div className="preview">
                    {Object.keys(imgSrc).map((key) => {
                        console.log('imgSrc---',imgSrc);
                        return (
                            <div key={key} className={`preview-image ${imgSrc[key].removing}`}>
                                {!uploadFlag && <div className="preview-remove"
                                     onClick={() => {
                                         removeHandler(key, imgSrc, setImgSrc);
                                         addRemovingFlag(key, imgSrc, setImgSrc);
                                     }}
                                >&times;</div>}
                                <img style={{width: '100%', height: '100%', display: 'block', objectFit: 'cover'}} src={imgSrc[key].result} alt={key} />
                                <div className="preview-info" style={!uploadFlag ? {} : {bottom: 0}}>
                                    {!uploadFlag && <span>{key}</span>}
                                    {uploadFlag && <div
                                        style={!uploadFlag ? {} : {width: imgSrc[key].percentage}}
                                        className="preview-info-progress">{imgSrc[key].percentage}</div>}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div>{Object.keys(imgSrc).length !== 0 && <Button onClick={()=>uploadHandler(files)}>Upload</Button>}</div>
            </div>
        </div>
    )
};
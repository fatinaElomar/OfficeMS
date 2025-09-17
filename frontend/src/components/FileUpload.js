import React, { useRef, useState } from 'react';

export default function FileUpload({ onFiles }){
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const onChange = (e) => {
    const arr = Array.from(e.target.files || []);
    setFiles(arr);
    onFiles && onFiles(arr);
  };
  return (
    <div className='file-upload'>
      <input ref={inputRef} type='file' multiple onChange={onChange} style={{ display:'none' }} />
      <button className='btn' onClick={()=>inputRef.current?.click()}>Upload files</button>
      <ul>
        {files.map((f)=> <li key={f.name}>{f.name}</li>)}
      </ul>
    </div>
  );
}



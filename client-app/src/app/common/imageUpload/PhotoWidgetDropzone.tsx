import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

export default function PhotoWidgetDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
     console.log(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  )
}
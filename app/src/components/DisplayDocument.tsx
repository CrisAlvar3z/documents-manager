import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { API_MEDIA_URL } from '../helpers/defaults';
const FileViewer = require('react-file-viewer-extended');

const DisplayDocument = () => {
  const params = useParams();
  const [fileType, setfileType] = useState<string | undefined>(params.media?.split('.')[1])
  const [documentUri, setDocumentUri] = useState<string | undefined>(API_MEDIA_URL+params.media)
  return (
    <>
      <main className='m-10'>
        <div className='flex align-center justify-between mb-5'>
          <h1 className='text-1xl mb-4'>Vizualizando documento {params.media} </h1>
          <button
            className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'
            onClick={() => window.history.back()}
          >
            Volver
          </button>
        </div>
        <div className='border'>
          {
            fileType === 'pdf' || fileType === 'docx' ? 
            (
              <FileViewer
                fileType={fileType}
                filePath={documentUri}
                onError={console.log('error')}
              />             
            ) : (
              <iframe 
                src={'http://localhost:8000/media/documents/routes.txt'}
                width="100%"
                height="800"
                title="Iframe Example"
              ></iframe>
            )
          }
        </div>
      </main>
    </>
  )
}

export default DisplayDocument

// <iframe 
//   src={'http://localhost:8000/media/documents/Front_Desafío_NfFjMat.pdf'}
//   width="100%"
//   height="500"
//   title="Iframe Example"
// ></iframe>
// <iframe 
//   src={'http://localhost:8000/media/documents/routes.txt'}
//   width="100%"
//   height="500"
//   title="Iframe Example"
// ></iframe>
// <FileViewer
//   fileType={fileType}
//   filePath={documentUri}
//   onError={console.log('error')}
// />
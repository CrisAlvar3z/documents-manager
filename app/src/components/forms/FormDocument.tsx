import { useState } from 'react';
import HttpClient from '../../helpers/provider';
import { FileUploader } from "react-drag-drop-files";
import { PhotoIcon } from '@heroicons/react/24/solid';

const fileTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"];

interface FormUpdateDocumentProps {
  mode: 'create' | 'edit';
  document?: any;
  onCreate?: any;
  onEdit?: any;
  onClose?: () => void;
}

interface File {
  name: string;
  type: string;
  size: number;
  data: any;
}

export default function FormUpdateDocument({ mode, document, onCreate, onEdit, onClose }: FormUpdateDocumentProps) {
    const [name, setName] = useState(document?.name || '');
    const [description, setDescription] = useState(document?.description || '');
    const [file, setFile] = useState<File>();
    const [error, setError] = useState<string>();

    const handleChange = (file: any) => {
      //only accept PDF / DOC / TXT
      console.log(file.type)
      if (!fileTypes.includes(file.type)) {
        setError("Tipo de archivo no permitido");
        return false;
      } else {
        setError(undefined);
      }
      setFile(file);
    };

    const onSubmit = (event: any) => {
      event.preventDefault();

      let data: { name: string; description?: string; file:File | undefined; updated_at?: string } = { name, description, file };

      console.log(data)
      if (mode === 'create') {
        HttpClient.postForm('documents/', data)
          .then((response: any) => {
            if(response.error) {
              console.log(response.error) 
              setError('Porfavor complete todos los campos')
            } else {
              setName('');
              setDescription('');
              onCreate?.(response.data);
              onClose?.();
            }
    
          })
          .catch((error) => {
            console.log('Here');
            console.log(error);
          });
      } else if (mode === 'edit') {
        //if data.description is empty, then delete it from the data object
        // if (!data.description) {
        //   delete data.description;
        // }
        HttpClient.patchForm(`documents/${document.id}/`, data)
          .then((response: any) => {
            if(response.error) {
              setError('Porfavor complete todos los campos')
            } else {
              onEdit?.(document.id, response.data);
              onClose?.();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };


    return (
        <form onSubmit={onSubmit}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                Nombre
                </label>
                <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                Descripción
                </label>
                <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                Archivo
                </label>
                <FileUploader handleChange={handleChange} name="file">
                  <div className="col-span-full">
                    <div className={(error ? 'border-red-600' : 'border-gray-900/25') + ' mt-2 flex justify-center rounded-lg border border-dashed px-6 py-10 '}>
                      <div className="text-center">
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                        {
                          !error ? 
                          (<>
                            <div className="mt-4 flex text-sm leading-6 text-gray-600" style={{ minWidth: '190px' }}>
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                              >
                                <span>Sube un archivo</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                              </label>
                              <p className="pl-1">o arrastra y suelta</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PDF, TXT, DOCX</p>
                          </>) : (
                            <div className="mt-4 flex text-sm leading-6 text-red-600" style={{ minWidth: '190px' }}>
                              <p className="">{error}</p>
                            </div>
                          )
                        }
                      </div>
                    </div>
                  </div>
                </FileUploader>
                { file && <p>Archivo cargado: {file.name}</p> }
            </div>
            <div className="flex justify-end">
                <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                >
                {mode === 'create' ? 'Crear documento' : 'Guardar cambios'}
                </button>
            </div>
        </form>
    );
}

import { useEffect, useState } from "react"
import ListDocuments from "../components/ListDocuments"
import HttpClient from "../helpers/provider"
import Modal from "../components/Modal"
import FormUpdateDocument from "../components/forms/FormDocument"

type Document = {
  id: number,
  name: string,
  description: string,
  file: string,
  uploaded_at: string,
  updated_at: string
}
const Inicio = () => {
  const [documents, setDocuments] = useState<Document[]>()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState();
  const [mode, setMode] = useState('create');

  const handleEdit = (document: any) => {
      setEditingDocument(document);
      setMode('edit');
      handleOpenModal()
  };

  const handleCreate = (document: any) => {
    setMode('create');
    handleOpenModal()
  };

  const handleOpenModal = () => {
      setIsModalOpen(true);
  }

  const handleDelete = (documentId: any) => {
      setMode('delete');
      setEditingDocument(documentId);
      setIsModalOpen(true);
  };

  const handleModalClose = () => {
      setIsModalOpen(false);
      setEditingDocument(undefined);
  };

  useEffect(() => {
    HttpClient.get('documents').then((response) => {
      console.log(response.data)
      setDocuments(response.data)
    }
    ).catch((error) => {
      console.log(error)
    })
  }
  , [])

  const onCreate = (data: Document) => {
    setDocuments((documents: any) => {
      return [...documents, data];
    })
  }

  const onDelete = (id: number) => {
    HttpClient.delete(`documents/${id}`)
      .then((response) => {
        setDocuments((documents: any) => {
          if (documents) {
            return documents.filter((document: Document) => document.id !== id);
          } else {
            return [];
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onEdit = (id: number, data: Document) => {
    data.updated_at = new Date().toISOString();
    setDocuments((documents: any) => {
      if (documents) {
        return documents.map((document: Document) => {
          if (document.id === id) {
            return { ...document, ...data };
          } else {
            return document;
          }
        });
      } else {
        return [];
      }
    });
  };
  return (
    <>
        <main className="bg-white px-4 py-12 sm:px-6 lg:px-8">
            <section className="max-w-5xl mx-auto"> 
              <div className="flex justify-between items-center mb-10">
                <h1 className="text-center sm:text-2xl md:text-4xl"> Mis documentos </h1>
                <button 
                  className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded"
                  onClick={handleCreate}
                >
                  Nuevo documento
                </button>
              </div>
              <div className="border rounded p-5">
                <ListDocuments documents={documents as Document[]} onEdit={handleEdit} onDelete={handleDelete}/>
              </div>
            </section>
            { isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={handleModalClose} title={mode} >
                    { mode === 'create' || mode === 'edit' ? (
                        <FormUpdateDocument
                            mode={mode as any}
                            document={editingDocument}
                            onEdit={onEdit}
                            onCreate={onCreate}
                            onClose={handleModalClose}
                        />) :
                        (
                            <>
                                <section className='flex flex-col items-center'>
                                    <h1 className='text-center font-bold text-xl m-3'>
                                        ¿Estas seguro que deseas eliminar el documento?
                                    </h1>
                                    <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                                        onClick={() => {
                                            handleModalClose()
                                            onDelete(editingDocument as any)
                                        }}
                                    >Si, Borrar</button>
                                </section>
                            </>
                        )
                    }
                </Modal>)
            }
        </main>
    </>
  )
}

export default Inicio
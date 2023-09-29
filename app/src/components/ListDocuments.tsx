import { TrashIcon, PencilSquareIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'

export default function ListDocuments(
    { documents, onEdit, onDelete }: 
    { documents: any[]; onEdit: any; onDelete: any }) {
    return (
        <>
            <ul className="divide-y divide-gray-100">
                {documents ?
                    documents.map((document: any) => (
                        <li key={document.id} className="flex min-w-0 justify-between gap-x-6 py-5 ">
                            <div className="flex flex-col min-w-0 gap-x-4">
                                {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={document.imageUrl} alt="" /> */}
                                <div className="flex min-w-0 gap-x-4">
                                    <div style={{ minWidth: '70px'}}>
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{document.name}</p>
                                    </div>
                                    <div className="md:flex  md:items-start md:justify-between gap-2">
                                        <p className="hidden md:block mt-1 text-xs leading-5 text-gray-500">{decodeURI(document.file).toString()}</p>
                                        <a
                                            href={'/documentos/'+decodeURI(document.file).toString().split('/').pop()}
                                        >
                                            <ArrowTopRightOnSquareIcon className="mt-1 h-5 w-5 text-black-400" />
                                        </a>
                                    </div>
                                </div>
                                <p className="mt-2 text-xs leading-5 text-gray-500 italic">{document.description}</p>
                            </div>

                            <div className="flex sm:flex sm:items-center gap-10">
                                <div className='hidden xs:flex xs:flex-col'>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">Uploaded: {new Date(document.uploaded_at).toLocaleString()}</p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">Updated: {new Date(document.updated_at).toLocaleString()}</p>
                                </div>
                                <div className="shrink-0 flex gap-2">
                                    <button
                                        onClick={() => onEdit(document)}
                                    >
                                        <PencilSquareIcon className="h-6 w-6 text-yellow-400" />
                                    </button>

                                    <button
                                        onClick={() => onDelete(document.id)}
                                    >
                                        <TrashIcon className="h-6 w-6 text-red-400" />
                                    </button>
                                </div>
                            </div>
                        </li>
                    )) : (null)
                }
            </ul>
        </>
    )
}
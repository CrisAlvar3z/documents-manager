import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon, PlusCircleIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/24/solid'


const Modal = (props: any) => {
    const [open, setOpen] = useState(props.isOpen)
    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => props.onClose()}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white flex items-center px-4 pb-4 pt-5 sm:p-6 sm:pb-4 gap-4">
                                    {
                                        props.title === 'edit' ? (
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <PencilSquareIcon className="h-6 w-6 text-yellow-600" aria-hidden="true" />
                                            </div>
                                        ) : props.title === 'create' ?
                                        (
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <PlusCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                            </div>
                                        ) :
                                        (
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                            </div>
                                        )
                                    }
                                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                        {props.title === 'create' ? 'Creando' : props.title === 'edit' ? 'Editando' : 'Eliminando'
                                        } documento
                                    </Dialog.Title>
                                    <div className="ml-auto"> {/* This div will be on the right */}
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center hover:bg-gray-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                                                <button
                                                    type="button"
                                                    onClick={() => props.onClose()}
                                                    ref={cancelButtonRef}
                                                >
                                                    <XMarkIcon className='h-6 w-6 text-black' />
                                                </button>
                                            </div>
                                    </div>
                                </div>
                                <div className="w-3/4 mx-auto">
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <div className="mt-2 mb-8">
                                            {props.children}
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>

                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
export default Modal;

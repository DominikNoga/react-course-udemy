import React, { useRef } from 'react'
import Input from './ui/Input'

export default function CreateProject({ onCancelClick, onCreateProject }) {
    const titleInputRef = useRef();
    const descInputRef = useRef();
    const dateInputRef = useRef();

    const getNewProjectData = () => ({
        id: Math.floor(Math.random() * 1000000),
        title: titleInputRef.current.value,
        description: descInputRef.current.value,
        date: dateInputRef.current.value,
        tasks: []
    });

    return (
        <di className='w-[35rem] mt-16'>
            <menu className='flex items-center justify-end gap-4 my-4'>
                <li>
                    <button className='text-stone-800 hover:text-stone-950' onClick={onCancelClick}>Cancel</button>
                </li>
                <li>
                    <button
                        className='px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950'
                        onClick={() => onCreateProject(getNewProjectData())}>
                        Save
                    </button>
                </li>
            </menu>
            <div>

                <Input label={'Title'} type='text' ref={titleInputRef} />
                <Input label={'Description'} isTextarea ref={descInputRef} />
                <Input label={'Due Date'} type='date' ref={dateInputRef} />
            </div>
        </di>
    )
}

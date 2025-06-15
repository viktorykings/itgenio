import React, { useState } from 'react'

const Form = () => {
    const [text, setText] = useState<string>('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!text) return

        await Meteor.callAsync("rooms.insert", {
            title: text.trim(),
            canvasData: '',
            createdAt: new Date(),
        });

        setText('')
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <label className='form-label'>
                Название комнаты
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    type="text"
                    className='form-input'
                    placeholder='Введите название' />
            </label>
            <button className='submit-btn' type='submit'>Создать</button>
        </form>
    )
}

export default Form
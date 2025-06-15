import React, { useState } from 'react'

const Form = () => {
    const [text, setText] = useState<string>('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        if (!text) return
        try {
            await Meteor.callAsync("rooms.insert", {
                title: text.trim(),
                canvasData: '',
                createdAt: new Date(),
            })
            setText('')

        } catch (err) {
            console.error('Failed to create room:', err)
        } finally {
            setLoading(false)
        }

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
            <button className='submit-btn' type='submit' disabled={loading}>Создать</button>
        </form>
    )
}

export default Form
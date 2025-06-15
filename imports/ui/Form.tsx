import React from 'react'

const Form = () => {
    return (
        <form className='form'>
            <label className='form-label'>
                Название комнаты
                <input type="text" className='form-input' placeholder='Введите название' />
            </label>
            <button className='submit-btn'>Создать</button>
        </form>
    )
}

export default Form
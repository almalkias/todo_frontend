import React from 'react';

export default function TodoItem({ todo, onDelete, onItemToggle }) {
    return (
        <ul>
            <li className={`list-disc text-xl font-medium text-gray-900 mb-3 flex items-center justify-between p-3 rounded-lg border-2 border-gray-400 ${todo.is_completed ? 'bg-gray-300' : ''}`}>
                <span>{todo.title}</span>
                <div className='flex items-center'>
                    <input
                        onChange={(e) => onItemToggle(todo.id, e.target.checked)}
                        checked={todo.is_completed}
                        type="checkbox"
                        className='w-7 h-7' />
                    <button
                        className="ml-4 bg-red-500 text-white px-2 rounded hover:bg-red-600" onClick={onDelete}>
                        X
                    </button>
                </div>
            </li>
        </ul>
    )
}

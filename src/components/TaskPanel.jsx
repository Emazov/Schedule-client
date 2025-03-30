import { useState } from 'react';
import { TaskCard } from './TaskCard';

const defaultTasks = [
	{ id: '0', title: 'Programming Language 2', color: '#FF9AA2' },
	{ id: '1', title: 'Calculus 2', color: '#FFB7B2' },
	{ id: '2', title: 'Discrete Math', color: '#FFDAC1' },
	{ id: '3', title: 'Design and Analysis of Algorithms', color: '#E2F0CB' },
	{ id: '4', title: 'Mobile App Development', color: '#C7CEEA' },
	{ id: '5', title: 'LUNCH TIME', color: '#B5EAD7' },
];

const colorPalette = [
	'#FF9AA2',
	'#FFB7B2',
	'#FFDAC1',
	'#E2F0CB',
	'#B5EAD7',
	'#C7CEEA',
	'#A2D7D8',
	'#B5B5E5',
	'#F8B195',
	'#F67280',
	'#C06C84',
	'#6C5B7B',
];

export const TaskPanel = () => {
	const [tasks, setTasks] = useState(defaultTasks);
	const [newTaskTitle, setNewTaskTitle] = useState('');

	const handleAddTask = (e) => {
		e.preventDefault();
		if (!newTaskTitle.trim()) return;

		const newTask = {
			id: `custom-${Date.now()}`,
			title: newTaskTitle,
			color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
		};

		setTasks([...tasks, newTask]);
		setNewTaskTitle('');
	};

	return (
		<div className='task-panel'>
			<h3>Available Lessons</h3>

			<form onSubmit={handleAddTask} className='task-form'>
				<input
					type='text'
					value={newTaskTitle}
					onChange={(e) => setNewTaskTitle(e.target.value)}
					placeholder='New lesson name'
					className='task-input'
				/>
				<button type='submit' className='add-task-btn'>
					Add
				</button>
			</form>

			<div className='task-list'>
				{tasks.map((task) => (
					<TaskCard key={task.id} task={task} draggable />
				))}
			</div>
		</div>
	);
};

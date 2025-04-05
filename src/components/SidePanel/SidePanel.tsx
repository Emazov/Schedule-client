import { useState } from 'react';

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

const SidePanel = () => {
	const [lessons, setLessons] = useState(defaultTasks);
	const [newLessonTitle, setNewLessonTitle] = useState('');

	const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!newLessonTitle.trim()) return;

		const newTask = {
			id: `custom-${Date.now()}`,
			title: newLessonTitle,
			color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
		};

		setLessons([...lessons, newTask]);
		setNewLessonTitle('');
	};

	return (
		<div className='side_panel'>
			<h4>Available lessons</h4>
			<form onSubmit={handleAddTask} className='side_form'>
				<input
					type='text'
					value={newLessonTitle}
					onChange={(e) => setNewLessonTitle(e.target.value)}
					className='side_input'
					placeholder='New lesson'
				/>
				<button type='submit' className='side_btn'>
					Add
				</button>
			</form>
			<div className='side_lessons_list'>
				{lessons.map((subject) => (
					<div
						key={subject.id}
						className='side_lessons_item'
						style={{ backgroundColor: subject.color }}
					>
						{subject.title}
					</div>
				))}
			</div>
		</div>
	);
};

export default SidePanel;

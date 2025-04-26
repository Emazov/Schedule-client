import React, { useState } from 'react';

interface SidePanelProps {
	defaultTasks: { id: string; title: string; color: string }[];
	colorPalette: string[];
}

const SidePanel: React.FC<SidePanelProps> = ({
	defaultTasks,
	colorPalette,
}) => {
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

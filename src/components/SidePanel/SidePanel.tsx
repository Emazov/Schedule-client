import React, { useState } from 'react';
import LessonCard from '../Card/LessonCard';

import { defaultTasks, colorPalette } from '../../defaultData';

type SidePanelProps = {
	setSchedule: React.Dispatch<React.SetStateAction<{ [cellId: string]: any }>>;
};

const SidePanel = ({ setSchedule }: SidePanelProps) => {
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
					<LessonCard
						key={subject.id}
						id={subject.id}
						subject={subject}
						setSchedule={setSchedule}
					/>
				))}
			</div>
		</div>
	);
};

export default SidePanel;

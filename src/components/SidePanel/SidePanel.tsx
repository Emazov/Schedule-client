import React, { useState } from 'react';
import LessonCard from '../Card/LessonCard';

import { useScheduleStore } from '../../store/store.ts';
import { colorPalette } from '../../defaultData';

const SidePanel = () => {
	const { availableLessons, addNewLesson } = useScheduleStore();
	const [newLessonTitle, setNewLessonTitle] = useState('');

	const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!newLessonTitle.trim()) return;

		const newTask = {
			id: `custom-${Date.now()}`,
			title: newLessonTitle,
			color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
		};
		addNewLesson(newTask);
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
				{availableLessons.map((subject) => (
					<LessonCard key={subject.id} id={subject.id} subject={subject} />
				))}
			</div>
		</div>
	);
};

export default SidePanel;

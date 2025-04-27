import { useEffect, useRef, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';

import { useScheduleStore } from '../../store/store.ts';
import { teachers, rooms } from '../../defaultData';

type LessonCardProps = {
	id: string;
	subject: {
		id: string;
		title: string;
		color: string;
		teacher?: string;
		room?: string;
	};
};

const LessonCard = ({ id, subject }: LessonCardProps) => {
	const { activeGroupId, schedules, addLessonToCell } = useScheduleStore();
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id,
		data: { title: subject.title, color: subject.color },
	});

	const [editMode, setEditMode] = useState(false);
	const [editedTitle, setEditedTitle] = useState(subject.title);
	const [selectedTeacher, setSelectedTeacher] = useState(
		subject.teacher || teachers[0]
	);
	const [selectedRoom, setSelectedRoom] = useState(subject.room || rooms[0]);

	const cardRef = useRef<HTMLDivElement>(null);

	const style = {
		transform: transform
			? `translate(${transform.x}px, ${transform.y}px)`
			: undefined,
		backgroundColor: subject.color,
	};

	const handleDoubleClick = () => {
		setEditMode(true);
	};

	const handleSave = () => {
		addLessonToCell(activeGroupId, id, {
			...schedules[activeGroupId]?.[id]!,
			title: editedTitle ? editedTitle : subject.title,
			teacher: selectedTeacher,
			room: selectedRoom,
		});
		setEditMode(false);
	};

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
				handleSave();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [editedTitle, selectedTeacher, selectedRoom]);

	if (editMode) {
		return (
			<div
				ref={setNodeRef}
				style={style}
				className='side_lessons_item no_select'
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						handleSave();
					}
				}}
			>
				<div ref={cardRef}>
					<textarea
						rows={1}
						value={editedTitle}
						onChange={(e) => setEditedTitle(e.target.value)}
						placeholder='Title...'
						className='input'
					/>
					<select
						value={selectedTeacher}
						onChange={(e) => setSelectedTeacher(e.target.value)}
						onFocus={(e) => e.target.blur()}
						className='select'
					>
						{teachers.map((teacher) => (
							<option key={teacher} value={teacher}>
								{teacher}
							</option>
						))}
					</select>
					<select
						value={selectedRoom}
						onChange={(e) => setSelectedRoom(e.target.value)}
						onFocus={(e) => e.target.blur()}
						className='select'
					>
						{rooms.map((room) => (
							<option key={room} value={room}>
								{room}
							</option>
						))}
					</select>
				</div>
			</div>
		);
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			className='side_lessons_item no_select'
			onDoubleClick={handleDoubleClick}
		>
			<div className='item_title'>{subject.title}</div>
			{subject.teacher && <div className='small_text'>{subject.teacher}</div>}
			{subject.room && <div className='small_text'>{subject.room}</div>}
		</div>
	);
};

export default LessonCard;

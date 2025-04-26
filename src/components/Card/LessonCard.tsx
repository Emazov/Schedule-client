import { useEffect, useRef, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';

const teachers = [
	'Mr. Meezan Chand',
	'Dr. Remudin Mecuria',
	'Mr. Hussein Chebsi',
	'Mr. Dim Shayahmetov',
	'Ms. Mekia Gaso',
	'Mr.  Zhenishbek Orozakhunov',
];
const rooms = ['BIGLAB', '101', '202', '303', '404', 'Lab 1', 'Lab 2'];

type LessonCardProps = {
	id: string;
	subject: {
		id: string;
		title: string;
		color: string;
		teacher?: string;
		room?: string;
	};
	setSchedule: React.Dispatch<React.SetStateAction<{ [cellId: string]: any }>>;
};

const LessonCard = ({ id, subject, setSchedule }: LessonCardProps) => {
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
		setSchedule((prev) => ({
			...prev,
			[id]: {
				...prev[id],
				title: editedTitle,
				teacher: selectedTeacher,
				room: selectedRoom,
			},
		}));
		setEditMode(false);
	};

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
				// Если клик был вне карточки — сохраняем изменения
				handleSave();
			}
		};

		document.addEventListener('mousedown', handleClickOutside); // Слушаем клик мышью
		return () => {
			document.removeEventListener('mousedown', handleClickOutside); // Убираем слушатель при размонтировании
		};
	}, [editedTitle, selectedTeacher, selectedRoom]);

	if (editMode) {
		return (
			<div
				ref={setNodeRef}
				style={style}
				className='side_lessons_item'
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						handleSave();
					}
				}}
			>
				<div ref={cardRef}>
					<input
						type='text'
						value={editedTitle}
						onChange={(e) => setEditedTitle(e.target.value)}
						placeholder='Название'
						className='input'
					/>
					<select
						value={selectedTeacher}
						onChange={(e) => setSelectedTeacher(e.target.value)}
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
			className='side_lessons_item'
			onDoubleClick={handleDoubleClick}
		>
			<div>{subject.title}</div>
			{subject.teacher && <div className='small_text'>{subject.teacher}</div>}
			{subject.room && <div className='small_text'>{subject.room}</div>}
		</div>
	);
};

export default LessonCard;

import { useEffect, useRef, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';

import { useScheduleStore } from '../../store/store.ts';
import { timeSlots, teachers, rooms } from '../../defaultData';

import './index.css';

type LessonCardProps = {
	id: string;
	subject: {
		id: string;
		title: string;
		color: string;
		teacher?: string;
		room?: string;
		duration?: number;
	};
	isInTable?: boolean;
};

const durationOptions = [
	{ value: 1, label: "1" },
	{ value: 2, label: "2" },
	{ value: 3, label: "3" },
	{ value: 4, label: "4" },
];

const LessonCard = ({ id, subject, isInTable }: LessonCardProps) => {
	const { activeDayId, schedules, addLessonToCell } = useScheduleStore();
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id,
		data: { title: subject.title, color: subject.color },
	});

	const [showWarning, setShowWarning] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [editedTitle, setEditedTitle] = useState(subject.title);
	const [selectedTeacher, setSelectedTeacher] = useState(
		subject.teacher
	);
	const [selectedRoom, setSelectedRoom] = useState(
		subject.room || rooms[0].name
	);
	const [selectedDuration, setSelectedDuration] = useState(subject.duration || durationOptions[0].value);

	const cardRef = useRef<HTMLDivElement>(null);

	const style = {
		transform: transform
			? `translate(${transform.x}px, ${transform.y}px)`
			: undefined,
		backgroundColor: subject.color,
	};

	const handleDoubleClick = () => {
		if (!isInTable) {
			setShowWarning(true);
			setTimeout(() => setShowWarning(false), 2000);
			return;
		}

		setEditMode(true);
	};

	function canExtendLesson(
		cellId: string,
		duration: number,
		schedules: Record<string, any>
	): boolean {
		if (duration <= 1) return true;

		const [groupId, timeId] = cellId.split("-");
		const startIndex = timeSlots.findIndex((t) => t.id === timeId);
		if (startIndex === -1) return false;

		for (let i = 1; i < duration; i++) {
			const nextSlot = timeSlots[startIndex + i];
			if (!nextSlot) return false;

			const nextCellId = `${groupId}-${nextSlot.id}`;
			if (schedules[nextCellId]) return false;
		}

		return true;
	}

	const handleSave = () => {
		if (!canExtendLesson(id, selectedDuration, schedules[activeDayId])) {
			alert("⛔ Невозможно установить такую длительность — следующие ячейки заняты!");

			const previousDuration = schedules[activeDayId]?.[id]?.duration || 1;

			addLessonToCell(activeDayId, id, {
				...schedules[activeDayId]?.[id]!,
				title: editedTitle ? editedTitle : subject.title,
				teacher: selectedTeacher,
				room: selectedRoom,
				duration: previousDuration,
			});

			setSelectedDuration(previousDuration);
			setEditMode(false);
			return;
		}

		addLessonToCell(activeDayId, id, {
			...schedules[activeDayId]?.[id]!,
			title: editedTitle ? editedTitle : subject.title,
			teacher: selectedTeacher,
			room: selectedRoom,
			duration: selectedDuration,
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
	}, [editedTitle, selectedTeacher, selectedRoom, selectedDuration]);

	useEffect(() => {
		if (isInTable) {
			const currentLesson = schedules[activeDayId]?.[id];
			if (currentLesson) {
				setEditedTitle(currentLesson.title);
				setSelectedTeacher(currentLesson.teacher ?? '');
				setSelectedRoom(currentLesson.room ?? '');
				setSelectedDuration(currentLesson.duration || durationOptions[0].value);
			}
		}
	}, [schedules, activeDayId, id]);

	if (editMode) {
		return (
			<div
				ref={setNodeRef}
				style={style}
				className='lessons_item no_select'
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
						placeholder='Title...'
						className='input'
					/>
					<div className='select-container'>
						<select
							value={selectedTeacher}
							onChange={(e) => setSelectedTeacher(e.target.value)}
							className='select'
						>
							<option value=''>None</option>
							{teachers.map((teacher) => (
								<option key={teacher.id} value={teacher.name}>
									{teacher.name}
								</option>
							))}
						</select>
						<button
							className='clear-button'
							onClick={() => {
								setSelectedTeacher('');
							}}
						>
							×
						</button>
					</div>
					<div className='select-container'>
						<select
							value={selectedRoom}
							onChange={(e) => setSelectedRoom(e.target.value)}
							className='select'
						>
							<option value=''>None</option>
							{rooms.map((room) => (
								<option key={room.id} value={room.name}>
									{room.name}
								</option>
							))}
						</select>
						<button
							className='clear-button'
							onClick={() => {
								setSelectedRoom('');
							}}
						>
							×
						</button>
					</div>
					<div className='duration_select'>
						{durationOptions.map(dur => (
							<label key={dur.value} className='mr-1'>
								<input
									type='radio'
									name='duration'
									value={dur.value}
									checked={selectedDuration === dur.value}
									onChange={() => setSelectedDuration(dur.value)}
									className='mr-1'
								/>
								<span>{dur.label}</span>
							</label>
						))}
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			<div
				ref={setNodeRef}
				style={style}
				{...listeners}
				{...attributes}
				id={`${subject.id}-${id}`}
				className='lessons_item no_select'
				onDoubleClick={handleDoubleClick}
			>
				<div className='item_title'>{subject.title}</div>
				{subject.teacher && <div className='small_text'>{subject.teacher}</div>}
				{subject.room && <div className='small_text'>{subject.room}</div>}
			</div>

			{showWarning && (
				<div className='warning_text'>Move to table for edit 🧩</div>
			)}
		</>
	);
};

export default LessonCard;

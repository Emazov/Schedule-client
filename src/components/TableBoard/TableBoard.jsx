import { useState } from 'react';
import './tableBoard.css';

const timeSlots = [
	{ id: '1st Hour', start: '09:00', end: '09:55' },
	{ id: '2nd Hour', start: '10:00', end: '10:40' },
	{ id: '3rd Hour', start: '10:45', end: '11:25' },
	{ id: '4th Hour', start: '11:30', end: '12:10' },
	{ id: '5th Hour', start: '12:15', end: '12:55' },
	{ id: '6th Hour', start: '13:00', end: '13:40' },
	{ id: '7th Hour', start: '13:45', end: '14:25' },
	{ id: '8th Hour', start: '14:30', end: '15:10' },
	{ id: '9th Hour', start: '15:15', end: '15:55' },
	{ id: '10th Hour', start: '16:00', end: '16:40' },
	{ id: '11th Hour', start: '16:45', end: '17:25' },
	{ id: '12th Hour', start: '17:30', end: '18:10' },
];

const days = [
	{ id: 'mon', title: 'Monday' },
	{ id: 'tue', title: 'Tuesday' },
	{ id: 'wed', title: 'Wednesday' },
	{ id: 'thu', title: 'Thursday' },
	{ id: 'fri', title: 'Friday' },
	{ id: 'sat', title: 'Saturday' },
];

const initialLessons = [
	{
		day_id: 'mon',
		title: 'Programming Language',
		start: '09:00',
		end: '10:40',
		teacher: 'Mr. Dim Shayahmetov',
		room: 'B201',
		color: '#FF9AA2',
	},
	{
		day_id: 'mon',
		title: 'History',
		start: '11:30',
		end: '12:55',
		teacher: 'Mr. Meezan Chand',
		room: 'B202',
		color: '#FFB7B2',
	},
	{
		day_id: 'tue',
		title: 'Programming Language',
		start: '10:45',
		end: '12:10',
		teacher: 'Mr. Dim Shayahmetov',
		room: 'B203',
		color: '#FFDAC1',
	},
	{
		day_id: 'tue',
		title: 'Calculus 2',
		start: '13:45',
		end: '15:55',
		teacher: 'Mr. Hussein Chebsi',
		room: 'B204',
		color: '#E2F0CB',
	},
	{
		day_id: 'wed',
		title: 'Discrete Math',
		start: '09:00',
		end: '11:25',
		teacher: 'Dr. Remudin Mecuria',
		room: 'B205',
		color: '#C7CEEA',
	},
	{
		day_id: 'wed',
		title: 'Algorithms',
		start: '13:45',
		end: '15:55',
		teacher: 'Ms. Mekia Gaso',
		room: 'BIGLAB',
		color: '#B5EAD7',
	},
	{
		day_id: 'thu',
		title: 'Mobile App Development',
		start: '11:30',
		end: '12:55',
		teacher: 'Mr.  Zhenishbek Orozakhunov',
		room: 'B210',
		color: '#F8B195',
	},
];

const initialLessons_group = [
	{
		day_id: 'mon',
		title: 'Programming Language',
		start: '11:30',
		end: '12:55',
		teacher: 'Mr. Dim Shayahmetov',
		room: 'B201',
		color: '#FF9AA2',
	},
	{
		day_id: 'tue',
		title: 'History',
		start: '10:45',
		end: '12:10',
		teacher: 'Mr. Meezan Chand',
		room: 'B202',
		color: '#FFB7B2',
	},
	{
		day_id: 'tue',
		title: 'Programming Language',
		start: '13:45',
		end: '15:55',
		teacher: 'Mr. Dim Shayahmetov',
		room: 'B203',
		color: '#FFDAC1',
	},
	{
		day_id: 'wed',
		title: 'Calculus 2',
		start: '09:00',
		end: '11:25',
		teacher: 'Mr. Hussein Chebsi',
		room: 'B204',
		color: '#E2F0CB',
	},
	{
		day_id: 'wed',
		title: 'Discrete Math',
		start: '13:45',
		end: '15:55',
		teacher: 'Dr. Remudin Mecuria',
		room: 'B205',
		color: '#C7CEEA',
	},
	{
		day_id: 'thu',
		title: 'Algorithms',
		start: '11:30',
		end: '12:55',
		teacher: 'Ms. Mekia Gaso',
		room: 'BIGLAB',
		color: '#B5EAD7',
	},
	{
		day_id: 'mon',
		title: 'Mobile App Development',
		start: '09:00',
		end: '10:40',
		teacher: 'Mr.  Zhenishbek Orozakhunov',
		room: 'B210',
		color: '#F8B195',
	},
];

const groups = [
	{ id: 'group_COMCEH-24', name: 'COMCEH-24' },
	{ id: 'group_COMSE-24', name: 'COMSE-24' },
	{ id: 'group_COMFCI-24', name: 'COMFCI-24' },
	{ id: 'group_COMSEP-23', name: 'COMSEP-23' },
	{ id: 'group_COMCEH-23', name: 'COMCEH-23' },
	{ id: 'group_COMSE-23', name: 'COMSE-23' },
	{ id: 'group_COMFCI-23', name: 'COMFCI-23' },
	{ id: 'group_COM-22a', name: 'COM-22a' },
	{ id: 'group_COM-22b', name: 'COM-22b' },
	{ id: 'group_COM-21', name: 'COM-21' },
];

const TableBoard = ({ role }) => {
	const [groupName, setGroupName] = useState('teacher');

	const handleChangeGroup = (e) => {
		setGroupName(e.target.value);
	};

	// Создаем карту занятых слотов для каждого дня
	const occupiedSlots = days.reduce((acc, day) => {
		acc[day.id] = [];
		return acc;
	}, {});

	initialLessons.forEach((lesson) => {
		const startIndex = timeSlots.findIndex((s) => s.start === lesson.start);
		const endIndex = timeSlots.findIndex((s) => s.end === lesson.end);
		if (startIndex === -1 || endIndex === -1) return;

		for (let i = startIndex; i <= endIndex; i++) {
			if (!occupiedSlots[lesson.day_id].includes(i)) {
				occupiedSlots[lesson.day_id].push(i);
			}
		}
	});

	const calculateGridPosition = (start, end) => {
		const startIndex = timeSlots.findIndex((s) => s.start === start);
		const endIndex = timeSlots.findIndex((s) => s.end === end);
		return {
			gridRowStart: startIndex + 2, // +1 для заголовка +1 для 1-based индекса
			gridRowEnd: endIndex + 3, // +1 для заголовка +2 для exclusive end
		};
	};

	const mergedLessons = initialLessons.reduce((acc, lesson) => {
		acc[`${lesson.day_id}-${lesson.start}`] = lesson;
		return acc;
	}, {});

	return (
		<div className='table-board'>
			{/* Заголовок группы */}
			<div
				className='table-grid-header'
				style={{
					gridColumn: '1 / 2',
					gridRow: '1 / 2',
				}}
			>
				<select
					name='groupName'
					value={groupName}
					onChange={handleChangeGroup}
					className='table-grid-header-dropdown'
				>
					{role === 'teacher' ? <option value='teacher'>TEACHER</option> : ''}
					{groups.map((group) => (
						<option key={group.id} value={group.name}>
							{group.name}
						</option>
					))}
				</select>
			</div>

			{/* Заголовки дней */}
			{days.map((day, index) => (
				<div
					key={day.id}
					className='table-grid-header'
					style={{
						gridColumn: `${index + 2} / ${index + 3}`,
						gridRow: '1 / 2',
					}}
				>
					{day.title}
				</div>
			))}

			{/* Временные метки */}
			{timeSlots.map((slot, index) => (
				<div
					key={slot.id}
					className='table-time-label'
					style={{
						gridColumn: '1 / 2',
						gridRow: `${index + 2} / ${index + 3}`,
					}}
				>
					<p className='font-bold'>{slot.id}</p>
					<p>
						{slot.start}-{slot.end}
					</p>
				</div>
			))}

			{/* Уроки */}
			{(groupName === 'COMCEH-24' ? initialLessons : initialLessons_group).map(
				(lesson, idx) => {
					const dayIndex = days.findIndex((d) => d.id === lesson.day_id) + 2;
					const pos = calculateGridPosition(lesson.start, lesson.end);

					return (
						<div
							key={`${lesson.day_id}-${lesson.start}`}
							className='table-time-slot'
							style={{
								gridColumn: `${dayIndex} / ${dayIndex + 1}`,
								gridRowStart: pos.gridRowStart,
								gridRowEnd: pos.gridRowEnd,
							}}
						>
							<div
								className='table-card'
								style={{ backgroundColor: lesson.color }}
							>
								<div className='table-card-content'>
									<h4>{groupName === 'teacher' ? groups[idx].name : ''}</h4>
									<h4 className='table-card-title'>{lesson.title}</h4>

									<p>
										{lesson.teacher}
										<br />
										{lesson.room}
									</p>
								</div>
							</div>
						</div>
					);
				}
			)}

			{/* Пустые ячейки */}
			{days.map((day) => {
				const dayIndex = days.findIndex((d) => d.id === day.id) + 2;

				return timeSlots.map((slot, slotIndex) => {
					if (!occupiedSlots[day.id].includes(slotIndex)) {
						return (
							<div
								key={`empty-${day.id}-${slotIndex}`}
								className='table-time-slot'
								style={{
									gridColumn: `${dayIndex} / ${dayIndex + 1}`,
									gridRow: `${slotIndex + 2} / ${slotIndex + 3}`,
								}}
							/>
						);
					}
					return null;
				});
			})}
		</div>
	);
};

export default TableBoard;

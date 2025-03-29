import { useState } from 'react';

export const TaskModal = ({ task, teachers, rooms, onClose, onSave }) => {
	const [details, setDetails] = useState({
		teacher: task.teacher || '',
		room: task.room || '',
		...task,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setDetails((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className='modal-overlay'>
			<div className='modal'>
				<h3>Edit Task Details</h3>

				<div className='form-group'>
					<label>Title:</label>
					<input
						type='text'
						name='title'
						value={details.title}
						onChange={handleChange}
					/>
				</div>

				<div className='form-group'>
					<label>Teacher:</label>
					<select
						name='teacher'
						value={details.teacher}
						onChange={handleChange}
						className='form-select'
					>
						<option value=''>Select Teacher</option>
						{teachers.map((teacher) => (
							<option key={teacher} value={teacher}>
								{teacher}
							</option>
						))}
					</select>
				</div>

				<div className='form-group'>
					<label>Room:</label>
					<select
						name='room'
						value={details.room}
						onChange={handleChange}
						className='form-select'
					>
						<option value=''>Select Room</option>
						{rooms.map((room) => (
							<option key={room} value={room}>
								{room}
							</option>
						))}
					</select>
				</div>

				<div className='modal-actions'>
					<button onClick={onClose}>Cancel</button>
					<button onClick={() => onSave(details)}>Save</button>
				</div>
			</div>
		</div>
	);
};

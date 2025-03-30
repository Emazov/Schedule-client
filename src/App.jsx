import { useState } from 'react';
import { TaskBoard } from './components/TaskBoard';
import { TaskPanel } from './components/TaskPanel';
import { TaskModal } from './components/TaskModal';
import './App.css';

function App() {
	const [tasks, setTasks] = useState({});
	const [editingTask, setEditingTask] = useState(null);
	const [currentSlot, setCurrentSlot] = useState(null);
	const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

	const [teachers] = useState([
		'Mr. Meezan Chand',
		'Dr. Remudin Mecuria',
		'Mr. Hussein Chebsi',
		'Mr. Dim Shayahmetov',
		'Ms. Mekia Gaso',
		'Mr.  Zhenishbek Orozakhunov',
	]);

	const [rooms] = useState([
		'BIGLAB',
		'101',
		'202',
		'303',
		'404',
		'A1',
		'B2',
		'C3',
		'D4',
		'Auditorium',
		'Lab 1',
		'Lab 2',
	]);

	const handleDrop = (day, hour, task) => {
		setTasks((prevTasks) => {
			const prevKey = Object.keys(prevTasks).find((key) =>
				prevTasks[key].some((t) => t.id === task.id)
			);

			const key = `${day}-${hour}`;
			const newTasks = { ...prevTasks };

			const newTask = { ...task };

			if (prevKey) {
				newTasks[prevKey] = newTasks[prevKey].filter((t) => t.id !== task.id);
			}

			if (!newTasks[key]) {
				newTasks[key] = [];
			}
			newTasks[key] = [...newTasks[key], newTask];

			return newTasks;
		});
	};

	const handleTaskDoubleClick = (task, day, hour, event) => {
		const rect = event.target.getBoundingClientRect();
		setEditingTask(task);
		setCurrentSlot({ day, hour });
		setModalPosition({ top: rect.bottom + window.scrollY, left: rect.left });
	};

	const handleSaveTask = (updatedTask) => {
		setTasks((prevTasks) => {
			const key = `${currentSlot.day}-${currentSlot.hour}`;
			const newTasks = { ...prevTasks };

			newTasks[key] = newTasks[key].map((t) =>
				t.id === updatedTask.id ? updatedTask : t
			);

			return newTasks;
		});
		setEditingTask(null);
	};

	return (
		<div className='app'>
			<h1>AIU Schedule</h1>
			<div className='container'>
				<TaskBoard
					tasks={tasks}
					onDrop={handleDrop}
					onTaskDoubleClick={handleTaskDoubleClick}
				/>
				<TaskPanel />
			</div>

			{editingTask && (
				<TaskModal
					task={editingTask}
					teachers={teachers}
					rooms={rooms}
					onClose={() => setEditingTask(null)}
					onSave={handleSaveTask}
					position={modalPosition}
				/>
			)}
		</div>
	);
}

export default App;

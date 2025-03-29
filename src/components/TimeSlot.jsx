import { useDrop } from 'react-dnd';
import { TaskCard } from './TaskCard';

export const TimeSlot = ({ day, hour, tasks, onDrop, onTaskDoubleClick }) => {
	const [{ isOver }, drop] = useDrop(() => ({
		accept: 'task',
		drop: (item) => onDrop(day, hour, item),
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
		}),
	}));

	return (
		<div ref={drop} className={`time-slot ${isOver ? 'hovered' : ''}`}>
			{tasks.map((task) => (
				<TaskCard
					key={task.id}
					task={task}
					draggable
					onDoubleClick={() => onTaskDoubleClick(task, day, hour)}
				/>
			))}
		</div>
	);
};

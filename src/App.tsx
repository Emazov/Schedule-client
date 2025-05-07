import { DndContext, DragEndEvent } from '@dnd-kit/core';
import Header from './components/Header/Header';
import MainTable from './components/MainTable/MainTable';
import SidePanel from './components/SidePanel/SidePanel';
import './App.css';

import { useScheduleStore } from './store/store.ts';
import { timeSlots } from './defaultData.ts';

function App() {
	const { activeDayId, addLessonToCell, swapLessons, availableLessons, schedules } =
		useScheduleStore();

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over) return;

		const activeId = active.id.toString();
		const overId = over.id.toString();

		const [overGroup, overTime] = overId.split('-');
		const duration = active.data.current?.duration ? parseInt(active.data.current.duration) : 1;

		// Проверяем, не выходит ли урок за пределы временной сетки
		const overTimeIndex = timeSlots.findIndex(slot => slot.id === overTime);
		if (overTimeIndex + duration > timeSlots.length) return;

		// Проверяем, нет ли уроков в ячейках, которые будут объединены
		for (let i = 1; i < duration; i++) {
			const nextCellId = `${overGroup}-${timeSlots[overTimeIndex + i].id}`;
			if (schedules[activeDayId]?.[nextCellId]) return;
		}

		const isFromPanel =
			activeId.startsWith('custom-') || !activeId.includes('-');

		if (isFromPanel) {
			const lesson = availableLessons.find((l) => l.id === activeId) || {
				id: activeId,
				title: active.data.current?.title,
				color: active.data.current?.color,
				duration: active.data.current?.duration
			};
			addLessonToCell(activeDayId, overId, lesson);
		} else {
			swapLessons(activeDayId, activeId, overId);
		}
	};

	return (
		<div className='app'>
			<Header />
			<div className='container'>
				<DndContext onDragEnd={handleDragEnd}>
					<SidePanel />
					<MainTable />
				</DndContext>
			</div>
		</div>
	);
}

export default App;

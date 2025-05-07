import { DndContext, DragEndEvent } from '@dnd-kit/core';
import Header from './components/Header/Header';
import MainTable from './components/MainTable/MainTable';
import SidePanel from './components/SidePanel/SidePanel';
import './App.css';

import { useScheduleStore } from './store/store.ts';

function App() {
	const { activeDayId, addLessonToCell, swapLessons, availableLessons } =
		useScheduleStore();

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over) return;

		const activeId = active.id.toString();
		const overId = over.id.toString();

		const isFromPanel =
			activeId.startsWith('custom-') || !activeId.includes('-');

		if (isFromPanel) {
			const lesson = availableLessons.find((l) => l.id === activeId) || {
				id: activeId,
				title: active.data.current?.title,
				color: active.data.current?.color,
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

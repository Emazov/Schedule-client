import { create } from 'zustand';

type Lesson = {
	id: string;
	title: string;
	color: string;
	teacher?: string;
	room?: string;
};

type Schedule = {
	[cellId: string]: Lesson | null;
};

type ScheduleStore = {
	schedules: { [dayId: string]: Schedule };
	activeDayId: string;
	setActiveDay: (dayId: string) => void;
	addLessonToCell: (dayId: string, cellId: string, lesson: Lesson) => void;
	swapLessons: (dayId: string, fromCellId: string, toCellId: string) => void;
	addNewLesson: (lesson: Lesson) => void;
	availableLessons: Lesson[];
};

import { defaultTasks, daysOfWeek } from '../defaultData';

export const useScheduleStore = create<ScheduleStore>((set) => ({
	schedules: daysOfWeek.reduce((acc, day) => {
		acc[day.id] = {};
		return acc;
	}, {} as { [dayId: string]: Schedule }),
	activeDayId: daysOfWeek[0].id,
	availableLessons: [...defaultTasks],

	setActiveDay: (dayId) => set({ activeDayId: dayId }),

	addLessonToCell: (dayId, cellId, lesson) =>
		set((state) => ({
			schedules: {
				...state.schedules,
				[dayId]: {
					...state.schedules[dayId],
					[cellId]: lesson,
				},
			},
		})),

	swapLessons: (dayId, fromCellId, toCellId) =>
		set((state) => {
			const daySchedule = { ...state.schedules[dayId] };
			const temp = daySchedule[fromCellId] || null;
			daySchedule[fromCellId] = daySchedule[toCellId] || null;
			daySchedule[toCellId] = temp;

			return {
				schedules: {
					...state.schedules,
					[dayId]: daySchedule,
				},
			};
		}),

	addNewLesson: (lesson) =>
		set((state) => ({
			availableLessons: [...state.availableLessons, lesson],
		})),
}));

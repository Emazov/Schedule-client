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
	schedules: { [groupId: string]: Schedule };
	activeGroupId: string;
	setActiveGroup: (groupId: string) => void;
	addLessonToCell: (groupId: string, cellId: string, lesson: Lesson) => void;
	swapLessons: (groupId: string, fromCellId: string, toCellId: string) => void;
	addNewLesson: (lesson: Lesson) => void;
	availableLessons: Lesson[];
};

import { defaultTasks, groups } from '../defaultData';

export const useScheduleStore = create<ScheduleStore>((set) => ({
	schedules: groups.reduce((acc, group) => {
		acc[group.id] = {};
		return acc;
	}, {} as { [groupId: string]: Schedule }),
	activeGroupId: groups[0].id,
	availableLessons: [...defaultTasks],

	setActiveGroup: (groupId) => set({ activeGroupId: groupId }),

	addLessonToCell: (groupId, cellId, lesson) =>
		set((state) => ({
			schedules: {
				...state.schedules,
				[groupId]: {
					...state.schedules[groupId],
					[cellId]: lesson,
				},
			},
		})),

	swapLessons: (groupId, fromCellId, toCellId) =>
		set((state) => {
			const groupSchedule = { ...state.schedules[groupId] };
			const temp = groupSchedule[fromCellId] || null;
			groupSchedule[fromCellId] = groupSchedule[toCellId] || null;
			groupSchedule[toCellId] = temp;

			return {
				schedules: {
					...state.schedules,
					[groupId]: groupSchedule,
				},
			};
		}),

	addNewLesson: (lesson) =>
		set((state) => ({
			availableLessons: [...state.availableLessons, lesson],
		})),
}));

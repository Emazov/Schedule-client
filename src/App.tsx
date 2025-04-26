import Header from './components/Header/Header';
import MainTable from './components/MainTable/MainTable';
import SidePanel from './components/SidePanel/SidePanel';
import './App.css';

import { daysOfWeek, timeSlots, defaultTasks, colorPalette } from './defaultData';

function App() {
	return (
		<div className='app'>
			<Header />
			<div className='container'>
				<MainTable daysOfWeek={daysOfWeek} timeSlots={timeSlots} />
				<SidePanel defaultTasks={defaultTasks} colorPalette={colorPalette} />
			</div>
		</div>
	);
}

export default App;

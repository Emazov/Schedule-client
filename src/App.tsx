import Header from './components/Header/Header';
import MainTable from './components/MainTable/MainTable';
import SidePanel from './components/SidePanel/SidePanel';
import DndManager from './components/DndManager';
import { useScheduleStore } from './store/store';
import './App.css';

function App() {
	const { userRole } = useScheduleStore();
	const isAdmin = userRole === 'admin';

	return (
		<div className='app'>
			<Header />
			<div className='container'>
				<DndManager>
					{isAdmin && <SidePanel />}
					<MainTable />
				</DndManager>
			</div>
		</div>
	);
}

export default App;

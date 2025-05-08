import Header from './components/Header/Header';
import MainTable from './components/MainTable/MainTable';
import SidePanel from './components/SidePanel/SidePanel';
import DndManager from './components/DndManager';
import './App.css';

function App() {
	return (
		<div className='app'>
			<Header />
			<div className='container'>
				<DndManager>
					<SidePanel />
					<MainTable />
				</DndManager>
			</div>
		</div>
	);
}

export default App;

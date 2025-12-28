import { ClockComponent } from './components/ClockComponent';
import { WeatherComponent } from './components/WeatherComponent';
import { TrashScheduleComponent } from './components/TrashScheduleComponent';

function App() {
  return (
    <div className="h-screen w-screen bg-black overflow-hidden flex items-center justify-center p-8">
      <div className="w-full h-full grid grid-cols-10 gap-8">
        <div className="col-span-4 rounded-[3rem] border border-gray-900 bg-gray-950/50 flex items-center justify-center relative overflow-hidden ring-1 ring-white/5 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-purple-900/5 pointer-events-none" />
          <ClockComponent />
        </div>

        <div className="col-span-3 rounded-[3rem] border border-gray-900 bg-gray-950/50 flex items-center justify-center relative overflow-hidden ring-1 ring-white/5 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/5 to-orange-900/5 pointer-events-none" />
          <WeatherComponent />
        </div>

        <div className="col-span-3 flex flex-col gap-6">
          <div className="flex-1 rounded-[3rem] overflow-hidden shadow-2xl ring-1 ring-white/5">
            <TrashScheduleComponent />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

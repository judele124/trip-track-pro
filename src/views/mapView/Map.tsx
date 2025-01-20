import MapContextProvider from '@/contexts/MapContext'
import MapInit from './MapInit'

const Map = () => {
  return (
    <MapContextProvider>
      <MapInit />
    </MapContextProvider>
  )
}

export default Map
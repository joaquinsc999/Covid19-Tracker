import { Card, CardContent } from '@mui/material';
import './App.css';
import Header from './Header';
import Infobox from './Infobox';
import LineGraph from './LineGraph';
import Map from "./Map"
import { useStateValue } from './StateProvider';
import Table from './Table';
import 'leaflet/dist/leaflet.css'
import React, {useState} from "react"
import { prettyPrintStat } from './util.js'



function App() {

  const [{currentCountryInfo, tableData, mapCenter, zoom, countries}] = useStateValue()
  const [casesType, setCasesType] = useState('cases')

  console.log(casesType)

  console.log(currentCountryInfo)
  
  return (
    <div className="app">
      <div className="app__left">
        <Header />
        <div className="app__stats">
          <Infobox
            isRed={true}
            active={casesType==="cases"}
            onClick={(e) => setCasesType('cases')}
            title="Cases"
            cases={prettyPrintStat(currentCountryInfo?.todayCases)}
            total={prettyPrintStat(currentCountryInfo?.cases)}
          />
          <Infobox
            isRed={false}
            active={casesType==="recovered"}
            onClick={(e) => setCasesType('recovered')}
            title="Recovered"
            cases={prettyPrintStat(currentCountryInfo?.todayRecovered)}
            total={prettyPrintStat(currentCountryInfo?.recovered)}
          />
          <Infobox
            isRed={true}
            active={casesType==="deaths"}
            onClick={(e) => setCasesType('deaths')}
            title="Deaths"
            cases={prettyPrintStat(currentCountryInfo?.todayDeaths)}
            total={prettyPrintStat(currentCountryInfo?.deaths)}
          />
        </div>
        <Map 
          center={mapCenter}
          zoom={zoom}
          countries={countries}
          casesType={casesType}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData}/>
          <h3 className="app__graphTitle">Worldwide new {casesType}</h3>
          <LineGraph className="app__graph" casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;

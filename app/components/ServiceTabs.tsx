'use client'

import { useState } from 'react'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'

const tabs = [
  { id: 'rc-details', label: 'RC Details', icon: '/img/home/rcDetailIcon.svg' },
  { id: 'challan-search', label: 'Challan Search', icon: '/img/home/challansIcon.svg' },
  { id: 'car-insurance', label: 'Car Insurance', icon: '/img/home/carInsuranceIcon.svg' },
  { id: 'bike-insurance', label: 'Bike Insurance', icon: '/img/home/bikeInsuranceIcon.svg', active: true },
  { id: 'service-history', label: 'Service History', icon: '/img/home/serviceHistoryIcon.svg' },
  { id: 'new-car', label: 'New Car', icon: '/img/home/newCarIcon.svg' },
  { id: 'used-car', label: 'Used Car', icon: '/img/home/usedCarIcon.svg' },
  { id: 'fastag', label: 'FASTag', icon: '/img/home/fastag_icon.svg' },
]

export function ServiceTabs() {
  const [activeTab, setActiveTab] = useState('bike-insurance')
  const [vehicleNumber, setVehicleNumber] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching:', vehicleNumber)
  }

  return (
    <div>
      <div className="tabs_headers__6fAS8">
        {tabs.map((tab) => (
          <div 
            key={tab.id}
            className={`tabs_header__5Qc_l ${activeTab === tab.id ? 'tabs_active__9fSsT' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            role="button"
            tabIndex={0}
          >
            <img alt={`${tab.label.toLowerCase()} icon`} src={tab.icon} width={36} height={36} />
            <div>
              <div data-status={activeTab === tab.id ? 'active' : 'inactive'}>{tab.label}</div>
            </div>
            <div className={`tabs_line__8Dhax ${activeTab === tab.id ? '' : ' '}`}></div>
          </div>
        ))}
      </div>
      
      <div className="home_inputVehicalContainer__4kwKQ">
        <form onSubmit={handleSearch}>
          <div className="input_inputWrapper__6aRlN">
            <div className="home_inputPrefixContent__BSuqO">
              <img src="/img/service-history/india-logo.svg" alt="India logo" width={24} height={24} />
              <p>IND</p>
            </div>
            <Input
              type="text"
              placeholder="Enter Vehicle Registration Number"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              className="input_inputBox__cnp18 border-0 focus-visible:ring-0"
            />
          </div>
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            Search
          </Button>
        </form>
      </div>
    </div>
  )
}

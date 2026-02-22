'use client'

import { useState } from 'react'
import { 
  Car, 
  FileText, 
  CreditCard, 
  Bike, 
  Wrench, 
  Tag, 
  Search,
  MapPin
} from 'lucide-react'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'

const tabs = [
  { id: 'rc-details', label: 'RC Details', icon: FileText },
  { id: 'challan-search', label: 'Challan Search', icon: CreditCard },
  { id: 'car-insurance', label: 'Car Insurance', icon: Car },
  { id: 'bike-insurance', label: 'Bike Insurance', icon: Bike, active: true },
  { id: 'service-history', label: 'Service History', icon: Wrench },
  { id: 'new-car', label: 'New Car', icon: Tag },
  { id: 'used-car', label: 'Used Car', icon: Car },
  { id: 'fastag', label: 'FASTag', icon: Tag },
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
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <div 
              key={tab.id}
              className={`tabs_header__5Qc_l ${activeTab === tab.id ? 'tabs_active__9fSsT' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="button"
              tabIndex={0}
            >
              <Icon className="w-9 h-9 text-gray-600" />
              <div>
                <div data-status={activeTab === tab.id ? 'active' : 'inactive'}>{tab.label}</div>
              </div>
              <div className={`tabs_line__8Dhax ${activeTab === tab.id ? '' : ' '}`}></div>
            </div>
          )
        })}
      </div>
      
      <div className="home_inputVehicalContainer__4kwKQ">
        <form onSubmit={handleSearch}>
          <div className="input_inputWrapper__6aRlN">
            <div className="home_inputPrefixContent__BSuqO flex items-center gap-2">
              <MapPin className="w-4 h-4" />
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
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </form>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { LucideIcon } from 'lucide-react'
import {
  Car,
  FileText,
  CreditCard,
  Bike,
  Wrench,
  Tag,
  Search,
  MapPin,
} from 'lucide-react'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'

export interface ServiceTabConfig {
  id: string
  label: string
  icon: LucideIcon
  /** Destination when search is submitted (with vehicle number in query if needsVehicleNumber) */
  href: string
  /** Placeholder for the search input */
  placeholder: string
  /** If true, form submits by navigating to href with ?vehicle= or ?number= */
  needsVehicleNumber?: boolean
  /** Use as default active tab when no tab is selected */
  defaultActive?: boolean
}

const defaultTabs: ServiceTabConfig[] = [
  {
    id: 'rc-details',
    label: 'RC Details',
    icon: FileText,
    href: '/rc-search',
    placeholder: 'Enter Vehicle Registration Number',
    needsVehicleNumber: true,
  },
  {
    id: 'challan-search',
    label: 'Challan Search',
    icon: CreditCard,
    href: '/e-challan-check',
    placeholder: 'Enter Vehicle Number to Check Challans',
    needsVehicleNumber: true,
  },
  {
    id: 'car-insurance',
    label: 'Car Insurance',
    icon: Car,
    href: '/car-insurance',
    placeholder: 'Enter Vehicle Number',
    needsVehicleNumber: true,
  },
  {
    id: 'bike-insurance',
    label: 'Bike Insurance',
    icon: Bike,
    href: '/bike-insurance',
    placeholder: 'Enter Vehicle Number',
    needsVehicleNumber: true,
    defaultActive: true,
  },
  {
    id: 'service-history',
    label: 'Service History',
    icon: Wrench,
    href: '/service-history',
    placeholder: 'Enter Vehicle Registration Number',
    needsVehicleNumber: true,
  },
  {
    id: 'new-car',
    label: 'New Car',
    icon: Tag,
    href: '/new-cars',
    placeholder: 'Search new cars',
    needsVehicleNumber: false,
  },
  {
    id: 'used-car',
    label: 'Used Car',
    icon: Car,
    href: '/used-cars',
    placeholder: 'Search used cars',
    needsVehicleNumber: false,
  },
  {
    id: 'fastag',
    label: 'FASTag',
    icon: Tag,
    href: '/fastag',
    placeholder: 'Enter Vehicle Number for FASTag',
    needsVehicleNumber: true,
  },
]

interface ServiceTabsProps {
  /** Override or extend the default tab config. If provided, replaces the default set. */
  tabs?: ServiceTabConfig[]
  /** Optional callback when search is submitted (e.g. analytics). Receives tab id and vehicle number (if any). */
  onSearch?: (tabId: string, vehicleNumber: string) => void
}

export function ServiceTabs({ tabs: tabsProp, onSearch }: ServiceTabsProps) {
  const router = useRouter()
  const tabs = tabsProp ?? defaultTabs

  const defaultTabId =
    tabs.find((t) => t.defaultActive)?.id ?? tabs[0]?.id ?? 'bike-insurance'

  const [activeTab, setActiveTab] = useState(defaultTabId)
  const [vehicleNumber, setVehicleNumber] = useState('')

  const activeTabConfig = tabs.find((t) => t.id === activeTab) ?? tabs[0]
  const showVehicleInput = activeTabConfig?.needsVehicleNumber !== false

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!activeTabConfig) return

    onSearch?.(activeTabConfig.id, vehicleNumber.trim())

    const url = new URL(activeTabConfig.href, window.location.origin)
    const trimmed = vehicleNumber.trim()
    if (activeTabConfig.needsVehicleNumber && trimmed) {
      url.searchParams.set('vehicle', trimmed)
      url.searchParams.set('number', trimmed)
    } else if (!activeTabConfig.needsVehicleNumber && trimmed) {
      url.searchParams.set('q', trimmed)
      url.searchParams.set('search', trimmed)
    }

    router.push(url.pathname + url.search)
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
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActiveTab(tab.id)
                }
              }}
              role="button"
              tabIndex={0}
              aria-selected={activeTab === tab.id}
              aria-label={tab.label}
            >
              <Icon className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 text-gray-600" />
              <div>
                <div data-status={activeTab === tab.id ? 'active' : 'inactive'}>
                  {tab.label}
                </div>
              </div>
              <div
                className={`tabs_line__8Dhax ${activeTab === tab.id ? '' : ' '}`}
              />
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
              placeholder={activeTabConfig?.placeholder ?? 'Enter Vehicle Registration Number'}
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              className="input_inputBox__cnp18 border-0 focus-visible:ring-0"
              aria-label="Vehicle number or search"
            />
          </div>
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            <Search className="w-4 h-4 mr-2" />
            {showVehicleInput ? 'Search' : 'Go'}
          </Button>
        </form>
      </div>
    </div>
  )
}

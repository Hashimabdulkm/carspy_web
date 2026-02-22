'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { LucideIcon } from 'lucide-react'
import {
  Car,
  FileText,
  CreditCard,
  Bike,
  Tag,
  Search,
} from 'lucide-react'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { Slider } from '@/app/components/ui/slider'

/** Options for New Car / Used Car filter row */
const carFilterBrands = [
  { value: '', label: 'Brand' },
  { value: 'maruti-suzuki', label: 'Maruti Suzuki' },
  { value: 'hyundai', label: 'Hyundai' },
  { value: 'tata', label: 'Tata' },
  { value: 'mahindra', label: 'Mahindra' },
  { value: 'honda', label: 'Honda' },
  { value: 'toyota', label: 'Toyota' },
  { value: 'kia', label: 'Kia' },
  { value: 'volkswagen', label: 'Volkswagen' },
  { value: 'skoda', label: 'Skoda' },
  { value: 'mg', label: 'MG' },
]

const carFilterModels = [
  { value: '', label: 'Model' },
  { value: 'creta', label: 'Creta' },
  { value: 'swift', label: 'Swift' },
  { value: 'nexon', label: 'Nexon' },
  { value: 'city', label: 'City' },
  { value: 'virtus', label: 'Virtus' },
  { value: 'baleno', label: 'Baleno' },
  { value: 'seltos', label: 'Seltos' },
  { value: 'grand-vitara', label: 'Grand Vitara' },
  { value: 'brezza', label: 'Brezza' },
  { value: 'altroz', label: 'Altroz' },
  { value: 'punch', label: 'Punch' },
  { value: 'scorpio-n', label: 'Scorpio N' },
  { value: 'xuv700', label: 'XUV700' },
  { value: 'kushaq', label: 'Kushaq' },
  { value: 'slavia', label: 'Slavia' },
]

/** Price slider: values in lakh, max 100 = ₹1 crore */
const PRICE_SLIDER_MAX = 100
const PRICE_SLIDER_STEP = 5

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
  /** If true, show brand / model / price filter instead of search input */
  useCarFilter?: boolean
}

const defaultTabs: ServiceTabConfig[] = [
  {
    id: 'new-car',
    label: 'New Car',
    icon: Tag,
    href: '/new-cars',
    placeholder: 'Search new cars',
    needsVehicleNumber: false,
    useCarFilter: true,
    defaultActive: true,
  },
  {
    id: 'used-car',
    label: 'Used Car',
    icon: Car,
    href: '/used-cars',
    placeholder: 'Search used cars',
    needsVehicleNumber: false,
    useCarFilter: true,
  },
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
    tabs.find((t) => t.defaultActive)?.id ?? tabs[0]?.id ?? 'new-car'

  const [activeTab, setActiveTab] = useState(defaultTabId)
  const [vehicleNumber, setVehicleNumber] = useState('')
  const [carBrand, setCarBrand] = useState('')
  const [carModel, setCarModel] = useState('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, PRICE_SLIDER_MAX])

  const activeTabConfig = tabs.find((t) => t.id === activeTab) ?? tabs[0]
  const showVehicleInput = activeTabConfig?.needsVehicleNumber !== false
  const showCarFilter = activeTabConfig?.useCarFilter === true

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!activeTabConfig) return

    const url = new URL(activeTabConfig.href, window.location.origin)

    if (showCarFilter) {
      onSearch?.(activeTabConfig.id, '')
      if (carBrand) url.searchParams.set('brand', carBrand)
      if (carModel) url.searchParams.set('model', carModel)
      const [minLakh, maxLakh] = priceRange
      if (minLakh > 0 || maxLakh < PRICE_SLIDER_MAX) {
        url.searchParams.set('price_min', String(minLakh * 100000))
        url.searchParams.set('price_max', String(maxLakh * 100000))
      }
      router.push(url.pathname + url.search)
      return
    }

    onSearch?.(activeTabConfig.id, vehicleNumber.trim())
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
      <div role="tablist" className="tabs_headers__6fAS8">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <div
              key={tab.id}
              role="tab"
              tabIndex={0}
              className={`tabs_header__5Qc_l flex-1 min-w-0 ${activeTab === tab.id ? 'tabs_active__9fSsT' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActiveTab(tab.id)
                }
              }}
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
          {showCarFilter ? (
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 items-end">
              <select
                value={carBrand}
                onChange={(e) => setCarBrand(e.target.value)}
                className="car-filter-select w-full min-w-0 pl-3 pr-9 py-2.5 rounded-lg border border-[var(--input)] bg-[#f5f5f5] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)] appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
                aria-label="Brand"
              >
                {carFilterBrands.map((o) => (
                  <option key={o.value || 'brand'} value={o.value}>{o.label}</option>
                ))}
              </select>
              <select
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                className="car-filter-select w-full min-w-0 pl-3 pr-9 py-2.5 rounded-lg border border-[var(--input)] bg-[#f5f5f5] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)] appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
                aria-label="Model"
              >
                {carFilterModels.map((o) => (
                  <option key={o.value || 'model'} value={o.value}>{o.label}</option>
                ))}
              </select>
              <div className="w-full min-w-0 flex flex-col gap-1 col-span-2 sm:col-span-1">
                <Slider
                  value={priceRange}
                  onValueChange={(v) => setPriceRange(v as [number, number])}
                  max={PRICE_SLIDER_MAX}
                  step={PRICE_SLIDER_STEP}
                  className="w-full"
                />
                <span className="text-sm text-muted-foreground whitespace-nowrap truncate">
                  ₹{priceRange[0]} - ₹{priceRange[1] === PRICE_SLIDER_MAX ? '100+' : priceRange[1]} Lakh
                </span>
              </div>
              <Button type="submit" className="bg-primary hover:bg-primary/90 w-full min-w-0 col-span-2 sm:col-span-1">
                <Search className="w-4 h-4 mr-2" />
                Find cars
              </Button>
            </div>
          ) : (
            <>
              <div className="input_inputWrapper__6aRlN">
                <div className="home_inputPrefixContent__BSuqO flex items-center gap-2">
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
            </>
          )}
        </form>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { LucideIcon } from 'lucide-react'
import { useAuth } from '@/app/context/AuthContext'
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

interface CarFiltersData {
  brands: { id: number; name: string }[]
  vehicle_models: { id: number; name: string; brand_id: number; category_id: number }[]
}

/** Price slider: values in lakh, max 100 = ₹1 crore */
const PRICE_SLIDER_MAX = 100
const PRICE_SLIDER_STEP = 5

/** RC search: type and validation (same as backend) */
type RcSearchType = 'vehiclenumber' | 'chasisnumber' | 'enginenumber'
const RC_SEARCH_OPTIONS: { value: RcSearchType; label: string; pattern: RegExp; placeholder: string }[] = [
  { value: 'vehiclenumber', label: 'Vehicle number', pattern: /^[a-zA-Z0-9]{5,11}$/, placeholder: 'e.g. UP91L0001 (5–11 chars)' },
  { value: 'chasisnumber', label: 'Chassis number', pattern: /^[^\s]{5,24}$/, placeholder: '5–24 chars, no spaces' },
  { value: 'enginenumber', label: 'Engine number', pattern: /^[^\s]{5,24}$/, placeholder: '5–24 chars, no spaces' },
]

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
  /** If true, show "Coming Soon" tag on tab */
  comingSoon?: boolean
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
    comingSoon: true,
  },
  {
    id: 'bike-insurance',
    label: 'Bike Insurance',
    icon: Bike,
    href: '/bike-insurance',
    placeholder: 'Enter Vehicle Number',
    needsVehicleNumber: true,
    comingSoon: true,
  },
  {
    id: 'fastag',
    label: 'FASTag',
    icon: Tag,
    href: '/fastag',
    placeholder: 'Enter Vehicle Number for FASTag',
    needsVehicleNumber: true,
    comingSoon: true,
  },
]

interface ServiceTabsProps {
  /** Override or extend the default tab config. If provided, replaces the default set. */
  tabs?: ServiceTabConfig[]
  /** Optional callback when search is submitted (e.g. analytics). Receives tab id and vehicle number (if any). */
  onSearch?: (tabId: string, vehicleNumber: string) => void
}

/** RC details data from POST /api/vehicle-details (ULIP vehicle-details-json) */
interface RcDetailsData {
  rcRegnNo?: string
  rcRegnDt?: string
  rcChasiNo?: string
  rcEngNo?: string
  rcVhClassDesc?: string
  rcMakerDesc?: string
  rcMakerModel?: string
  rcBodyTypeDesc?: string
  rcFuelDesc?: string
  rcColor?: string
  rcOwnerName?: string
  rcFitUpto?: string
  rcNormsDesc?: string
  rcRegisteredAt?: string
  rcStatus?: string
  rcInsuranceComp?: string
  rcInsuranceUpto?: string
  [key: string]: unknown
}

const RC_DISPLAY_FIELDS: { key: keyof RcDetailsData; label: string }[] = [
  { key: 'rcRegnNo', label: 'Registration No' },
  { key: 'rcRegnDt', label: 'Registration Date' },
  { key: 'rcOwnerName', label: 'Owner Name' },
  { key: 'rcMakerModel', label: 'Maker / Model' },
  { key: 'rcVhClassDesc', label: 'Vehicle Class' },
  { key: 'rcFuelDesc', label: 'Fuel' },
  { key: 'rcColor', label: 'Color' },
  { key: 'rcChasiNo', label: 'Chassis No' },
  { key: 'rcEngNo', label: 'Engine No' },
  { key: 'rcFitUpto', label: 'Fitness Upto' },
  { key: 'rcInsuranceUpto', label: 'Insurance Upto' },
  { key: 'rcRegisteredAt', label: 'Registered At' },
  { key: 'rcStatus', label: 'Status' },
]

export function ServiceTabs({ tabs: tabsProp, onSearch }: ServiceTabsProps) {
  const router = useRouter()
  const { token } = useAuth()
  const tabs = tabsProp ?? defaultTabs

  const defaultTabId =
    tabs.find((t) => t.defaultActive)?.id ?? tabs[0]?.id ?? 'new-car'

  const [activeTab, setActiveTab] = useState(defaultTabId)
  const [vehicleNumber, setVehicleNumber] = useState('')
  const [carBrand, setCarBrand] = useState<number | ''>('')
  const [carModel, setCarModel] = useState<number | ''>('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, PRICE_SLIDER_MAX])
  const [carFilters, setCarFilters] = useState<CarFiltersData | null>(null)
  const [rcDetails, setRcDetails] = useState<RcDetailsData | null>(null)
  const [rcLoading, setRcLoading] = useState(false)
  const [rcError, setRcError] = useState<string | null>(null)
  const [rcSearchType, setRcSearchType] = useState<RcSearchType>('vehiclenumber')

  const activeTabConfig = tabs.find((t) => t.id === activeTab) ?? tabs[0]
  const showVehicleInput = activeTabConfig?.needsVehicleNumber !== false
  const showCarFilter = activeTabConfig?.useCarFilter === true
  const carFilterType = activeTab === 'used-car' ? 'old' : 'new'

  useEffect(() => {
    if (!showCarFilter) return
    fetch(`/api/cars/filters?type=${carFilterType}`)
      .then((res) => res.json())
      .then((data) => {
        const raw = data as CarFiltersData & { data?: CarFiltersData }
        setCarFilters(raw.data ?? raw)
      })
      .catch(() => setCarFilters(null))
  }, [showCarFilter, carFilterType])

  const brandOptions = carFilters?.brands ?? []
  const modelOptions = useMemo(() => {
    const allModels = carFilters?.vehicle_models ?? []
    if (carBrand === '') return allModels
    return allModels.filter((model) => model.brand_id === carBrand)
  }, [carFilters, carBrand])

  useEffect(() => {
    if (carModel === '') return
    if (!modelOptions.some((model) => model.id === carModel)) {
      setCarModel('')
    }
  }, [carModel, modelOptions])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!activeTabConfig) return

    const trimmed = vehicleNumber.trim()

    if (activeTab === 'rc-details' && trimmed) {
      if (!token) {
        setRcError('Please log in to fetch RC details.')
        return
      }
      const option = RC_SEARCH_OPTIONS.find((o) => o.value === rcSearchType)
      if (option && !option.pattern.test(trimmed)) {
        setRcError(
          option.value === 'vehiclenumber'
            ? 'Invalid vehicle number. Use 5–11 letters or numbers.'
            : option.value === 'chasisnumber'
              ? 'Invalid chassis number. Use 5–24 characters with no spaces.'
              : 'Invalid engine number. Use 5–24 characters with no spaces.'
        )
        return
      }
      onSearch?.(activeTabConfig.id, trimmed)
      setRcError(null)
      setRcDetails(null)
      setRcLoading(true)
      try {
        const body = { [rcSearchType]: trimmed } as { vehiclenumber: string } | { chasisnumber: string } | { enginenumber: string }
        const res = await fetch('/api/vehicle-details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        })
        const json = await res.json()
        if (!res.ok) {
          const msg = json?.data?.message ?? json?.message ?? res.statusText
          setRcError(msg === 'Token not provided' ? 'Session expired. Please log in again.' : msg)
          return
        }
        if (json.status === 'success' && json.data) {
          setRcDetails(json.data as RcDetailsData)
        } else {
          setRcError(json.message || 'No data returned')
        }
      } catch (err) {
        setRcError(err instanceof Error ? err.message : 'Request failed')
      } finally {
        setRcLoading(false)
      }
      return
    }

    const url = new URL(activeTabConfig.href, window.location.origin)

    if (showCarFilter) {
      onSearch?.(activeTabConfig.id, '')
      if (carBrand !== '') url.searchParams.set('brand_id', String(carBrand))
      if (carModel !== '') url.searchParams.set('vehicle_model_id', String(carModel))
      const [minLakh, maxLakh] = priceRange
      if (minLakh > 0 || maxLakh < PRICE_SLIDER_MAX) {
        url.searchParams.set('price_min', String(minLakh * 100000))
        url.searchParams.set('price_max', String(maxLakh * 100000))
      }
      router.push(url.pathname + url.search)
      return
    }

    onSearch?.(activeTabConfig.id, trimmed)
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
              onClick={() => {
                setActiveTab(tab.id)
                if (tab.id !== 'rc-details') {
                  setRcDetails(null)
                  setRcError(null)
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActiveTab(tab.id)
                  if (tab.id !== 'rc-details') {
                    setRcDetails(null)
                    setRcError(null)
                  }
                }
              }}
              aria-selected={activeTab === tab.id}
              aria-label={tab.label}
            >
              <Icon className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 text-gray-600" />
              <div className="flex flex-col items-center text-center">
                <div data-status={activeTab === tab.id ? 'active' : 'inactive'}>
                  {tab.label}
                </div>
                {tab.comingSoon && (
                  <span className="mt-1 inline-block rounded-full border border-amber-300 bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-800">
                    Coming Soon
                  </span>
                )}
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
                onChange={(e) => setCarBrand(e.target.value ? Number(e.target.value) : '')}
                className="car-filter-select w-full min-w-0 pl-3 pr-9 py-2.5 rounded-lg border border-[var(--input)] bg-[#f5f5f5] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)] appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
                aria-label="Brand"
              >
                <option value="">Brand</option>
                {brandOptions.map((brand) => (
                  <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
              </select>
              <select
                value={carModel}
                onChange={(e) => setCarModel(e.target.value ? Number(e.target.value) : '')}
                className="car-filter-select w-full min-w-0 pl-3 pr-9 py-2.5 rounded-lg border border-[var(--input)] bg-[#f5f5f5] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)] appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
                aria-label="Model"
              >
                <option value="">Model</option>
                {modelOptions.map((model) => (
                  <option key={model.id} value={model.id}>{model.name}</option>
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
          ) : activeTab === 'rc-details' ? (
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <select
                value={rcSearchType}
                onChange={(e) => setRcSearchType(e.target.value as RcSearchType)}
                className="px-3 py-2.5 rounded-lg border border-[var(--input)] bg-[#f5f5f5] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)] min-w-[140px] shrink-0"
                aria-label="Search by"
              >
                {RC_SEARCH_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <div className="input_inputWrapper__6aRlN flex-1 min-w-0">
                <div className="home_inputPrefixContent__BSuqO flex items-center gap-2">
                  <p>IND</p>
                </div>
                <Input
                  type="text"
                  placeholder={RC_SEARCH_OPTIONS.find((o) => o.value === rcSearchType)?.placeholder ?? 'Enter value'}
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  className="input_inputBox__cnp18 border-0 focus-visible:ring-0"
                  aria-label={RC_SEARCH_OPTIONS.find((o) => o.value === rcSearchType)?.label ?? 'Value'}
                />
              </div>
              <Button type="submit" className="bg-primary hover:bg-primary/90 shrink-0">
                <Search className="w-4 h-4 mr-2" />
                Search
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

        {activeTab === 'rc-details' && (rcLoading || rcError || rcDetails) && (
          <div className="mt-4 p-4 rounded-lg border border-[var(--border)] bg-white min-h-[120px]">
            {rcLoading && (
              <div className="flex items-center justify-center gap-2 text-muted-foreground py-8">
                <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden />
                <span>Fetching RC details…</span>
              </div>
            )}
            {rcError && !rcLoading && (
              <p className="text-destructive text-sm py-4">{rcError}</p>
            )}
            {rcDetails && !rcLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                {RC_DISPLAY_FIELDS.map(({ key, label }) => {
                  const value = rcDetails[key]
                  if (value == null || value === '') return null
                  return (
                    <div key={key} className="flex flex-wrap gap-x-2">
                      <span className="text-muted-foreground shrink-0">{label}:</span>
                      <span className="font-medium">{String(value)}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

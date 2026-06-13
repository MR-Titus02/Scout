import React, { useState, useEffect, useCallback } from 'react'

// ─── Types ─────────────────────────────────────────────────────────────────────
type ScoutSection = {
  id: string
  name: string
  ageRange: string
  description: string
  bgClass: string
  textClass: string
  emoji: string
  badgeColor: string
}

type FormData = {
  fullName: string
  dobDay: string
  dobMonth: string
  dobYear: string
  gender: string
  occupation: string
  phone: string
  email: string
  selectedRole: string  // 'rover' | 'leader' — only for age 17-26
  guardianName: string
  guardianRelation: string
  guardianPhone: string
  guardianEmail: string
  parentConsent: boolean
  preferredUnit: string
  heardFrom: string
  notes: string
}

const INITIAL_FORM: FormData = {
  fullName: '', dobDay: '', dobMonth: '', dobYear: '',
  gender: '', occupation: '', phone: '', email: '',
  selectedRole: '',
  guardianName: '', guardianRelation: '', guardianPhone: '', guardianEmail: '',
  parentConsent: false, preferredUnit: '', heardFrom: '', notes: '',
}

// ─── Scout Section Data ────────────────────────────────────────────────────────
const SECTIONS: Record<string, ScoutSection> = {
  singithi: { id: 'singithi', name: 'Singithi Scout', ageRange: '6–8', emoji: '⭐', bgClass: 'bg-yellow-400', textClass: 'text-yellow-950', badgeColor: 'bg-yellow-400 text-yellow-950', description: 'The first step into scouting! Young members learn basic values, teamwork, and fun outdoor activities in a safe and nurturing environment.' },
  cub:      { id: 'cub',      name: 'Cub Scout',      ageRange: '8–11', emoji: '🐯', bgClass: 'bg-orange-400', textClass: 'text-white',         badgeColor: 'bg-orange-400 text-white',       description: 'Cub Scouts develop curiosity, creativity, and character through games, crafts, and community activities that build teamwork and friendship.' },
  junior:   { id: 'junior',   name: 'Junior Scout',   ageRange: '11–14', emoji: '🌿', bgClass: 'bg-green-600', textClass: 'text-white',         badgeColor: 'bg-green-600 text-white',         description: 'Junior Scouts take on greater responsibilities — camping, first aid, leadership, and community projects begin here.' },
  senior:   { id: 'senior',   name: 'Senior Scout',   ageRange: '14–17', emoji: '🏕️', bgClass: 'bg-[#4a5e3f]', textClass: 'text-white',       badgeColor: 'bg-[#4a5e3f] text-white',         description: 'Senior Scouts develop leadership skills, participate in district events, and take on more complex outdoor challenges and service projects.' },
  rover:    { id: 'rover',    name: 'Rover Scout',    ageRange: '17–26', emoji: '🧭', bgClass: 'bg-slate-600', textClass: 'text-white',         badgeColor: 'bg-slate-600 text-white',         description: 'Rover Scouts are young adults who serve the community through volunteer projects, mentor younger scouts, and develop professional skills.' },
  leader:   { id: 'leader',   name: 'Scout Leader',   ageRange: '17+',   emoji: '🌳', bgClass: 'bg-[#0f4c23]', textClass: 'text-white',        badgeColor: 'bg-[#0f4c23] text-white',         description: 'Scout Leaders are dedicated volunteers who guide and mentor the next generation. They facilitate programmes and uphold the values of scouting.' },
}

// ─── Age / Section Logic ───────────────────────────────────────────────────────
function calcAge(day: string, month: string, year: string): number {
  if (!day || !month || !year) return -1
  const birth = new Date(+year, +month - 1, +day)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age
}

function getAutoSection(age: number): string | null {
  if (age < 6)  return null
  if (age <= 8)  return 'singithi'
  if (age <= 11) return 'cub'
  if (age <= 14) return 'junior'
  if (age <= 17) return 'senior'
  if (age <= 26) return 'rover'   // will show choice between rover/leader
  return 'leader'
}

const isRoverAge = (age: number) => age >= 17 && age <= 26

// ─── Helpers ───────────────────────────────────────────────────────────────────
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const currentYear = new Date().getFullYear()
const YEARS = Array.from({ length: 100 }, (_, i) => currentYear - i)
const DAYS  = Array.from({ length: 31 }, (_, i) => i + 1)

// ─── Reusable UI primitives ───────────────────────────────────────────────────
function Field({ label, hint, error, children }: { label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[13px] font-bold text-gray-600 mb-2 uppercase tracking-wider">{label}</label>
      {hint && <p className="text-xs text-gray-400 mb-2">{hint}</p>}
      {children}
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/></svg>
          {error}
        </p>
      )}
    </div>
  )
}

function StyledSelect({ value, onChange, children, placeholder }: { value: string; onChange: (v: string) => void; children: React.ReactNode; placeholder: string }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full appearance-none px-4 py-3 pr-10 rounded-xl bg-white border-2 border-gray-100 focus:outline-none focus:border-[var(--tone-olive)] transition-all text-sm font-medium text-gray-800 shadow-sm hover:border-gray-200 cursor-pointer"
      >
        <option value="" disabled>{placeholder}</option>
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}

// Custom dropdown with fixed-height scrollable list (shows 12 items at once)
type DropdownOption = { label: string; value: string }
function CustomDropdown({ value, onChange, options, placeholder }: {
  value: string
  onChange: (v: string) => void
  options: DropdownOption[]
  placeholder: string
}) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  const selectedLabel = options.find(o => o.value === value)?.label

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white border-2 text-sm font-medium shadow-sm transition-all ${
          open ? 'border-[var(--tone-olive)]' : 'border-gray-100 hover:border-gray-200'
        }`}
      >
        <span className={selectedLabel ? 'text-gray-800' : 'text-gray-300'}>{selectedLabel || placeholder}</span>
        <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{placeholder}</span>
            <button type="button" onClick={() => setOpen(false)} className="text-gray-300 hover:text-gray-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          {/* Scrollable list — exactly 12 items tall (12 × 36px = 432px) */}
          <ul className="overflow-y-auto" style={{ maxHeight: '432px' }}>
            {options.map(opt => (
              <li key={opt.value}>
                <button
                  type="button"
                  onClick={() => { onChange(opt.value); setOpen(false) }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    opt.value === value
                      ? 'bg-[rgba(15,76,35,0.08)] text-[var(--tone-olive)] font-bold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  style={{ minHeight: '36px' }}
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function TextInput({ value, onChange, placeholder, type = 'text' }: { value: string; onChange: (v: string) => void; placeholder: string; type?: string }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl bg-white border-2 border-gray-100 focus:outline-none focus:border-[var(--tone-olive)] transition-all text-sm font-medium text-gray-800 shadow-sm hover:border-gray-200 placeholder-gray-300"
    />
  )
}

function CardRadio<T extends string>({
  options, value, onChange, cols = 2
}: {
  options: { value: T; label: string; sub?: string; icon?: React.ReactNode }[]
  value: T | string
  onChange: (v: T) => void
  cols?: number
}) {
  return (
    <div className={`grid gap-3 ${cols === 3 ? 'grid-cols-3' : cols === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2'}`}>
      {options.map(opt => (
        <button
          type="button"
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`flex flex-col items-center justify-center gap-1.5 px-3 py-4 rounded-2xl border-2 text-center transition-all duration-200 font-semibold text-sm cursor-pointer
            ${value === opt.value
              ? 'border-[var(--tone-olive)] bg-[rgba(15,76,35,0.05)] text-[var(--tone-olive)] shadow-md scale-[1.02]'
              : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200 hover:bg-gray-50 shadow-sm'
            }`}
        >
          {opt.icon && <span className="text-2xl">{opt.icon}</span>}
          <span>{opt.label}</span>
          {opt.sub && <span className="text-[11px] font-normal text-gray-400">{opt.sub}</span>}
        </button>
      ))}
    </div>
  )
}

// ─── DOB Picker ────────────────────────────────────────────────────────────────
function DOBPicker({ day, month, year, onChange, error }: {
  day: string; month: string; year: string
  onChange: (field: 'dobDay' | 'dobMonth' | 'dobYear', val: string) => void
  error?: string
}) {
  const dayOptions   = DAYS.map(d  => ({ value: String(d), label: String(d) }))
  const monthOptions = MONTHS.map((m, i) => ({ value: String(i + 1), label: m }))
  const yearOptions  = YEARS.map(y => ({ value: String(y), label: String(y) }))

  return (
    <Field label="Date of Birth *" error={error}>
      <div className="grid grid-cols-3 gap-3">
        <CustomDropdown value={day}   onChange={v => onChange('dobDay', v)}   options={dayOptions}   placeholder="Day" />
        <CustomDropdown value={month} onChange={v => onChange('dobMonth', v)} options={monthOptions} placeholder="Month" />
        <CustomDropdown value={year}  onChange={v => onChange('dobYear', v)}  options={yearOptions}  placeholder="Year" />
      </div>
    </Field>
  )
}

// ─── Step Indicator ────────────────────────────────────────────────────────────
function StepIndicator({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center gap-1 mb-8">
      {steps.map((label, i) => (
        <React.Fragment key={label}>
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              i < current  ? 'bg-[var(--tone-olive)] text-white shadow-md'
              : i === current ? 'bg-[var(--tone-forest)] text-white ring-4 ring-[var(--tone-olive)]/20 shadow-lg'
              : 'bg-gray-100 text-gray-400'
            }`}>
              {i < current
                ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                : i + 1}
            </div>
            <span className={`text-[9px] font-bold uppercase tracking-wider hidden sm:block ${i === current ? 'text-[var(--tone-olive)]' : 'text-gray-300'}`}>{label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-0.5 rounded-full transition-all duration-500 ${i < current ? 'bg-[var(--tone-olive)]' : 'bg-gray-200'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

// ─── Section Display Card ──────────────────────────────────────────────────────
function SectionCard({ sec, selected, onClick }: { sec: ScoutSection; selected?: boolean; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-5 border-2 transition-all duration-300 ${onClick ? 'cursor-pointer' : ''} ${
        selected
          ? 'border-[var(--tone-olive)] shadow-lg scale-[1.02]'
          : onClick
          ? 'border-gray-100 bg-gray-50 hover:border-gray-200 hover:shadow-md'
          : 'border-gray-100 bg-gray-50'
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${sec.bgClass}`}>{sec.emoji}</div>
        <div>
          <div className="font-bold text-gray-800 text-base">{sec.name}</div>
          <div className="text-xs text-gray-400 font-semibold">Ages {sec.ageRange}</div>
        </div>
        {selected !== undefined && (
          <div className={`ml-auto w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selected ? 'border-[var(--tone-olive)] bg-[var(--tone-olive)]' : 'border-gray-300'}`}>
            {selected && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>}
          </div>
        )}
      </div>
      <p className="text-sm text-gray-500 leading-relaxed">{sec.description}</p>
    </div>
  )
}

// ─── Main Modal ────────────────────────────────────────────────────────────────
export default function JoinModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const age = calcAge(form.dobDay, form.dobMonth, form.dobYear)
  const autoSectionId = age >= 0 ? getAutoSection(age) : null
  const isRover = isRoverAge(age)
  const needsParent = age >= 6 && age < 19 && form.occupation === 'school'

  // Effective section to display in summary/success
  const effectiveSection = isRover && form.selectedRole ? SECTIONS[form.selectedRole] : (autoSectionId ? SECTIONS[autoSectionId] : null)

  const stepLabels = needsParent
    ? ['Personal', 'Section', 'Parent', 'Final']
    : ['Personal', 'Section', 'Final']
  const totalSteps = stepLabels.length
  const isFinalStep = step === totalSteps - 1
  const parentStep = needsParent ? 2 : -1

  const handleKey = useCallback((e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }, [onClose])

  useEffect(() => {
    if (isOpen) { document.addEventListener('keydown', handleKey); document.body.style.overflow = 'hidden' }
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = '' }
  }, [isOpen, handleKey])

  useEffect(() => {
    if (!isOpen) setTimeout(() => { setStep(0); setForm(INITIAL_FORM); setErrors({}); setSubmitted(false); setSubmitting(false) }, 300)
  }, [isOpen])

  const update = (field: keyof FormData, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {}
    if (step === 0) {
      if (!form.fullName.trim()) e.fullName = 'Please enter your full name.'
      if (!form.dobDay || !form.dobMonth || !form.dobYear) e.dobDay = 'Please select a complete date of birth.'
      else if (age < 6) e.dobDay = 'Applicants must be at least 6 years old to join.'
      if (!form.gender) e.gender = 'Please select your gender.'
      if (!form.occupation) e.occupation = 'Please select your current status.'
      if (!form.phone.match(/^\+?[\d\s\-]{7,15}$/)) e.phone = 'Please enter a valid phone number.'
      if (form.email && !form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Please enter a valid email address.'
    }
    if (step === 1 && isRover && !form.selectedRole) e.selectedRole = 'Please choose your preferred role.'
    if (step === parentStep) {
      if (!form.guardianName.trim()) e.guardianName = 'Guardian name is required.'
      if (!form.guardianRelation) e.guardianRelation = 'Please select the relationship.'
      if (!form.guardianPhone.match(/^\+?[\d\s\-]{7,15}$/)) e.guardianPhone = 'Please enter a valid phone number.'
      if (!form.parentConsent) e.parentConsent = 'Parental consent is required to proceed.'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => { if (validate()) setStep(s => Math.min(s + 1, totalSteps - 1)) }
  const back = () => setStep(s => Math.max(s - 1, 0))
  const submit = () => {
    if (!validate()) return
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setSubmitted(true) }, 2000)
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-2xl bg-[#f8f9f6] rounded-[28px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="bg-[var(--tone-forest)] text-white px-8 py-5 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight">Join the Movement</h2>
            <p className="text-white/60 text-xs mt-0.5">Kilinochchi District Scout Association</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" aria-label="Close">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        {/* ── Body ── */}
        <div className="flex-1 overflow-y-auto px-8 py-7">
          {submitted ? (
            <div className="flex flex-col items-center text-center py-8 gap-3">
              <div className="w-20 h-20 rounded-full bg-[rgba(15,76,35,0.1)] text-[var(--tone-olive)] flex items-center justify-center mb-2">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
              </div>
              <h3 className="text-2xl font-bold text-[var(--tone-heading)]">Application Submitted!</h3>
              <p className="text-[var(--tone-muted)] max-w-sm text-sm leading-relaxed">
                Welcome, <strong>{form.fullName}</strong>! Your application to join as a <strong>{effectiveSection?.name}</strong> has been received. Our team will contact you within 5–7 working days.
              </p>
              {effectiveSection && (
                <div className={`mt-2 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${effectiveSection.bgClass} ${effectiveSection.textClass}`}>
                  {effectiveSection.emoji} {effectiveSection.name}
                </div>
              )}
              <button onClick={onClose} className="btn-primary mt-4">Done</button>
            </div>
          ) : (
            <>
              <StepIndicator steps={stepLabels} current={step} />

              {/* ── STEP 0: Personal ── */}
              {step === 0 && (
                <div className="space-y-5">
                  <div className="mb-1">
                    <h3 className="text-xl font-black text-[var(--tone-heading)]">Personal Details</h3>
                    <p className="text-sm text-[var(--tone-muted)] mt-0.5">Tell us a little about yourself to get started.</p>
                  </div>

                  <Field label="Full Name *" error={errors.fullName}>
                    <TextInput value={form.fullName} onChange={v => update('fullName', v)} placeholder="e.g. Aravinthan Kumar" />
                  </Field>

                  <DOBPicker
                    day={form.dobDay} month={form.dobMonth} year={form.dobYear}
                    onChange={(f, v) => update(f, v)}
                    error={errors.dobDay}
                  />
                  {age >= 6 && (
                    <div className="flex items-center gap-2 -mt-3">
                      <div className="w-2 h-2 rounded-full bg-[var(--tone-olive)]" />
                      <span className="text-xs font-bold text-[var(--tone-olive)]">Age calculated: {age} years old</span>
                      {autoSectionId && <span className="text-xs text-gray-400">→ {SECTIONS[autoSectionId]?.name}{isRover ? ' or Scout Leader' : ''}</span>}
                    </div>
                  )}

                  <Field label="Gender *" error={errors.gender}>
                    <CardRadio
                      cols={3}
                      options={[
                        { value: 'male',   label: 'Male',   icon: '♂️' },
                        { value: 'female', label: 'Female', icon: '♀️' },
                        { value: 'other',  label: 'Prefer not to say', icon: '—' },
                      ]}
                      value={form.gender}
                      onChange={v => update('gender', v)}
                    />
                  </Field>

                  <Field label="Current Status *" error={errors.occupation}>
                    <CardRadio
                      cols={2}
                      options={[
                        { value: 'school',     label: 'School Student',     sub: 'Age below 19', icon: '🏫' },
                        { value: 'university', label: 'University Student',  sub: 'Higher education', icon: '🎓' },
                        { value: 'employed',   label: 'Employed',            sub: 'Working professional', icon: '💼' },
                        { value: 'other',      label: 'Other',               sub: '', icon: '✦' },
                      ]}
                      value={form.occupation}
                      onChange={v => update('occupation', v)}
                    />
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Contact Number *" error={errors.phone}>
                      <TextInput type="tel" value={form.phone} onChange={v => update('phone', v)} placeholder="+94 7X XXX XXXX" />
                    </Field>
                    <Field label="Email (optional)" error={errors.email}>
                      <TextInput type="email" value={form.email} onChange={v => update('email', v)} placeholder="your@email.com" />
                    </Field>
                  </div>
                </div>
              )}

              {/* ── STEP 1: Section ── */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xl font-black text-[var(--tone-heading)]">Your Scout Section</h3>
                    <p className="text-sm text-[var(--tone-muted)] mt-0.5">Based on your age ({age} years old)</p>
                  </div>

                  {isRover ? (
                    <>
                      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-sm text-blue-700 flex items-start gap-2">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        <p>At age <strong>{age}</strong>, you are eligible for <strong>both</strong> Rover Scout and Scout Leader. Please choose the role that best fits your interest.</p>
                      </div>
                      {errors.selectedRole && <p className="text-xs text-red-500 flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/></svg>{errors.selectedRole}</p>}
                      <div className="grid grid-cols-1 gap-4">
                        <SectionCard sec={SECTIONS.rover} selected={form.selectedRole === 'rover'} onClick={() => update('selectedRole', 'rover')} />
                        <SectionCard sec={SECTIONS.leader} selected={form.selectedRole === 'leader'} onClick={() => update('selectedRole', 'leader')} />
                      </div>
                    </>
                  ) : autoSectionId ? (
                    <>
                      <SectionCard sec={SECTIONS[autoSectionId]} />
                      {needsParent && (
                        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800 flex items-start gap-2">
                          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                          <p>Since you're a school student under 19, we'll need your <strong>parent or guardian's details and consent</strong> in the next step.</p>
                        </div>
                      )}
                    </>
                  ) : null}
                </div>
              )}

              {/* ── STEP 2 (conditional): Parent / Guardian ── */}
              {step === parentStep && needsParent && (
                <div className="space-y-5">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 text-xl">👨‍👦</div>
                    <div>
                      <h3 className="text-xl font-black text-[var(--tone-heading)]">Parent / Guardian</h3>
                      <p className="text-xs text-[var(--tone-muted)]">Required for school students under 19</p>
                    </div>
                  </div>

                  <Field label="Guardian's Full Name *" error={errors.guardianName}>
                    <TextInput value={form.guardianName} onChange={v => update('guardianName', v)} placeholder="e.g. Suresh Kumar" />
                  </Field>

                  <Field label="Relationship *" error={errors.guardianRelation}>
                    <CardRadio
                      cols={3}
                      options={[
                        { value: 'mother',   label: 'Mother',         icon: '👩' },
                        { value: 'father',   label: 'Father',         icon: '👨' },
                        { value: 'guardian', label: 'Legal Guardian', icon: '🧑' },
                      ]}
                      value={form.guardianRelation}
                      onChange={v => update('guardianRelation', v)}
                    />
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Guardian's Phone *" error={errors.guardianPhone}>
                      <TextInput type="tel" value={form.guardianPhone} onChange={v => update('guardianPhone', v)} placeholder="+94 7X XXX XXXX" />
                    </Field>
                    <Field label="Guardian's Email (optional)">
                      <TextInput type="email" value={form.guardianEmail} onChange={v => update('guardianEmail', v)} placeholder="parent@email.com" />
                    </Field>
                  </div>

                  {/* Consent Block */}
                  <div className={`rounded-2xl border-2 p-5 transition-all duration-300 cursor-pointer ${form.parentConsent ? 'border-[var(--tone-olive)] bg-[rgba(15,76,35,0.04)]' : 'border-gray-200 bg-white'}`}
                    onClick={() => update('parentConsent', !form.parentConsent)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-6 h-6 mt-0.5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${form.parentConsent ? 'border-[var(--tone-olive)] bg-[var(--tone-olive)]' : 'border-gray-300'}`}>
                        {form.parentConsent && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>}
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed select-none">
                        I, <strong>{form.guardianName || 'the parent/guardian'}</strong>, confirm I am the parent or legal guardian of{' '}
                        <strong>{form.fullName || 'the applicant'}</strong> and provide my full consent for them to join the Kilinochchi District Scout Association. I acknowledge the scouting activities involved and agree to be the primary contact for all scout-related communication.
                      </p>
                    </div>
                    {errors.parentConsent && <p className="mt-2 text-xs text-red-500 ml-10">{errors.parentConsent}</p>}
                  </div>
                </div>
              )}

              {/* ── FINAL STEP ── */}
              {isFinalStep && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xl font-black text-[var(--tone-heading)]">Almost There!</h3>
                    <p className="text-sm text-[var(--tone-muted)] mt-0.5">A few last details to complete your application.</p>
                  </div>

                  <Field label="Preferred Unit / Troop (optional)">
                    <TextInput value={form.preferredUnit} onChange={v => update('preferredUnit', v)} placeholder="e.g. 1st Kilinochchi Troop" />
                  </Field>

                  <Field label="How did you hear about us?">
                    <StyledSelect value={form.heardFrom} onChange={v => update('heardFrom', v)} placeholder="Choose an option...">
                      <option value="school">School</option>
                      <option value="friend">Friend or Family</option>
                      <option value="social">Facebook / Instagram</option>
                      <option value="event">Scouting Event</option>
                      <option value="other">Other</option>
                    </StyledSelect>
                  </Field>

                  <Field label="Any questions or notes? (optional)">
                    <textarea
                      value={form.notes}
                      onChange={e => update('notes', e.target.value)}
                      rows={3}
                      placeholder="Feel free to ask anything..."
                      className="w-full px-4 py-3 rounded-xl bg-white border-2 border-gray-100 focus:outline-none focus:border-[var(--tone-olive)] transition-all text-sm font-medium text-gray-800 shadow-sm resize-y"
                    />
                  </Field>

                  {/* Summary Card */}
                  <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 space-y-3">
                    <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Application Summary</h4>
                    <div className="flex justify-between text-sm"><span className="text-gray-400">Name</span><span className="font-bold text-gray-800">{form.fullName}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-gray-400">Age</span><span className="font-bold text-gray-800">{age} years old</span></div>
                    <div className="flex justify-between text-sm items-center">
                      <span className="text-gray-400">Section</span>
                      {effectiveSection && (
                        <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${effectiveSection.bgClass} ${effectiveSection.textClass}`}>
                          {effectiveSection.emoji} {effectiveSection.name}
                        </span>
                      )}
                    </div>
                    {needsParent && form.guardianName && (
                      <div className="flex justify-between text-sm"><span className="text-gray-400">Guardian</span><span className="font-bold text-gray-800">{form.guardianName}</span></div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* ── Footer ── */}
        {!submitted && (
          <div className="px-8 py-4 bg-white border-t border-gray-100 flex items-center justify-between flex-shrink-0">
            {step > 0 ? (
              <button onClick={back} className="flex items-center gap-1.5 text-sm font-bold text-gray-400 hover:text-[var(--tone-olive)] transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
                Back
              </button>
            ) : <span />}
            {isFinalStep ? (
              <button onClick={submit} disabled={submitting} className={`btn-primary ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            ) : (
              <button onClick={next} className="btn-primary flex items-center gap-2">
                Continue
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

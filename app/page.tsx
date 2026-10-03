'use client'

import { useMemo, useState } from 'react'
import {
  Activity,
  ChevronDown,
  CircleHelp,
  Download,
  FolderOpen,
  Gauge,
  Headphones,
  KeyboardMusic,
  Layers3,
  Menu,
  Mic2,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  Save,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  Square,
  Undo2,
  Volume2,
  WandSparkles,
  Zap,
} from 'lucide-react'

const steps = Array.from({ length: 32 }, (_, index) => index)
const tracks = [
  { name: 'KICK', sub: 'Hard kick • Main', tone: 'bg-fuchsia-400/10 text-fuchsia-300', active: 'border-fuchsia-300/50 bg-fuchsia-400', meter: 'bg-fuchsia-400', pattern: [0, 4, 8, 12, 16, 20, 24, 28] },
  { name: 'CLAP', sub: 'Punch clap • Wide', tone: 'bg-cyan-400/10 text-cyan-300', active: 'border-cyan-300/50 bg-cyan-400', meter: 'bg-cyan-400', pattern: [4, 12, 20, 28] },
  { name: 'HAT', sub: 'Open hat • Air', tone: 'bg-amber-300/10 text-amber-300', active: 'border-amber-200/50 bg-amber-300', meter: 'bg-amber-300', pattern: [2, 6, 10, 14, 18, 22, 26, 30] },
  { name: 'PERC', sub: 'Industrial perc', tone: 'bg-violet-400/10 text-violet-300', active: 'border-violet-300/50 bg-violet-400', meter: 'bg-violet-400', pattern: [3, 7, 11, 15, 19, 23, 27, 31] },
]

export default function Page() {
  const [playing, setPlaying] = useState(false)
  const [activeTab, setActiveTab] = useState<'mix' | 'master'>('mix')
  const [activeSteps, setActiveSteps] = useState<Record<string, number[]>>(
    Object.fromEntries(tracks.map((track) => [track.name, track.pattern])),
  )
  const [muted, setMuted] = useState<string[]>([])
  const [solo, setSolo] = useState<string[]>([])
  const [tempo, setTempo] = useState(155)

  const totalHits = useMemo(() => Object.values(activeSteps).flat().length, [activeSteps])

  function toggleStep(trackName: string, step: number) {
    setActiveSteps((current) => {
      const next = new Set(current[trackName])
      next.has(step) ? next.delete(step) : next.add(step)
      return { ...current, [trackName]: [...next] }
    })
  }

  function toggleList(setter: typeof setMuted, values: string[], value: string) {
    setter(values.includes(value) ? values.filter((item) => item !== value) : [...values, value])
  }

  return (
    <main className="min-h-screen bg-[#090a0f] text-slate-100 selection:bg-fuchsia-400/30">
      <header className="flex h-16 items-center justify-between border-b border-white/[0.08] bg-[#0d0e14] px-4 lg:px-7">
        <div className="flex items-center gap-7">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-fuchsia-500 text-white shadow-[0_0_22px_rgba(217,70,239,0.5)]"><Zap className="size-4 fill-current" /></div>
            <span className="text-lg font-bold tracking-tight">PULSE<span className="text-fuchsia-400">//</span>LAB</span>
          </div>
          <div className="hidden items-center gap-1 text-sm text-slate-400 md:flex">
            <button className="flex items-center gap-1 rounded-md px-3 py-2 hover:bg-white/5 hover:text-white">Archivo <ChevronDown className="size-3.5" /></button>
            <button className="flex items-center gap-1 rounded-md px-3 py-2 hover:bg-white/5 hover:text-white">Editar <ChevronDown className="size-3.5" /></button>
            <button className="flex items-center gap-1 rounded-md px-3 py-2 hover:bg-white/5 hover:text-white">Proyecto <ChevronDown className="size-3.5" /></button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="hidden items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-xs text-slate-300 hover:bg-white/5 sm:flex"><Save className="size-3.5" /> Guardar</button>
          <button className="flex items-center gap-2 rounded-md bg-fuchsia-500 px-3 py-2 text-xs font-semibold text-white shadow-[0_0_18px_rgba(217,70,239,0.22)] hover:bg-fuchsia-400"><Download className="size-3.5" /> Exportar WAV</button>
          <button className="rounded-md p-2 text-slate-400 hover:bg-white/5 hover:text-white"><Menu className="size-5" /></button>
        </div>
      </header>

      <section className="border-b border-white/[0.08] bg-[#101118] px-4 py-3 lg:px-7">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button aria-label="Open project" className="rounded-md border border-white/10 p-2 text-slate-400 hover:text-white"><FolderOpen className="size-4" /></button>
            <div className="ml-2"><p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Proyecto</p><p className="text-sm font-medium text-slate-200">NEON RITUAL <span className="text-slate-500">/ Demo 01</span></p></div>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#171821] p-1.5">
            <button onClick={() => setPlaying(false)} aria-label="Stop" className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"><Square className="size-3.5 fill-current" /></button>
            <button onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause' : 'Play'} className="flex size-9 items-center justify-center rounded-lg bg-fuchsia-500 text-white shadow-[0_0_15px_rgba(217,70,239,0.35)] hover:bg-fuchsia-400">{playing ? <Pause className="size-4 fill-current" /> : <Play className="size-4 fill-current" />}</button>
            <div className="mx-2 h-6 w-px bg-white/10" />
            <label className="flex items-center gap-2 px-2 text-xs text-slate-400"><span className="uppercase tracking-wider">BPM</span><input aria-label="Tempo" type="number" value={tempo} onChange={(event) => setTempo(Number(event.target.value))} className="w-12 bg-transparent text-center font-mono text-sm font-semibold text-white outline-none" /></label>
          </div>
          <div className="flex items-center gap-5 font-mono text-xs text-slate-500"><span>4/4</span><span className="text-slate-300">01:24:08</span><span className="flex items-center gap-1.5 text-emerald-400"><span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" /> Auto-saved</span></div>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1500px] gap-5 p-4 lg:grid-cols-[1fr_310px] lg:p-7">
        <div className="min-w-0">
          <div className="mb-4 flex items-end justify-between"><div><p className="mb-1 text-xs font-medium uppercase tracking-[0.24em] text-fuchsia-400">Pattern editor</p><h1 className="text-2xl font-semibold tracking-tight">Hardstyle foundation</h1></div><div className="flex gap-2"><button className="rounded-md border border-white/10 p-2 text-slate-400 hover:text-white"><Undo2 className="size-4" /></button><button className="rounded-md border border-white/10 p-2 text-slate-400 hover:text-white"><Settings2 className="size-4" /></button></div></div>
          <section className="overflow-hidden rounded-xl border border-white/[0.09] bg-[#11121a] shadow-2xl">
            <div className="flex min-w-[850px] items-center border-b border-white/[0.08] bg-[#171821] px-4 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500"><div className="w-40">Tracks</div><div className="flex flex-1 justify-between pr-1">{[1, 2, 3, 4, 5, 6, 7, 8].map((bar) => <span key={bar} className={bar === 1 ? 'text-fuchsia-400' : ''}>{bar}</span>)}</div></div>
            <div className="min-w-[850px] p-4">
              {tracks.map((track) => <div key={track.name} className="flex h-20 items-center border-b border-white/[0.05] last:border-b-0"><div className="flex w-40 shrink-0 items-center gap-3"><div className={`flex size-8 items-center justify-center rounded-md ${track.tone}`}><Activity className="size-4" /></div><div><p className="text-xs font-semibold tracking-wider text-slate-200">{track.name}</p><p className="text-[10px] text-slate-500">{track.sub}</p></div></div><div className="grid flex-1 grid-cols-32 gap-1">{steps.map((step) => { const isActive = activeSteps[track.name].includes(step); const isBeat = step % 4 === 0; return <button key={step} aria-label={`${track.name} step ${step + 1}`} onClick={() => toggleStep(track.name, step)} className={`h-11 rounded-sm border transition-all ${isActive ? `${track.active} shadow-[0_0_12px_rgba(244,63,94,0.32)]` : `border-white/[0.06] ${isBeat ? 'bg-white/[0.06]' : 'bg-white/[0.025]'} hover:bg-white/10`}`} /> })}</div></div>)}
            </div>
            <div className="flex min-w-[850px] items-center justify-between border-t border-white/[0.08] bg-[#0d0e14] px-4 py-3"><span className="text-xs text-slate-500">{totalHits} pasos activos</span><button className="flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-xs text-slate-300 hover:bg-white/5"><Plus className="size-3.5" /> Añadir pista</button></div>
          </section>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <section className="rounded-xl border border-white/[0.09] bg-[#11121a] p-5"><div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-300">Synthesis</p><h2 className="mt-1 font-semibold">Punch Generator</h2></div><KeyboardMusic className="size-5 text-cyan-300" /></div><div className="grid grid-cols-3 gap-4">{[['Pitch', '48%'], ['Drive', '72%'], ['Click', '36%']].map(([label, value]) => <div key={label}><div className="mb-2 flex justify-between text-[10px] uppercase tracking-wider text-slate-500"><span>{label}</span><span className="font-mono text-cyan-300">{value}</span></div><div className="h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-cyan-400" style={{ width: value }} /></div></div>)}</div><button className="mt-6 flex w-full items-center justify-center gap-2 rounded-md border border-cyan-400/20 bg-cyan-400/10 py-2 text-xs font-medium text-cyan-300 hover:bg-cyan-400/20"><WandSparkles className="size-3.5" /> Generar variación</button></section>
            <section className="rounded-xl border border-white/[0.09] bg-[#11121a] p-5"><div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-medium uppercase tracking-[0.18em] text-amber-300">Master bus</p><h2 className="mt-1 font-semibold">Control room</h2></div><Gauge className="size-5 text-amber-300" /></div><div className="flex items-end justify-around gap-4"><div className="flex h-20 w-2 flex-col justify-end rounded-full bg-white/10"><div className="h-[72%] rounded-full bg-gradient-to-t from-amber-400 to-rose-400" /></div><div className="flex-1"><p className="text-[10px] uppercase tracking-wider text-slate-500">Loudness</p><p className="mt-1 font-mono text-xl">-8.2 <span className="text-xs text-slate-500">LUFS</span></p><div className="mt-3 h-1 rounded-full bg-white/10"><div className="h-full w-[78%] rounded-full bg-amber-400" /></div></div><div className="text-right"><p className="text-[10px] uppercase tracking-wider text-slate-500">Ceiling</p><p className="mt-1 font-mono text-xl">-0.3 <span className="text-xs text-slate-500">dB</span></p></div></div><button className="mt-6 flex w-full items-center justify-center gap-2 rounded-md border border-amber-400/20 bg-amber-400/10 py-2 text-xs font-medium text-amber-300 hover:bg-amber-400/20"><Sparkles className="size-3.5" /> Master assistant</button></section>
          </div>
        </div>

        <aside className="rounded-xl border border-white/[0.09] bg-[#11121a] p-5"><div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-medium uppercase tracking-[0.18em] text-fuchsia-400">Studio rack</p><h2 className="mt-1 text-lg font-semibold">{activeTab === 'mix' ? 'Mixer' : 'Mastering'}</h2></div><SlidersHorizontal className="size-5 text-slate-400" /></div><div className="mb-5 flex rounded-lg bg-[#0b0c11] p-1"><button onClick={() => setActiveTab('mix')} className={`flex-1 rounded-md py-2 text-xs font-medium ${activeTab === 'mix' ? 'bg-white/10 text-white' : 'text-slate-500'}`}>Mezcla</button><button onClick={() => setActiveTab('master')} className={`flex-1 rounded-md py-2 text-xs font-medium ${activeTab === 'master' ? 'bg-white/10 text-white' : 'text-slate-500'}`}>Master</button></div>{activeTab === 'mix' ? <div className="flex flex-col gap-3">{tracks.map((track) => <div key={track.name} className="rounded-lg border border-white/[0.07] bg-[#171821] p-3"><div className="mb-3 flex items-center justify-between"><span className="text-xs font-semibold tracking-widest text-slate-200">{track.name}</span><div className="flex gap-1"><button onClick={() => toggleList(setMuted, muted, track.name)} className={`rounded px-1.5 py-1 text-[9px] font-bold ${muted.includes(track.name) ? 'bg-rose-500 text-white' : 'text-slate-500 hover:bg-white/10'}`}>M</button><button onClick={() => toggleList(setSolo, solo, track.name)} className={`rounded px-1.5 py-1 text-[9px] font-bold ${solo.includes(track.name) ? 'bg-amber-400 text-black' : 'text-slate-500 hover:bg-white/10'}`}>S</button></div></div><div className="flex items-center gap-3"><Volume2 className="size-3.5 text-slate-500" /><div className="h-1.5 flex-1 rounded-full bg-white/10"><div className={`h-full rounded-full ${track.meter}`} style={{ width: `${track.name === 'KICK' ? 86 : track.name === 'CLAP' ? 70 : 58}%` }} /></div><span className="w-8 text-right font-mono text-[10px] text-slate-500">{track.name === 'KICK' ? '-1.2' : '-4.0'}</span></div></div>)}</div> : <div className="flex flex-col gap-4">{[['EQ curve', 'Wide presence'], ['Glue compressor', '2:1 • Soft knee'], ['Limiter', 'True peak -0.3 dB']].map(([name, value]) => <div key={name} className="rounded-lg border border-white/[0.07] bg-[#171821] p-4"><div className="flex items-center gap-3"><div className="flex size-8 items-center justify-center rounded-md bg-amber-400/10 text-amber-300"><Gauge className="size-4" /></div><div><p className="text-xs font-semibold text-slate-200">{name}</p><p className="text-[10px] text-slate-500">{value}</p></div><span className="ml-auto size-2 rounded-full bg-emerald-400" /></div><div className="mt-4 h-1 rounded-full bg-white/10"><div className="h-full w-3/4 rounded-full bg-amber-300" /></div></div>)}<button className="flex items-center justify-center gap-2 rounded-md border border-white/10 py-2.5 text-xs text-slate-300 hover:bg-white/5"><Plus className="size-3.5" /> Añadir efecto</button></div>}<div className="mt-6 border-t border-white/[0.08] pt-5"><div className="mb-3 flex items-center justify-between"><span className="text-xs font-medium text-slate-300">Master output</span><span className="font-mono text-[10px] text-emerald-400">-0.3 dB</span></div><div className="flex h-16 items-end gap-1 rounded-md bg-[#0b0c11] px-3 py-2">{Array.from({ length: 38 }, (_, index) => <span key={index} className={`flex-1 rounded-t-sm ${index > 33 ? 'bg-rose-400' : 'bg-fuchsia-400/80'}`} style={{ height: `${25 + ((index * 17) % 60)}%` }} />)}</div></div><button className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-fuchsia-500 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(217,70,239,0.18)] hover:bg-fuchsia-400"><Download className="size-4" /> Exportar mezcla WAV</button><p className="mt-3 text-center text-[10px] text-slate-500">WAV · 24-bit · 48 kHz · -14 LUFS</p></aside>
      </div>
      <footer className="mx-auto flex max-w-[1500px] items-center justify-between border-t border-white/[0.08] px-4 py-5 text-[10px] text-slate-600 lg:px-7"><span className="flex items-center gap-2"><Headphones className="size-3.5" /> Atajos: Espacio para reproducir · M para silenciar</span><span className="flex items-center gap-2"><CircleHelp className="size-3.5" /> Ayuda del estudio</span></footer>
    </main>
  )
}

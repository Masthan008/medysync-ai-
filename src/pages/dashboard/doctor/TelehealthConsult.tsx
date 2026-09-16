import { useState } from 'react'
import { Video, Mic, MicOff, VideoOff, PhoneOff, Send } from 'lucide-react'

export default function TelehealthConsult() {
  const [videoOn, setVideoOn] = useState(true)
  const [micOn, setMicOn] = useState(true)
  const [messages, setMessages] = useState<Array<{ sender: string, text: string }>>([
    { sender: 'Dr. Priya Mehta', text: 'Hello Aarav, welcome to your telehealth consultation session.' },
    { sender: 'Aarav Sharma', text: 'Hello Doctor, thank you. My blood pressure reading was 120/80 today.' }
  ])
  const [inputMsg, setInputMsg] = useState('')

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMsg.trim()) return
    setMessages([...messages, { sender: 'Dr. Priya Mehta', text: inputMsg }])
    setInputMsg('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Telemedicine Consultation</h1>
        <p className="text-sm text-gray-500">Live HD virtual consultation session with patient</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Video View */}
        <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-4 flex flex-col justify-between min-h-[420px] relative overflow-hidden shadow-xl">
          <div className="flex items-center justify-between text-white z-10">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
              ● LIVE SESSION
            </span>
            <span className="text-xs text-slate-300">Session ID: TH-2026-9912</span>
          </div>

          {/* Video Placeholder */}
          <div className="flex flex-col items-center justify-center text-slate-400 space-y-3 my-auto">
            <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 text-2xl font-bold">
              AS
            </div>
            <p className="font-bold text-white text-lg">Aarav Sharma (Patient)</p>
            <p className="text-xs text-slate-400">Cardiology Follow-up Virtual Session</p>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-center gap-4 bg-slate-800/80 backdrop-blur p-3 rounded-2xl z-10 w-fit mx-auto">
            <button onClick={() => setMicOn(!micOn)} className={`p-3 rounded-xl text-white transition-all ${micOn ? 'bg-slate-700 hover:bg-slate-600' : 'bg-red-600'}`}>
              {micOn ? <Mic size={20} /> : <MicOff size={20} />}
            </button>
            <button onClick={() => setVideoOn(!videoOn)} className={`p-3 rounded-xl text-white transition-all ${videoOn ? 'bg-slate-700 hover:bg-slate-600' : 'bg-red-600'}`}>
              {videoOn ? <Video size={20} /> : <VideoOff size={20} />}
            </button>
            <button className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2">
              <PhoneOff size={18} /> End Call
            </button>
          </div>
        </div>

        {/* Live Session Chat */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between h-[420px]">
          <div>
            <h3 className="font-bold text-gray-900 text-base mb-3 pb-2 border-b border-gray-100">Consultation Chat</h3>
            <div className="space-y-3 overflow-y-auto max-h-[290px] pr-2">
              {messages.map((m, idx) => (
                <div key={idx} className={`p-3 rounded-2xl text-xs ${m.sender.includes('Doctor') || m.sender.includes('Priya') ? 'bg-blue-50 text-blue-900 ml-4' : 'bg-gray-100 text-gray-800 mr-4'}`}>
                  <p className="font-bold mb-1 text-[10px] opacity-70">{m.sender}</p>
                  <p>{m.text}</p>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSend} className="flex gap-2 pt-2 border-t border-gray-100">
            <input
              type="text"
              placeholder="Type message..."
              value={inputMsg}
              onChange={e => setInputMsg(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
            />
            <button type="submit" className="p-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all">
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

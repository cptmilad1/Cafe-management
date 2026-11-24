import { useEffect, useRef } from "react"
import gsap from 'gsap'

function CafeIcon() {
  const modalRef = useRef()
  const iconRef = useRef()
  const textRef = useRef()
  useEffect(()=>{
    const contex = gsap.context(()=>{
      const tl = gsap.timeline({defaults : {
        ease : 'power1.in',
        duration: 1
      }})
      tl.fromTo(iconRef.current, {
        opacity : 0,
        scale : 0
      },{
        opacity : 1,
        scale: 1,
        ease : 'elastic(1, 0.3)'
      })
      tl.fromTo(textRef.current, {
        yPercent : -200
      },{
        yPercent : 0,
        duration : 0.3
      },'-=0.8')
      tl.fromTo(modalRef.current, {
        xPercent : 100
      },{
        xPercent : 0,
        duration : 0.4
      }, '-=0.5')
    })
    return ()=> contex.revert()
  }, [])
  return (
    <div  className="flex items-center justify-between gap-2 w-full overflow-hidden">
      <div className="flex items-center gap-3 overflow-hidden">
        <svg
          ref={iconRef}
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-orange-800 shrink-0 border rounded-full bg-amber-950 border-black"
          aria-label="coffee cup"
        >
          {/* steam rising from the cup */}
          <path d="M9 6c0 1-.5 2-1 3M15 6c0 1-.5 2-1 3" />
          {/* coffee cup body */}
          <path d="M6 12h12c0 4 0 6-2 6H8c-2 0-2-2-2-6z" />
          {/* coffee surface */}
          <path d="M6 12h12" />
          {/* cup handle */}
          <path d="M18 15c1 0 2 1 2 3s-1 3-2 3" />
          {/* latte art heart */}
          <path d="M13 15c.5 0 1 .5 1 1s-.5 1-1 1-1-.5-1-1 .5-1 1-1" />
        </svg>
        <div ref={textRef} className="text-sm font-semibold text-slate-200">Cafe Manager</div>
      </div>
      <div ref={modalRef}>Menu</div>
    </div>
  )
}

export default CafeIcon
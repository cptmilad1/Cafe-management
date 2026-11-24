import { SiCoffeescript } from "react-icons/si";
import { CiMenuFries } from "react-icons/ci";
import { useState } from "react";

function CafeIcon() {
  const [modal, setModal] = useState(false)
  return (
    <div className="flex gap-5 p-2 items-center justify-between w-full">
        <div className="flex gap-4 items-center">
          <div className="rounded-full p-2 bg-amber-950 hover:bg-amber-900 shadow-[inset_2px_2px_4px_rgba(225,225,225,0.6),2px_2px_10px_rgba(0,0,0,0.5)]">
            <SiCoffeescript size={25}/>
          </div>
          <div>Cafe Manager</div>
        </div>
        <div className="pr-4 rounded-full bg-amber-950 p-2 object-cover flex justify-center items-center aspect-video hover:bg-amber-900 shadow-[inset_2px_2px_4px_rgba(225,225,225,0.6),2px_2px_10px_rgba(0,0,0,0.5)]">
          <CiMenuFries size={25}/>
        </div>
    </div>
  )
}

export default CafeIcon
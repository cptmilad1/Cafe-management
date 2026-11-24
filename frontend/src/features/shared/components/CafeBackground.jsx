function CafeBackground({ children }) {
  return (
    <div
      className="fixed inset-0 z-[-1] overflow-hidden bg-olive-950"
    >
    <div
      className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-100"
    />
      {children}
    </div>
  )
}

export default CafeBackground
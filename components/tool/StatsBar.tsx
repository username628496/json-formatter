interface StatsBarProps {
  keys: number
  depth: number
  bytes: number
  lines: number
  chars: number
  isValid: boolean
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium tabular-nums">{value.toLocaleString()}</span>
    </div>
  )
}

export function StatsBar({ keys, depth, bytes, lines, chars, isValid }: StatsBarProps) {
  return (
    <div className="flex items-center gap-4 px-4 py-2.5 rounded-lg border bg-card text-xs flex-wrap">
      <Stat label="Keys" value={keys} />
      <Stat label="Depth" value={depth} />
      <Stat label="Lines" value={lines} />
      <Stat label="Chars" value={chars} />
      <Stat label="Bytes" value={bytes} />
      <span className={`ml-auto font-medium ${isValid ? 'text-green-600' : 'text-red-500'}`}>
        {isValid ? '✓ Valid' : '✗ Error'}
      </span>
    </div>
  )
}

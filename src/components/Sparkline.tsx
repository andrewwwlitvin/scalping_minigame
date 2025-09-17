import React from 'react';

export default function Sparkline({
  data, width = 320, height = 120, stroke = '#28a0ff'
}: {
  data: { t: number; p: number }[];
  width?: number;
  height?: number;
  stroke?: string;
}) {
  if (!data?.length) {
    return <div style={{
      width, height,
      display:'flex', alignItems:'center', justifyContent:'center',
      color:'#9db0d1', fontSize:12, border:'1px solid #1d2a4d', borderRadius:12
    }}>No data</div>;
  }

  const prices = data.map(d => d.p);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const pad = 6;

  const xs = data.map((_, i) => pad + (i * (width - 2*pad)) / Math.max(1, data.length - 1));
  const ys = prices.map(p => {
    if (max === min) return height / 2;
    // invert (SVG y grows down)
    return pad + (height - 2*pad) * (1 - (p - min) / (max - min));
  });

  const path = xs.map((x, i) => (i ? `L${x},${ys[i]}` : `M${x},${ys[i]}`)).join(' ');

  const last = prices[prices.length - 1];
  const first = prices[0];
  const change = ((last - first) / first) * 100;

  return (
    <div style={{
      background:'linear-gradient(180deg, rgba(17,26,51,0.9), rgba(17,26,51,0.8))',
      border:'1px solid #1d2a4d', borderRadius:14, padding:12
    }}>
      <div style={{display:'flex', justifyContent:'space-between', marginBottom:8}}>
        <div style={{fontWeight:700}}>{last.toFixed(4)}</div>
        <div style={{color: change>=0 ? '#2bd67b' : '#ff6b6b', fontSize:12}}>
          {change>=0 ? '+' : ''}{change.toFixed(2)}%
        </div>
      </div>
      <svg width={width} height={height} role="img" aria-label="Price sparkline">
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.8" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path d={path} fill="none" stroke={stroke} strokeWidth={2} />
        {/* optional fill under line */}
        <path d={`${path} L${xs[xs.length-1]},${height-pad} L${xs[0]},${height-pad} Z`} fill="url(#grad)" opacity="0.15" />
      </svg>
    </div>
  );
}

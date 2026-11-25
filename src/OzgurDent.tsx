import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const NAVY = '#0c2340';
const TEAL = '#1fb5ad';
const MINT = '#e8f7f6';
const WHITE = '#ffffff';
const FONT = '"DejaVu Sans", "Liberation Sans", Arial, sans-serif';

const Tooth: React.FC<{size: number; color: string}> = ({size, color}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path
      d="M50 18c-8-8-30-10-33 10-2 14 5 22 8 34 3 13 4 26 11 26 6 0 6-18 14-18s8 18 14 18c7 0 8-13 11-26 3-12 10-20 8-34-3-20-25-18-33-10z"
      fill={color}
    />
  </svg>
);

const fadeOut = (frame: number, end: number) =>
  interpolate(frame, [end - 10, end], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

// Sahne 1: Logo ve isim (0–3 sn)
const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame, fps, config: {damping: 12}});
  const titleY = interpolate(frame, [8, 28], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const titleOpacity = interpolate(frame, [8, 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subOpacity = interpolate(frame, [30, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: NAVY,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: fadeOut(frame, 90),
      }}
    >
      <div
        style={{
          width: 220,
          height: 220,
          borderRadius: 110,
          backgroundColor: TEAL,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `scale(${pop})`,
        }}
      >
        <Tooth size={130} color={WHITE} />
      </div>
      <div
        style={{
          marginTop: 50,
          fontFamily: FONT,
          fontSize: 110,
          fontWeight: 700,
          color: WHITE,
          letterSpacing: 2,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        Özgür Dental Clinic
      </div>
      <div
        style={{
          marginTop: 16,
          fontFamily: FONT,
          fontSize: 44,
          color: TEAL,
          opacity: subOpacity,
        }}
      >
        Ağız ve Diş Sağlığı Polikliniği · Beşiktaş
      </div>
    </AbsoluteFill>
  );
};

const TREATMENTS = [
  'İmplant',
  'Dolgu',
  'Diş beyazlatma',
  'Ortodonti',
  'Yirmilik diş çekimi',
];

// Sahne 2: Tedaviler (3–7 sn)
const Treatments: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const headOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: MINT,
        padding: '0 200px',
        justifyContent: 'center',
        opacity: fadeOut(frame, 120),
      }}
    >
      <div
        style={{
          fontFamily: FONT,
          fontSize: 72,
          fontWeight: 700,
          color: NAVY,
          marginBottom: 50,
          opacity: headOpacity,
        }}
      >
        Tedavilerimiz
      </div>
      {TREATMENTS.map((t, i) => {
        const s = spring({frame: frame - 10 - i * 8, fps, config: {damping: 14}});
        return (
          <div
            key={t}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 26,
              opacity: s,
              transform: `translateX(${(1 - s) * -80}px)`,
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                backgroundColor: TEAL,
                marginRight: 30,
              }}
            />
            <div style={{fontFamily: FONT, fontSize: 60, color: NAVY}}>{t}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// Sahne 3: Konum ve kapanış (7–10 sn)
const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame, fps, config: {damping: 15}});
  const lineW = interpolate(frame, [10, 35], [0, 600], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const ctaOpacity = interpolate(frame, [30, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: NAVY,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: FONT,
          fontSize: 84,
          fontWeight: 700,
          color: WHITE,
          opacity: s,
          transform: `scale(${0.9 + 0.1 * s})`,
        }}
      >
        Gayrettepe, Beşiktaş / İstanbul
      </div>
      <div
        style={{
          width: lineW,
          height: 6,
          backgroundColor: TEAL,
          borderRadius: 3,
          margin: '40px 0',
        }}
      />
      <div style={{fontFamily: FONT, fontSize: 50, color: MINT, opacity: ctaOpacity}}>
        Randevu için kliniğimize ulaşın
      </div>
      <div
        style={{
          marginTop: 24,
          fontFamily: FONT,
          fontSize: 46,
          color: TEAL,
          opacity: ctaOpacity,
        }}
      >
        ozgurdentalclinic.com
      </div>
    </AbsoluteFill>
  );
};

export const OzgurDent: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: NAVY}}>
      <Sequence durationInFrames={90}>
        <Intro />
      </Sequence>
      <Sequence from={90} durationInFrames={120}>
        <Treatments />
      </Sequence>
      <Sequence from={210} durationInFrames={90}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};

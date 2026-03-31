/**
 * 賣油翁 古風互動簡報
 * Design: 宋代水墨卷軸風格
 * - 宣紙米白底色 (#F5EDD6)
 * - 水墨深灰文字 (#2C2416)
 * - 硃砂紅點綴 (#C0392B)
 * - 金箔裝飾 (#B8860B / #DAA520)
 * - Noto Serif TC 思源宋體
 * Layout: 全螢幕投影片，橫向導航，水墨動畫過渡
 */

import { useEffect, useRef, useState, useCallback } from "react";

// CDN URLs for all generated images
const IMAGES = {
  cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663446833182/4XFYCyDSmEdMC9KPniGPXY/img_cover_a0b6f284.png",
  archer: "https://d2xsxph8kpxj0f.cloudfront.net/310519663446833182/4XFYCyDSmEdMC9KPniGPXY/img_archer_2c33b43a.png",
  oldman: "https://d2xsxph8kpxj0f.cloudfront.net/310519663446833182/4XFYCyDSmEdMC9KPniGPXY/img_oldman_watch_55dd6c36.png",
  oilDemo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663446833182/4XFYCyDSmEdMC9KPniGPXY/img_oil_demo_0bc774cb.png",
  lesson: "https://d2xsxph8kpxj0f.cloudfront.net/310519663446833182/4XFYCyDSmEdMC9KPniGPXY/img_lesson_eaf6b9af.png",
  ouyang: "https://d2xsxph8kpxj0f.cloudfront.net/310519663446833182/4XFYCyDSmEdMC9KPniGPXY/img_ouyang_dea5769d.png",
  moral: "https://d2xsxph8kpxj0f.cloudfront.net/310519663446833182/4XFYCyDSmEdMC9KPniGPXY/img_moral_e7c7fcdb.png",
};

// Ink particle component
function InkParticles({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    if (!active) return;
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      size: Math.random() * 6 + 3,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 1,
    }));
    setParticles(newParticles);
    const timer = setTimeout(() => setParticles([]), 5000);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: "-10px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: `rgba(44, 36, 22, ${0.3 + Math.random() * 0.4})`,
            animation: `particleFall ${p.duration}s ${p.delay}s linear forwards`,
          }}
        />
      ))}
    </div>
  );
}

// Decorative corner ornaments
function CornerOrnaments() {
  return (
    <>
      {/* Top-left */}
      <svg className="absolute top-3 left-3 w-16 h-16 opacity-40" viewBox="0 0 60 60" fill="none">
        <path d="M5 5 L5 25 M5 5 L25 5" stroke="#B8860B" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5 5 L20 20" stroke="#B8860B" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
        <circle cx="5" cy="5" r="2" fill="#B8860B"/>
        <path d="M12 5 Q20 5 20 13" stroke="#B8860B" strokeWidth="0.8" fill="none" opacity="0.6"/>
      </svg>
      {/* Top-right */}
      <svg className="absolute top-3 right-3 w-16 h-16 opacity-40" viewBox="0 0 60 60" fill="none" style={{transform:'scaleX(-1)'}}>
        <path d="M5 5 L5 25 M5 5 L25 5" stroke="#B8860B" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5 5 L20 20" stroke="#B8860B" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
        <circle cx="5" cy="5" r="2" fill="#B8860B"/>
        <path d="M12 5 Q20 5 20 13" stroke="#B8860B" strokeWidth="0.8" fill="none" opacity="0.6"/>
      </svg>
      {/* Bottom-left */}
      <svg className="absolute bottom-3 left-3 w-16 h-16 opacity-40" viewBox="0 0 60 60" fill="none" style={{transform:'scaleY(-1)'}}>
        <path d="M5 5 L5 25 M5 5 L25 5" stroke="#B8860B" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5 5 L20 20" stroke="#B8860B" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
        <circle cx="5" cy="5" r="2" fill="#B8860B"/>
        <path d="M12 5 Q20 5 20 13" stroke="#B8860B" strokeWidth="0.8" fill="none" opacity="0.6"/>
      </svg>
      {/* Bottom-right */}
      <svg className="absolute bottom-3 right-3 w-16 h-16 opacity-40" viewBox="0 0 60 60" fill="none" style={{transform:'scale(-1,-1)'}}>
        <path d="M5 5 L5 25 M5 5 L25 5" stroke="#B8860B" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5 5 L20 20" stroke="#B8860B" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
        <circle cx="5" cy="5" r="2" fill="#B8860B"/>
        <path d="M12 5 Q20 5 20 13" stroke="#B8860B" strokeWidth="0.8" fill="none" opacity="0.6"/>
      </svg>
    </>
  );
}

// Animated text reveal
function RevealText({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <span className={className} style={{ opacity: visible ? 1 : 0, transition: `opacity 0.8s ease ${delay}ms` }}>
      {text}
    </span>
  );
}

// Slide 1: Cover
function Slide1({ active }: { active: boolean }) {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#1a1208' }}>
      {/* Full background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${IMAGES.cover})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: active ? 0.85 : 0,
          transition: 'opacity 1.5s ease',
        }}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(26,18,8,0.75) 0%, rgba(26,18,8,0.3) 50%, rgba(26,18,8,0.6) 100%)' }} />

      {/* Decorative vertical lines */}
      <div className="absolute left-16 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, transparent, rgba(184,134,11,0.4), transparent)' }} />
      <div className="absolute right-16 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, transparent, rgba(184,134,11,0.4), transparent)' }} />

      {/* Main content - centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Top seal */}
        <div
          className="mb-8"
          style={{
            opacity: active ? 1 : 0,
            transform: active ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'all 0.8s ease 0.3s',
          }}
        >
          <div className="seal" style={{ color: '#C0392B', borderColor: '#C0392B', fontSize: '0.7rem', letterSpacing: '0.3em', padding: '3px 10px' }}>
            北宋 · 歐陽修
          </div>
        </div>

        {/* Main title - vertical style */}
        <div
          className="flex gap-6 items-center mb-8"
          style={{
            opacity: active ? 1 : 0,
            transform: active ? 'scale(1)' : 'scale(0.85)',
            transition: 'all 1s ease 0.6s',
          }}
        >
          {/* Decorative left element */}
          <div className="flex flex-col gap-1 opacity-60">
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{ width: '2px', height: `${12 + i * 4}px`, background: '#B8860B', borderRadius: '1px' }} />
            ))}
          </div>

          <h1
            className="brush-text text-center"
            style={{
              fontSize: 'clamp(4rem, 10vw, 8rem)',
              color: '#F5EDD6',
              textShadow: '0 0 40px rgba(184,134,11,0.5), 2px 2px 0 rgba(0,0,0,0.5)',
              letterSpacing: '0.2em',
              lineHeight: 1,
              fontWeight: 900,
            }}
          >
            賣油翁
          </h1>

          <div className="flex flex-col gap-1 opacity-60">
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{ width: '2px', height: `${24 - i * 4}px`, background: '#B8860B', borderRadius: '1px' }} />
            ))}
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: active ? 1 : 0,
            transform: active ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease 1.2s',
          }}
        >
          <div className="divider-classical" style={{ width: '280px', color: '#B8860B' }}>
            <span style={{ fontSize: '0.85rem', color: '#DAA520', letterSpacing: '0.3em' }}>熟能生巧</span>
          </div>
        </div>

        {/* Author info */}
        <div
          className="mt-6 text-center"
          style={{
            opacity: active ? 1 : 0,
            transition: 'opacity 0.8s ease 1.6s',
          }}
        >
          <p style={{ color: 'rgba(245,237,214,0.7)', fontSize: '0.9rem', letterSpacing: '0.3em' }}>
            歐陽修 著
          </p>
          <p style={{ color: 'rgba(245,237,214,0.5)', fontSize: '0.75rem', letterSpacing: '0.2em', marginTop: '4px' }}>
            選自《歸田錄》
          </p>
        </div>
      </div>

      {/* Bottom hint */}
      <div
        className="absolute bottom-8 left-0 right-0 flex justify-center"
        style={{
          opacity: active ? 1 : 0,
          transition: 'opacity 0.8s ease 2s',
        }}
      >
        <div className="flex items-center gap-3" style={{ color: 'rgba(184,134,11,0.7)', fontSize: '0.75rem', letterSpacing: '0.2em' }}>
          <span>按</span>
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
            <path d="M1 6 H18 M13 1 L19 6 L13 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>翻頁</span>
        </div>
      </div>

      <CornerOrnaments />
    </div>
  );
}

// Slide 2: Author Introduction
function Slide2({ active }: { active: boolean }) {
  return (
    <div className="relative w-full h-full overflow-hidden ink-wash-bg">
      {/* Left: large image */}
      <div
        className="absolute left-0 top-0 bottom-0"
        style={{
          width: '45%',
          opacity: active ? 1 : 0,
          transform: active ? 'translateX(0)' : 'translateX(-40px)',
          transition: 'all 1s ease 0.3s',
        }}
      >
        <img
          src={IMAGES.ouyang}
          alt="歐陽修"
          className="w-full h-full object-cover"
          style={{ filter: 'sepia(20%) contrast(1.05)' }}
        />
        {/* Gradient overlay on right edge */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, #F5EDD6 100%)' }} />
      </div>

      {/* Right: content */}
      <div
        className="absolute right-0 top-0 bottom-0 flex flex-col justify-center"
        style={{ width: '58%', padding: '3rem 4rem 3rem 2rem' }}
      >
        {/* Section label */}
        <div
          style={{
            opacity: active ? 1 : 0,
            transform: active ? 'translateY(0)' : 'translateY(-15px)',
            transition: 'all 0.7s ease 0.5s',
          }}
        >
          <div className="seal mb-4" style={{ fontSize: '0.65rem' }}>作者簡介</div>
        </div>

        {/* Name */}
        <h2
          className="brush-text mb-2"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            color: '#2C2416',
            letterSpacing: '0.15em',
            opacity: active ? 1 : 0,
            transform: active ? 'translateX(0)' : 'translateX(30px)',
            transition: 'all 0.8s ease 0.7s',
          }}
        >
          歐陽修
        </h2>

        {/* Subtitle */}
        <p
          style={{
            color: '#B8860B',
            fontSize: '0.9rem',
            letterSpacing: '0.2em',
            marginBottom: '1.5rem',
            opacity: active ? 1 : 0,
            transition: 'opacity 0.7s ease 0.9s',
          }}
        >
          公元 1007–1072 ｜ 字永叔 ｜ 號醉翁
        </p>

        {/* Divider */}
        <div
          className="divider-classical mb-6"
          style={{
            opacity: active ? 1 : 0,
            transition: 'opacity 0.7s ease 1s',
          }}
        />

        {/* Key facts as cards */}
        <div className="flex flex-col gap-3">
          {[
            { icon: '📜', label: '身份', value: '北宋著名文學家、史學家' },
            { icon: '✦', label: '地位', value: '唐宋八大家之一' },
            { icon: '⚔️', label: '仕途', value: '官至翰林學士、參知政事' },
            { icon: '📖', label: '代表作', value: '《醉翁亭記》《秋聲賦》' },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4"
              style={{
                opacity: active ? 1 : 0,
                transform: active ? 'translateX(0)' : 'translateX(30px)',
                transition: `all 0.6s ease ${1.1 + i * 0.15}s`,
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  background: 'rgba(184,134,11,0.12)',
                  border: '1px solid rgba(184,134,11,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <div>
                <span style={{ color: '#B8860B', fontSize: '0.7rem', letterSpacing: '0.15em', display: 'block' }}>{item.label}</span>
                <span style={{ color: '#2C2416', fontSize: '0.9rem', fontWeight: 500 }}>{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CornerOrnaments />
    </div>
  );
}

// Slide 3: Story Scene 1 - Chen Yaozi archery
function Slide3({ active }: { active: boolean }) {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#1a1208' }}>
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${IMAGES.archer})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          opacity: active ? 0.9 : 0,
          transition: 'opacity 1.5s ease',
        }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(26,18,8,0.85) 0%, rgba(26,18,8,0.2) 50%, rgba(26,18,8,0.7) 100%)' }} />

      {/* Left content panel */}
      <div
        className="absolute left-0 top-0 bottom-0 flex flex-col justify-center"
        style={{ width: '42%', padding: '3rem 2rem 3rem 4rem' }}
      >
        {/* Scene number */}
        <div
          style={{
            opacity: active ? 1 : 0,
            transition: 'opacity 0.6s ease 0.3s',
            marginBottom: '1rem',
          }}
        >
          <span style={{ color: 'rgba(184,134,11,0.7)', fontSize: '0.7rem', letterSpacing: '0.4em' }}>第一幕</span>
        </div>

        {/* Scene title */}
        <h2
          className="brush-text mb-4"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            color: '#F5EDD6',
            letterSpacing: '0.1em',
            lineHeight: 1.2,
            textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
            opacity: active ? 1 : 0,
            transform: active ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease 0.5s',
          }}
        >
          善射自矜
        </h2>

        {/* Original text */}
        <div
          className="mb-6"
          style={{
            background: 'rgba(26,18,8,0.6)',
            border: '1px solid rgba(184,134,11,0.3)',
            padding: '1rem 1.2rem',
            opacity: active ? 1 : 0,
            transition: 'opacity 0.8s ease 0.8s',
          }}
        >
          <p style={{ color: 'rgba(245,237,214,0.9)', fontSize: '0.95rem', lineHeight: 2, letterSpacing: '0.08em' }}>
            陳康肅公堯咨<span style={{ color: '#DAA520' }}>善射</span>，當世無雙，
          </p>
          <p style={{ color: 'rgba(245,237,214,0.9)', fontSize: '0.95rem', lineHeight: 2, letterSpacing: '0.08em' }}>
            公亦以此<span style={{ color: '#DAA520' }}>自矜</span>。
          </p>
        </div>

        {/* Key points */}
        <div
          className="flex flex-col gap-3"
          style={{
            opacity: active ? 1 : 0,
            transform: active ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease 1.1s',
          }}
        >
          <div className="flex items-center gap-3">
            <div style={{ width: '6px', height: '6px', background: '#C0392B', borderRadius: '50%', flexShrink: 0 }} />
            <span style={{ color: 'rgba(245,237,214,0.8)', fontSize: '0.85rem' }}>箭術當世無雙</span>
          </div>
          <div className="flex items-center gap-3">
            <div style={{ width: '6px', height: '6px', background: '#C0392B', borderRadius: '50%', flexShrink: 0 }} />
            <span style={{ color: 'rgba(245,237,214,0.8)', fontSize: '0.85rem' }}>發矢十中八九</span>
          </div>
          <div className="flex items-center gap-3">
            <div style={{ width: '6px', height: '6px', background: '#C0392B', borderRadius: '50%', flexShrink: 0 }} />
            <span style={{ color: 'rgba(245,237,214,0.8)', fontSize: '0.85rem' }}>以此自豪自誇</span>
          </div>
        </div>
      </div>

      <CornerOrnaments />
    </div>
  );
}

// Slide 4: Story Scene 2 - Old man watching
function Slide4({ active }: { active: boolean }) {
  return (
    <div className="relative w-full h-full overflow-hidden ink-wash-bg">
      {/* Right: large image */}
      <div
        className="absolute right-0 top-0 bottom-0"
        style={{
          width: '55%',
          opacity: active ? 1 : 0,
          transform: active ? 'translateX(0)' : 'translateX(40px)',
          transition: 'all 1s ease 0.3s',
        }}
      >
        <img
          src={IMAGES.oldman}
          alt="賣油翁觀看"
          className="w-full h-full object-cover"
          style={{ filter: 'sepia(15%) contrast(1.05)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to left, transparent 60%, #F5EDD6 100%)' }} />
      </div>

      {/* Left content */}
      <div
        className="absolute left-0 top-0 bottom-0 flex flex-col justify-center"
        style={{ width: '50%', padding: '3rem 2rem 3rem 4rem' }}
      >
        <div style={{ opacity: active ? 1 : 0, transition: 'opacity 0.6s ease 0.3s', marginBottom: '1rem' }}>
          <span style={{ color: '#B8860B', fontSize: '0.7rem', letterSpacing: '0.4em' }}>第二幕</span>
        </div>

        <h2
          className="brush-text mb-4"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            color: '#2C2416',
            letterSpacing: '0.1em',
            lineHeight: 1.2,
            opacity: active ? 1 : 0,
            transform: active ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease 0.5s',
          }}
        >
          微頷不驚
        </h2>

        {/* Quote box */}
        <div
          style={{
            background: 'rgba(184,134,11,0.08)',
            border: '1px solid rgba(184,134,11,0.3)',
            borderLeft: '3px solid #B8860B',
            padding: '1rem 1.2rem',
            marginBottom: '1.5rem',
            opacity: active ? 1 : 0,
            transition: 'opacity 0.8s ease 0.8s',
          }}
        >
          <p style={{ color: '#2C2416', fontSize: '0.95rem', lineHeight: 2, letterSpacing: '0.08em' }}>
            有賣油翁<span style={{ color: '#C0392B', fontWeight: 600 }}>釋擔而立</span>，
          </p>
          <p style={{ color: '#2C2416', fontSize: '0.95rem', lineHeight: 2, letterSpacing: '0.08em' }}>
            <span style={{ color: '#C0392B', fontWeight: 600 }}>睨之</span>，久而不去。
          </p>
          <p style={{ color: '#2C2416', fontSize: '0.95rem', lineHeight: 2, letterSpacing: '0.08em' }}>
            見其發矢十中八九，但<span style={{ color: '#C0392B', fontWeight: 600 }}>微頷之</span>。
          </p>
        </div>

        {/* Character description */}
        <div
          style={{
            opacity: active ? 1 : 0,
            transform: active ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease 1.1s',
          }}
        >
          <p style={{ color: '#5C4A2A', fontSize: '0.85rem', lineHeight: 1.8, letterSpacing: '0.05em' }}>
            賣油翁放下擔子，斜眼觀看，久久不離去。見陳堯咨射箭十中八九，只是微微點頭，並不特別欣賞。
          </p>
        </div>

        {/* Emotion indicator */}
        <div
          className="mt-4 flex gap-4"
          style={{
            opacity: active ? 1 : 0,
            transition: 'opacity 0.8s ease 1.4s',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>😤</div>
            <span style={{ color: '#B8860B', fontSize: '0.7rem', letterSpacing: '0.1em' }}>陳堯咨：自豪</span>
          </div>
          <div style={{ color: '#B8860B', alignSelf: 'center', fontSize: '1.2rem' }}>vs</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>😌</div>
            <span style={{ color: '#B8860B', fontSize: '0.7rem', letterSpacing: '0.1em' }}>賣油翁：淡然</span>
          </div>
        </div>
      </div>

      <CornerOrnaments />
    </div>
  );
}

// Slide 5: Story Scene 3 - Dialogue
function Slide5({ active }: { active: boolean }) {
  const dialogues = [
    { speaker: '康肅', text: '汝亦知射乎？吾射不亦精乎？', color: '#8B1A1A', bg: 'rgba(139,26,26,0.08)', border: 'rgba(139,26,26,0.3)' },
    { speaker: '賣油翁', text: '無他，但手熟爾。', color: '#2C5F2E', bg: 'rgba(44,95,46,0.08)', border: 'rgba(44,95,46,0.3)' },
    { speaker: '康肅', text: '爾安敢輕吾射！', color: '#8B1A1A', bg: 'rgba(139,26,26,0.08)', border: 'rgba(139,26,26,0.3)' },
    { speaker: '賣油翁', text: '以我酌油知之。', color: '#2C5F2E', bg: 'rgba(44,95,46,0.08)', border: 'rgba(44,95,46,0.3)' },
  ];

  return (
    <div className="relative w-full h-full overflow-hidden ink-wash-bg">
      {/* Decorative background calligraphy */}
      <div
        className="absolute right-8 top-1/2 -translate-y-1/2 brush-text select-none pointer-events-none"
        style={{
          fontSize: '18rem',
          color: 'rgba(44,36,22,0.03)',
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: '-0.05em',
        }}
      >
        論
      </div>

      <div className="absolute inset-0 flex flex-col justify-center" style={{ padding: '3rem 5rem' }}>
        {/* Header */}
        <div
          className="flex items-center gap-4 mb-8"
          style={{
            opacity: active ? 1 : 0,
            transform: active ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'all 0.7s ease 0.3s',
          }}
        >
          <div className="seal">第三幕</div>
          <h2 className="brush-text" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#2C2416', letterSpacing: '0.15em' }}>
            針鋒相對
          </h2>
        </div>

        {/* Dialogue bubbles */}
        <div className="flex flex-col gap-4">
          {dialogues.map((d, i) => (
            <div
              key={i}
              className="flex items-start gap-4"
              style={{
                flexDirection: d.speaker === '康肅' ? 'row' : 'row-reverse',
                opacity: active ? 1 : 0,
                transform: active ? 'translateX(0)' : `translateX(${d.speaker === '康肅' ? '-30px' : '30px'})`,
                transition: `all 0.7s ease ${0.6 + i * 0.25}s`,
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  background: d.bg,
                  border: `1px solid ${d.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '0.7rem',
                  color: d.color,
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                }}
              >
                {d.speaker === '康肅' ? '康\n肅' : '翁'}
              </div>
              {/* Bubble */}
              <div
                style={{
                  background: d.bg,
                  border: `1px solid ${d.border}`,
                  padding: '0.75rem 1.2rem',
                  maxWidth: '65%',
                  position: 'relative',
                }}
              >
                <span style={{ color: '#5C4A2A', fontSize: '0.65rem', letterSpacing: '0.2em', display: 'block', marginBottom: '4px' }}>
                  {d.speaker}
                </span>
                <p style={{ color: '#2C2416', fontSize: '1rem', letterSpacing: '0.08em', fontWeight: 500 }}>
                  「{d.text}」
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tension indicator */}
        <div
          className="mt-6 flex items-center gap-3"
          style={{
            opacity: active ? 1 : 0,
            transition: 'opacity 0.7s ease 1.8s',
          }}
        >
          <div className="divider-classical" style={{ flex: 1 }} />
          <span style={{ color: '#B8860B', fontSize: '0.8rem', letterSpacing: '0.2em' }}>矛盾激化</span>
          <div className="divider-classical" style={{ flex: 1 }} />
        </div>
      </div>

      <CornerOrnaments />
    </div>
  );
}

// Slide 6: Story Scene 4 - Oil pouring demo
function Slide6({ active }: { active: boolean }) {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#0f0b06' }}>
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${IMAGES.oilDemo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: active ? 0.9 : 0,
          transition: 'opacity 1.5s ease',
        }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to left, rgba(15,11,6,0.9) 0%, rgba(15,11,6,0.3) 50%, rgba(15,11,6,0.1) 100%)' }} />

      {/* Right content */}
      <div
        className="absolute right-0 top-0 bottom-0 flex flex-col justify-center"
        style={{ width: '45%', padding: '3rem 4rem 3rem 2rem' }}
      >
        <div style={{ opacity: active ? 1 : 0, transition: 'opacity 0.6s ease 0.3s', marginBottom: '1rem' }}>
          <span style={{ color: 'rgba(184,134,11,0.8)', fontSize: '0.7rem', letterSpacing: '0.4em' }}>第四幕</span>
        </div>

        <h2
          className="brush-text mb-6"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#F5EDD6',
            letterSpacing: '0.1em',
            textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
            opacity: active ? 1 : 0,
            transform: active ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease 0.5s',
          }}
        >
          注油絕技
        </h2>

        {/* Steps */}
        {[
          { step: '一', text: '取一葫蘆置於地' },
          { step: '二', text: '以錢覆其口' },
          { step: '三', text: '徐以杓酌油瀝之' },
          { step: '四', text: '自錢孔入，而錢不濕' },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 mb-4"
            style={{
              opacity: active ? 1 : 0,
              transform: active ? 'translateX(0)' : 'translateX(30px)',
              transition: `all 0.6s ease ${0.8 + i * 0.2}s`,
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                background: 'rgba(184,134,11,0.2)',
                border: '1px solid rgba(184,134,11,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#DAA520',
                fontSize: '0.75rem',
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {item.step}
            </div>
            <span style={{ color: 'rgba(245,237,214,0.9)', fontSize: '0.9rem', letterSpacing: '0.08em' }}>{item.text}</span>
          </div>
        ))}

        {/* Result highlight */}
        <div
          style={{
            marginTop: '1rem',
            background: 'rgba(184,134,11,0.15)',
            border: '1px solid rgba(184,134,11,0.4)',
            padding: '0.75rem 1rem',
            opacity: active ? 1 : 0,
            transition: 'opacity 0.8s ease 1.8s',
          }}
        >
          <p style={{ color: '#DAA520', fontSize: '0.85rem', letterSpacing: '0.1em', textAlign: 'center' }}>
            ✦ 我亦無他，惟手熟爾 ✦
          </p>
        </div>
      </div>

      <CornerOrnaments />
    </div>
  );
}

// Slide 7: Story Scene 5 - Resolution
function Slide7({ active }: { active: boolean }) {
  return (
    <div className="relative w-full h-full overflow-hidden ink-wash-bg">
      {/* Background image full */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${IMAGES.lesson})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: active ? 0.6 : 0,
          transition: 'opacity 1.5s ease',
          filter: 'sepia(20%)',
        }}
      />
      <div className="absolute inset-0" style={{ background: 'rgba(245,237,214,0.55)' }} />

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ padding: '3rem' }}>
        <div style={{ opacity: active ? 1 : 0, transition: 'opacity 0.6s ease 0.3s', marginBottom: '1rem' }}>
          <span style={{ color: '#B8860B', fontSize: '0.7rem', letterSpacing: '0.4em' }}>第五幕</span>
        </div>

        <h2
          className="brush-text mb-6 text-center"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            color: '#2C2416',
            letterSpacing: '0.2em',
            textShadow: '1px 1px 0 rgba(245,237,214,0.8)',
            opacity: active ? 1 : 0,
            transform: active ? 'scale(1)' : 'scale(0.9)',
            transition: 'all 0.8s ease 0.5s',
          }}
        >
          笑而遣之
        </h2>

        <div
          className="divider-classical mb-6"
          style={{
            width: '300px',
            opacity: active ? 1 : 0,
            transition: 'opacity 0.7s ease 0.8s',
          }}
        />

        {/* Final quote */}
        <div
          style={{
            background: 'rgba(245,237,214,0.85)',
            border: '1px solid rgba(184,134,11,0.4)',
            padding: '1.5rem 2rem',
            maxWidth: '500px',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(44,36,22,0.1)',
            opacity: active ? 1 : 0,
            transition: 'opacity 0.8s ease 1s',
          }}
        >
          <p style={{ color: '#2C2416', fontSize: '1.1rem', lineHeight: 2, letterSpacing: '0.1em' }}>
            「康肅<span style={{ color: '#C0392B', fontWeight: 700 }}>笑而遣之</span>」
          </p>
          <p style={{ color: '#5C4A2A', fontSize: '0.8rem', marginTop: '0.5rem', letterSpacing: '0.1em' }}>
            陳堯咨因此有所領悟，明白熟能生巧的道理
          </p>
        </div>

        {/* Character arc */}
        <div
          className="mt-6 flex items-center gap-6"
          style={{
            opacity: active ? 1 : 0,
            transition: 'opacity 0.8s ease 1.4s',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem' }}>😤</div>
            <div style={{ color: '#B8860B', fontSize: '0.7rem', marginTop: '4px' }}>自矜</div>
          </div>
          <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
            <path d="M5 10 H50 M42 3 L55 10 L42 17" stroke="#B8860B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem' }}>😊</div>
            <div style={{ color: '#B8860B', fontSize: '0.7rem', marginTop: '4px' }}>領悟</div>
          </div>
        </div>
      </div>

      <CornerOrnaments />
    </div>
  );
}

// Slide 8: Theme - 熟能生巧
function Slide8({ active }: { active: boolean }) {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#0f0b06' }}>
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${IMAGES.moral})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: active ? 0.85 : 0,
          transition: 'opacity 1.5s ease',
        }}
      />
      <div className="absolute inset-0" style={{ background: 'rgba(15,11,6,0.55)' }} />

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ padding: '3rem' }}>
        {/* Main theme */}
        <div
          style={{
            opacity: active ? 1 : 0,
            transform: active ? 'scale(1)' : 'scale(0.8)',
            transition: 'all 1s ease 0.5s',
            textAlign: 'center',
          }}
        >
          <p style={{ color: 'rgba(184,134,11,0.8)', fontSize: '0.8rem', letterSpacing: '0.5em', marginBottom: '1rem' }}>
            主　題
          </p>
          <h1
            className="brush-text"
            style={{
              fontSize: 'clamp(4rem, 12vw, 9rem)',
              color: '#F5EDD6',
              letterSpacing: '0.3em',
              textShadow: '0 0 60px rgba(184,134,11,0.4), 3px 3px 0 rgba(0,0,0,0.5)',
              lineHeight: 1,
              fontWeight: 900,
            }}
          >
            熟能生巧
          </h1>
        </div>

        <div
          className="divider-classical mt-6 mb-6"
          style={{
            width: '320px',
            opacity: active ? 1 : 0,
            transition: 'opacity 0.7s ease 1.2s',
          }}
        />

        {/* Explanation */}
        <div
          style={{
            opacity: active ? 1 : 0,
            transform: active ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease 1.4s',
            textAlign: 'center',
            maxWidth: '480px',
          }}
        >
          <p style={{ color: 'rgba(245,237,214,0.85)', fontSize: '1rem', lineHeight: 2, letterSpacing: '0.1em' }}>
            無論射箭還是注油，
          </p>
          <p style={{ color: 'rgba(245,237,214,0.85)', fontSize: '1rem', lineHeight: 2, letterSpacing: '0.1em' }}>
            技藝的精進皆源於
            <span style={{ color: '#DAA520', fontWeight: 700 }}> 勤加練習 </span>。
          </p>
          <p style={{ color: 'rgba(245,237,214,0.85)', fontSize: '1rem', lineHeight: 2, letterSpacing: '0.1em' }}>
            切勿因一技之長而<span style={{ color: '#C0392B', fontWeight: 600 }}>自矜自誇</span>。
          </p>
        </div>

        {/* Two columns comparison */}
        <div
          className="mt-6 flex gap-8"
          style={{
            opacity: active ? 1 : 0,
            transition: 'opacity 0.8s ease 1.8s',
          }}
        >
          {[
            { icon: '🏹', title: '射箭', desc: '十中八九' },
            { icon: '🫙', title: '注油', desc: '錢不沾濕' },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(184,134,11,0.15)',
                border: '1px solid rgba(184,134,11,0.3)',
                padding: '1rem 1.5rem',
                textAlign: 'center',
                minWidth: '120px',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '4px' }}>{item.icon}</div>
              <div style={{ color: '#DAA520', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em' }}>{item.title}</div>
              <div style={{ color: 'rgba(245,237,214,0.7)', fontSize: '0.75rem', marginTop: '2px' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <CornerOrnaments />
    </div>
  );
}

// Slide 9: Writing Analysis
function Slide9({ active }: { active: boolean }) {
  const points = [
    { title: '借事說理', desc: '故事生動有趣，道理具體深刻' },
    { title: '懸念衝突', desc: '製造懸念，情節緊湊，引人入勝' },
    { title: '人物鮮明', desc: '寥寥數筆，形象立體生動' },
    { title: '對話精彩', desc: '對話呈現心理，推動情節' },
  ];

  return (
    <div className="relative w-full h-full overflow-hidden ink-wash-bg">
      {/* Decorative background */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 brush-text select-none pointer-events-none"
        style={{ fontSize: '20rem', color: 'rgba(44,36,22,0.03)', fontWeight: 900 }}
      >
        析
      </div>

      <div className="absolute inset-0 flex flex-col justify-center" style={{ padding: '3rem 5rem' }}>
        {/* Header */}
        <div
          className="flex items-center gap-4 mb-8"
          style={{
            opacity: active ? 1 : 0,
            transform: active ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'all 0.7s ease 0.3s',
          }}
        >
          <div className="seal">賞析重點</div>
          <h2 className="brush-text" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#2C2416', letterSpacing: '0.15em' }}>
            文章特色
          </h2>
        </div>

        {/* 2x2 grid */}
        <div className="grid grid-cols-2 gap-4">
          {points.map((p, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(245,237,214,0.7)',
                border: '1px solid rgba(184,134,11,0.3)',
                padding: '1.5rem',
                opacity: active ? 1 : 0,
                transform: active ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.7s ease ${0.6 + i * 0.2}s`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Number */}
              <div
                style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '10px',
                  fontSize: '4rem',
                  color: 'rgba(184,134,11,0.08)',
                  fontWeight: 900,
                  lineHeight: 1,
                  fontFamily: 'Noto Serif TC, serif',
                }}
              >
                {['一', '二', '三', '四'][i]}
              </div>
              <h3
                className="brush-text mb-2"
                style={{ fontSize: '1.3rem', color: '#C0392B', letterSpacing: '0.1em' }}
              >
                {p.title}
              </h3>
              <p style={{ color: '#5C4A2A', fontSize: '0.85rem', lineHeight: 1.7, letterSpacing: '0.05em' }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <CornerOrnaments />
    </div>
  );
}

// Slide 10: Ending
function Slide10({ active }: { active: boolean }) {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#1a1208' }}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(184,134,11,0.08) 0%, transparent 70%)' }} />

      {/* Decorative vertical lines */}
      {[15, 30, 50, 70, 85].map((pos, i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0 w-px"
          style={{
            left: `${pos}%`,
            background: `linear-gradient(to bottom, transparent, rgba(184,134,11,${0.05 + i * 0.02}), transparent)`,
          }}
        />
      ))}

      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ padding: '3rem' }}>
        {/* Top ornament */}
        <div
          style={{
            opacity: active ? 1 : 0,
            transform: active ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'all 0.8s ease 0.3s',
            marginBottom: '2rem',
          }}
        >
          <svg width="120" height="30" viewBox="0 0 120 30" fill="none">
            <path d="M10 15 H50 M70 15 H110" stroke="rgba(184,134,11,0.5)" strokeWidth="1"/>
            <circle cx="60" cy="15" r="6" stroke="rgba(184,134,11,0.6)" strokeWidth="1" fill="none"/>
            <circle cx="60" cy="15" r="2" fill="rgba(184,134,11,0.6)"/>
            <circle cx="30" cy="15" r="2" fill="rgba(184,134,11,0.3)"/>
            <circle cx="90" cy="15" r="2" fill="rgba(184,134,11,0.3)"/>
          </svg>
        </div>

        {/* Main text */}
        <div
          style={{
            opacity: active ? 1 : 0,
            transform: active ? 'scale(1)' : 'scale(0.9)',
            transition: 'all 1s ease 0.6s',
            textAlign: 'center',
          }}
        >
          <p style={{ color: 'rgba(184,134,11,0.7)', fontSize: '0.8rem', letterSpacing: '0.5em', marginBottom: '1.5rem' }}>
            ─ 全文終 ─
          </p>
          <h1
            className="brush-text"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              color: '#F5EDD6',
              letterSpacing: '0.3em',
              textShadow: '0 0 40px rgba(184,134,11,0.3)',
              lineHeight: 1.3,
              fontWeight: 900,
            }}
          >
            賣油翁
          </h1>
          <p
            style={{
              color: 'rgba(245,237,214,0.5)',
              fontSize: '0.9rem',
              letterSpacing: '0.3em',
              marginTop: '0.5rem',
            }}
          >
            歐陽修 著
          </p>
        </div>

        {/* Summary */}
        <div
          style={{
            marginTop: '2.5rem',
            background: 'rgba(184,134,11,0.08)',
            border: '1px solid rgba(184,134,11,0.25)',
            padding: '1.2rem 2rem',
            maxWidth: '480px',
            textAlign: 'center',
            opacity: active ? 1 : 0,
            transition: 'opacity 0.8s ease 1.3s',
          }}
        >
          <p style={{ color: 'rgba(245,237,214,0.8)', fontSize: '0.9rem', lineHeight: 2, letterSpacing: '0.1em' }}>
            凡事<span style={{ color: '#DAA520' }}>熟能生巧</span>，
          </p>
          <p style={{ color: 'rgba(245,237,214,0.8)', fontSize: '0.9rem', lineHeight: 2, letterSpacing: '0.1em' }}>
            無須<span style={{ color: '#C0392B' }}>自矜自誇</span>。
          </p>
        </div>

        {/* Bottom ornament */}
        <div
          style={{
            marginTop: '2rem',
            opacity: active ? 1 : 0,
            transition: 'opacity 0.8s ease 1.8s',
          }}
        >
          <div className="seal" style={{ color: 'rgba(192,57,43,0.7)', borderColor: 'rgba(192,57,43,0.5)', fontSize: '0.65rem', letterSpacing: '0.2em' }}>
            北宋 · 歸田錄
          </div>
        </div>
      </div>

      <CornerOrnaments />
    </div>
  );
}

// Slide titles for navigation
const SLIDE_TITLES = [
  '封面', '作者', '善射自矜', '微頷不驚', '針鋒相對', '注油絕技', '笑而遣之', '主題', '文章特色', '全文終'
];

const SLIDES = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9, Slide10];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [showParticles, setShowParticles] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((index: number) => {
    if (transitioning || index === current) return;
    setDirection(index > current ? 'next' : 'prev');
    setTransitioning(true);
    setShowParticles(true);
    setTimeout(() => {
      setCurrent(index);
      setTransitioning(false);
      setTimeout(() => setShowParticles(false), 3000);
    }, 400);
  }, [current, transitioning]);

  const goNext = useCallback(() => {
    if (current < SLIDES.length - 1) goTo(current + 1);
  }, [current, goTo]);

  const goPrev = useCallback(() => {
    if (current > 0) goTo(current - 1);
  }, [current, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  // Touch/swipe support
  const touchStart = useRef<number>(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  const SlideComponent = SLIDES[current];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden select-none"
      style={{ background: '#1a1208', fontFamily: "'Noto Serif TC', serif" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ink particles on transition */}
      <InkParticles active={showParticles} />

      {/* Main slide */}
      <div
        className="w-full h-full"
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning
            ? `translateX(${direction === 'next' ? '-3%' : '3%'})`
            : 'translateX(0)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <SlideComponent active={!transitioning} />
      </div>

      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 right-0 z-40"
        style={{ height: '3px', background: 'rgba(184,134,11,0.15)' }}
      >
        <div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #B8860B, #DAA520)',
            width: `${((current + 1) / SLIDES.length) * 100}%`,
            transition: 'width 0.5s ease',
          }}
        />
      </div>

      {/* Navigation dots */}
      <div
        className="fixed bottom-6 left-0 right-0 flex justify-center gap-2 z-40"
        onMouseEnter={() => setShowNav(true)}
        onMouseLeave={() => setShowNav(false)}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            title={SLIDE_TITLES[i]}
            style={{
              width: i === current ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === current ? '#DAA520' : 'rgba(184,134,11,0.35)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div
        className="fixed top-4 right-6 z-40 flex items-center gap-2"
        style={{ color: 'rgba(184,134,11,0.6)', fontSize: '0.75rem', letterSpacing: '0.2em' }}
      >
        <span style={{ fontWeight: 700, color: 'rgba(218,165,32,0.9)' }}>{String(current + 1).padStart(2, '0')}</span>
        <span>/</span>
        <span>{String(SLIDES.length).padStart(2, '0')}</span>
      </div>

      {/* Navigation title tooltip */}
      {showNav && (
        <div
          className="fixed bottom-16 left-0 right-0 flex justify-center z-40"
          style={{
            color: 'rgba(184,134,11,0.8)',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            pointerEvents: 'none',
          }}
        >
          {SLIDE_TITLES[current]}
        </div>
      )}

      {/* Arrow navigation */}
      <button
        onClick={goPrev}
        disabled={current === 0}
        className="fixed left-4 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center hover-glow"
        style={{
          width: '40px',
          height: '40px',
          background: 'rgba(184,134,11,0.12)',
          border: '1px solid rgba(184,134,11,0.25)',
          color: current === 0 ? 'rgba(184,134,11,0.2)' : 'rgba(184,134,11,0.7)',
          cursor: current === 0 ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          borderRadius: '2px',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3 L5 8 L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <button
        onClick={goNext}
        disabled={current === SLIDES.length - 1}
        className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center hover-glow"
        style={{
          width: '40px',
          height: '40px',
          background: 'rgba(184,134,11,0.12)',
          border: '1px solid rgba(184,134,11,0.25)',
          color: current === SLIDES.length - 1 ? 'rgba(184,134,11,0.2)' : 'rgba(184,134,11,0.7)',
          cursor: current === SLIDES.length - 1 ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          borderRadius: '2px',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 3 L11 8 L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Keyboard hint - show briefly on load */}
      <KeyboardHint />
    </div>
  );
}

function KeyboardHint() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="fixed bottom-16 right-6 z-40 flex items-center gap-2"
      style={{
        opacity: visible ? 0.6 : 0,
        transition: 'opacity 1s ease',
        color: 'rgba(184,134,11,0.8)',
        fontSize: '0.7rem',
        letterSpacing: '0.1em',
        pointerEvents: 'none',
      }}
    >
      <kbd style={{ border: '1px solid rgba(184,134,11,0.4)', padding: '1px 5px', borderRadius: '2px', fontSize: '0.65rem' }}>←</kbd>
      <kbd style={{ border: '1px solid rgba(184,134,11,0.4)', padding: '1px 5px', borderRadius: '2px', fontSize: '0.65rem' }}>→</kbd>
      <span>切換</span>
    </div>
  );
}

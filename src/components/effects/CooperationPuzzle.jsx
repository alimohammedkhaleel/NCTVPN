import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CooperationPuzzle.css';

gsap.registerPlugin(ScrollTrigger);

// Grid configuration
const ROWS = 3;
const COLS = 3;
const PIECE_WIDTH = 150; // Total width 450px
const PIECE_HEIGHT = 100; // Total height 300px

const partnershipDetails = [
  { id: 0, title: "Central Strategic Agreement", desc: "Establishing technological protocols and curriculum standards." },
  { id: 1, title: "Curriculum Integration", desc: "Aligning software engineering modules with industry benchmarks." },
  { id: 2, title: "Hardware Provisions", desc: "Delivering state-of-the-art laboratory arrays and networking rigs." },
  { id: 3, title: "Faculty Training Matrix", desc: "Equipping instructors with deep-level routing and security skills." },
  { id: 4, title: "Joint Certification", desc: "Fulfilling direct vocational standards recognized across China and Egypt." },
  { id: 5, title: "Applied Research Lab", desc: "Collaborating on advanced automation and telecommunication fields." },
  { id: 6, title: "Bilateral Infrastructure", desc: "Connecting local universities to global academic cloud nodes." },
  { id: 7, title: "Vocational Internships", desc: "Opening direct pipelines for students inside leading tech corporations." },
  { id: 8, title: "Evaluation Standard", desc: "Applying unified national testing arrays for technological degrees." }
];

export default function CooperationPuzzle() {
  const containerRef = useRef(null);
  const puzzleRef = useRef(null);
  const piecesRef = useRef([]);
  
  // Game states: 'scroll' (assembling on scroll), 'game' (interactive sliding puzzle)
  const [mode, setMode] = useState('scroll');
  const [board, setBoard] = useState(Array.from({ length: 9 }, (_, i) => i)); // Represents current piece indices
  const [emptyIndex, setEmptyIndex] = useState(8); // Index 8 starts as empty in game mode
  const [selectedPiece, setSelectedPiece] = useState(null);

  // Initialize scattered states for GSAP
  useEffect(() => {
    if (mode !== 'scroll') return;

    const ctx = gsap.context(() => {
      const pieces = piecesRef.current;
      
      // Setup scattered initial coordinates for ScrollTrigger
      pieces.forEach((piece, index) => {
        if (!piece) return;

        // Generate randomized coordinates for scattered state
        const randomX = (Math.random() - 0.5) * 400;
        const randomY = (Math.random() - 0.5) * 400;
        const randomRotate = (Math.random() - 0.5) * 120;
        const randomScale = Math.random() * 0.3 + 0.6;

        gsap.fromTo(piece, 
          {
            x: randomX,
            y: randomY,
            rotation: randomRotate,
            scale: randomScale,
            opacity: 0,
            filter: 'blur(8px)',
            boxShadow: '0 0 0px rgba(250, 204, 21, 0)'
          },
          {
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 1.5,
              toggleActions: 'play none none reverse'
            },
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            ease: 'power3.out'
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [mode]);

  // Handle switching to Game Mode
  const startPuzzleGame = () => {
    setMode('game');
    // Scramble the puzzle pieces randomly
    let newBoard = [...board];
    // Simple Durstenfeld scramble algorithm
    for (let i = newBoard.length - 2; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newBoard[i], newBoard[j]] = [newBoard[j], newBoard[i]];
    }
    setBoard(newBoard);
    setEmptyIndex(newBoard.indexOf(8)); // Piece 8 is empty
  };

  // Reset to scroll assembly mode
  const resetToScroll = () => {
    setMode('scroll');
    setBoard(Array.from({ length: 9 }, (_, i) => i));
    setSelectedPiece(null);
  };

  // Check if piece can move to the empty spot
  const handlePieceClick = (indexOnBoard, pieceId) => {
    if (mode === 'scroll') {
      // In scroll mode, click to reveal detail panel
      setSelectedPiece(partnershipDetails[pieceId]);
      return;
    }

    // In game mode: check if click position is adjacent to empty position
    const row = Math.floor(indexOnBoard / COLS);
    const col = indexOnBoard % COLS;
    const emptyRow = Math.floor(emptyIndex / COLS);
    const emptyCol = emptyIndex % COLS;

    const isAdjacent = 
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow);

    if (isAdjacent) {
      // Swap elements on the board
      const newBoard = [...board];
      newBoard[emptyIndex] = pieceId;
      newBoard[indexOnBoard] = 8; // move the empty piece

      // Animate the actual shift in 3D
      const clickedPieceEl = piecesRef.current[pieceId];
      if (clickedPieceEl) {
        const deltaX = (emptyCol - col) * PIECE_WIDTH;
        const deltaY = (emptyRow - row) * PIECE_HEIGHT;

        gsap.fromTo(clickedPieceEl,
          { x: -deltaX, y: -deltaY },
          { x: 0, y: 0, duration: 0.3, ease: 'power2.out' }
        );
      }

      setBoard(newBoard);
      setEmptyIndex(indexOnBoard);
      setSelectedPiece(partnershipDetails[pieceId]);
    }
  };

  return (
    <section className="cooperation-puzzle-section" ref={containerRef}>
      
      <div className="puzzle-intro">
        <span className="badge">Bilateral Cooperation</span>
        <h2 className="section-title">
          The Interlocked <span className="highlight">Cooperation Protocol</span>
        </h2>
        <p className="section-desc">
          Unifying academic technology curricula and state-of-the-art lab standards with global industrial corporations under direct government supervision.
        </p>
      </div>

      <div className="puzzle-dual-layout">
        
        {/* Left Interactive Panel */}
        <div className="puzzle-board-container">
          
          <div className="puzzle-controls">
            {mode === 'scroll' ? (
              <button className="puzzle-btn scramble-btn" onClick={startPuzzleGame}>
                🧩 Scramble & Solve
              </button>
            ) : (
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="puzzle-btn reset-btn" onClick={resetToScroll}>
                  🔄 Back to Scroll
                </button>
                <button className="puzzle-btn scramble-btn" onClick={startPuzzleGame}>
                  🔀 Rescramble
                </button>
              </div>
            )}
          </div>

          <div 
            className={`puzzle-grid-board mode-${mode}`}
            ref={puzzleRef}
            style={{ width: `${PIECE_WIDTH * COLS}px`, height: `${PIECE_HEIGHT * ROWS}px` }}
          >
            {board.map((pieceId, indexOnBoard) => {
              const originalRow = Math.floor(pieceId / COLS);
              const originalCol = pieceId % COLS;
              const isEmpty = mode === 'game' && pieceId === 8;

              return (
                <div
                  key={pieceId}
                  ref={el => piecesRef.current[pieceId] = el}
                  className={`puzzle-piece ${isEmpty ? 'empty-piece' : ''} ${selectedPiece && selectedPiece.id === pieceId ? 'active-piece' : ''}`}
                  style={{
                    width: `${PIECE_WIDTH}px`,
                    height: `${PIECE_HEIGHT}px`,
                    left: `${(indexOnBoard % COLS) * PIECE_WIDTH}px`,
                    top: `${Math.floor(indexOnBoard / COLS) * PIECE_HEIGHT}px`,
                    backgroundImage: isEmpty ? 'none' : `url('/src/assets/china-cooperation-protocol.jpg')`,
                    backgroundPosition: `-${originalCol * PIECE_WIDTH}px -${originalRow * PIECE_HEIGHT}px`,
                    backgroundSize: `${PIECE_WIDTH * COLS}px ${PIECE_HEIGHT * ROWS}px`
                  }}
                  onClick={() => handlePieceClick(indexOnBoard, pieceId)}
                >
                  {!isEmpty && (
                    <div className="piece-number">{pieceId + 1}</div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="puzzle-hint">
            {mode === 'scroll' 
              ? "📜 Scroll down to see pieces assemble, or click any piece to reveal details."
              : "🎮 Click pieces adjacent to the blank space to slide and solve the protocol!"
            }
          </div>
        </div>

        {/* Right Detail Pane */}
        <div className="puzzle-info-panel">
          <div className="info-glass-card">
            {selectedPiece ? (
              <div key={selectedPiece.id} className="detail-animate">
                <span className="info-num">0{selectedPiece.id + 1}</span>
                <h3 className="info-title">{selectedPiece.title}</h3>
                <p className="info-desc">{selectedPiece.desc}</p>
                <div className="china-synergy-badge">⚡ Egypt-China Technological Pact</div>
              </div>
            ) : (
              <div className="empty-info-state">
                <div className="info-icon">📡</div>
                <h3>Central Cooperation Hub</h3>
                <p>Click any puzzle piece to inspect specific clauses, hardware integrations, and training frameworks within our international protocols.</p>
              </div>
            )}
          </div>

          {/* Secondary Photo - KOICA Koreatech partnership */}
          <div className="koica-card">
            <div className="koica-img-wrapper">
              <img src="/src/assets/koica-koreatech-meeting.jpg" alt="KOICA Koreatech meeting" className="koica-img" />
              <div className="koica-overlay">
                <h4>KOICA-Koreatech Assembly</h4>
                <p>Bilateral technological partnership meeting for system accreditation.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}

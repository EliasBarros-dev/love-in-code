import React, { useState, useRef, useEffect } from "react";
import foto1 from '../src/assets/fotos/foto1.jpg';
import foto2 from '../src/assets/fotos/foto2.jpg';
import foto3 from '../src/assets/fotos/foto3.png';
import foto4 from '../src/assets/fotos/foto4.png';
import foto5 from '../src/assets/fotos/foto5.png';
import som from '../src/assets/audios/som.mp3';

const fotos = [
  foto1,
  foto2,
  foto3,
  foto4,
  foto5
];

const musicaUrl = som;

const DiaDosNamorados: React.FC = () => {
  const [fotoIndex, setFotoIndex] = useState(0);
  const [hearts, setHearts] = useState<{ id: number; left: string }[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const heartId = useRef(0);

  const proximaFoto = () => {
    setFotoIndex((prev) => (prev + 1) % fotos.length);
  };

  const fotoAnterior = () => {
    setFotoIndex((prev) => (prev - 1 + fotos.length) % fotos.length);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: heartId.current++,
        left: `${Math.random() * 100}%`,
      };
      setHearts((prev) => [...prev, newHeart]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 4000); // Duração do efeito
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={{ color: "#d6336c" }}>Feliz Dia dos Namorados!</h1>

      <div style={styles.playerContainer}>
        <audio ref={audioRef} src={musicaUrl} loop />
        <button onClick={togglePlay} style={styles.btnPlayer}>
          ▶️ / ⏸️ Tocar / Pausar Música
        </button>
      </div>

      <div style={styles.carousel}>
        <button onClick={fotoAnterior} style={styles.btnCarousel}>
          {"<"}
        </button>
        <img
          src={fotos[fotoIndex]}
          alt={`Foto ${fotoIndex + 1}`}
          style={styles.foto}
        />
        <button onClick={proximaFoto} style={styles.btnCarousel}>
          {">"}
        </button>
      </div>

      <p style={styles.textoDeclaracao}>
         Meu amor, cada momento ao seu lado é um presente único e inesquecível. Obrigado por encher meus dias de luz, carinho e alegria. Tenho um imenso orgulho da linda família que estamos construindo e da mulher extraordinária, mãe dedicada e namorada maravilhosa que você é. Te amo com todo o meu coração, hoje, amanhã e para sempre.
      </p>

      {/* Container dos corações */}
      <div style={styles.heartsContainer}>
        {hearts.map((heart) => (
          <span
            key={heart.id}
            style={{
              ...styles.heart,
              left: heart.left,
              animation: "float 4s linear forwards",
            }}
          >
            ❤️
          </span>
        ))}
      </div>

      {/* Animação inline */}
      <style>
        {`
          @keyframes float {
            0% {
              bottom: 0;
              opacity: 1;
              transform: scale(1);
            }
            100% {
              bottom: 100%;
              opacity: 0;
              transform: scale(1.5);
            }
          }
        `}
      </style>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 600,
    margin: "40px auto",
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  playerContainer: {
    marginBottom: 20,
  },
  btnPlayer: {
    backgroundColor: "#d6336c",
    border: "none",
    color: "white",
    padding: "10px 20px",
    borderRadius: 5,
    cursor: "pointer",
    fontSize: 16,
  },
  carousel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  btnCarousel: {
    backgroundColor: "#d6336c",
    border: "none",
    color: "white",
    fontSize: 30,
    padding: "5px 15px",
    cursor: "pointer",
    borderRadius: 5,
    userSelect: "none",
  },
  foto: {
    width: 400,
    height: 400,
    objectFit: "cover",
    margin: "0 15px",
    borderRadius: 15,
    boxShadow: "0 4px 10px rgba(214,51,108,0.4)",
  },
  textoDeclaracao: {
    fontSize: 18,
    color: "#000",
    padding: "0 20px",
  },
  heartsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    overflow: "hidden",
  },
  heart: {
    position: "absolute",
    bottom: 0,
    fontSize: 24,
  },
};

export default DiaDosNamorados;

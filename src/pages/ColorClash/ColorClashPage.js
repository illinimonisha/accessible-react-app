import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { FaArrowUp } from 'react-icons/fa6';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import V3RestartButton from '../../components/V3RestartButton';
import { Link } from 'react-router-dom';
import {
  beginV3Game,
  consumeV3PostScoreboardReturn,
  getV3EntryMode,
} from '../V3/v3Journey';

function ColorClashPage() {
  const v3EntryMode = getV3EntryMode('color-clash');
  const isV3Flow = v3EntryMode !== null;
  const canStart = !isV3Flow || v3EntryMode === 'start';
  const canLearn = !isV3Flow || v3EntryMode === 'learn';

  React.useEffect(() => {
    if (!isV3Flow || !consumeV3PostScoreboardReturn('color-clash')) {
      return;
    }

    window.requestAnimationFrame(() => {
      document.getElementById('more-about')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }, [isV3Flow]);

  return (
    <div style={{ overflowX: 'hidden' }}>
      <Header logoOnly={isV3Flow} />

      {/* HERO + ACTION */}
      <section className="py-5" style={{ backgroundColor: '#E3F2FD', position: 'relative' }}>

        <Container>
          {isV3Flow && <V3RestartButton className="mb-3" />}
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-dark mb-2">Color Clash</h1>
            <p className="fs-5 text-dark mb-2">
              Accessibility for Color Blindness{' '}
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('more-about');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  margin: 0,
                  textDecoration: 'underline',
                  color: '#0d6efd',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                and more
              </button>
            </p>
          </div>

          <Row className="justify-content-center g-4">

            {/* Start Game */}
            <Col
              md={6}
              className="text-center"
              style={isV3Flow ? {
                opacity: canStart ? 1 : 0.62,
                outline: canStart ? '3px solid rgba(13, 110, 253, 0.45)' : undefined,
                outlineOffset: '5px',
                borderRadius: 12,
              } : undefined}
            >
              <div
                style={{
                  backgroundColor: '#78A9CF',
                  borderRadius: 12,
                  padding: '20px',
                  height: '360px',        
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <img
                  src={process.env.PUBLIC_URL + "/icons/colorClash/colorClashRound2.svg"}
                  alt="Color Clash game illustration"
                  style={{
                    maxWidth: '100%',
                    height: '280px',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
              </div>

              <Button
                as={canStart ? Link : 'button'}
                to={canStart ? '/color-clash/round-1' : undefined}
                disabled={!canStart}
                aria-label={!canStart ? 'Start Game is unavailable during this V3 step' : undefined}
                onClick={isV3Flow && canStart ? (event) => {
                  if (!beginV3Game('color-clash')) event.preventDefault();
                } : undefined}
                size="lg"
                className="mt-3 px-4 py-2 fw-semibold"
                style={{
                  fontSize: 'clamp(1.6rem, 4.5vw, 2rem)', // ✅ scales down on mobile
                  backgroundColor: '#6BA3D6',
                  border: 'none',
                  borderRadius: 20,
                  boxShadow: '0 4px 0 rgba(0,0,0,.2)',
                  maxWidth: '100%',                        // ✅ never exceed column
                  whiteSpace: 'normal',                    // ✅ allow wrap if needed
                  wordBreak: 'break-word'
                }}
              >
                Start Game
              </Button>
            </Col>

            {/* Implementing Accessibility */}
            <Col
              md={6}
              className="text-center"
              style={isV3Flow ? {
                opacity: canLearn ? 1 : 0.62,
                outline: canLearn ? '3px solid rgba(13, 110, 253, 0.45)' : undefined,
                outlineOffset: '5px',
                borderRadius: 12,
              } : undefined}
            >
              <div
                style={{
                  backgroundColor: '#78A9CF',
                  borderRadius: 12,
                  padding: '20px',
                  height: '360px',        
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'center'
                }}
              >
                <div
                  style={{
                    fontSize: 'clamp(1.4rem, 4.5vw, 1.7rem)',
                    fontWeight: '700',
                    color: 'white',
                    marginBottom: '10px'
                  }}
                >
                  Implementing Accessibility
                </div>

                <img
                  src={process.env.PUBLIC_URL + "/icons/learnMoreDown.svg"}
                  alt="Implementing accessibility illustration"
                  style={{
                    maxWidth: '100%',
                    height: '280px',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
              </div>

              <Button
                as={canLearn ? Link : 'button'}
                to={canLearn ? '/color-clash/learn-more' : undefined}
                disabled={!canLearn}
                aria-label={!canLearn ? 'Learn More is unavailable until after the game is complete' : undefined}
                variant="primary"
                size="lg"
                className="mt-3 px-4 py-2 fw-semibold"
                style={{
                  fontSize: 'clamp(1.6rem, 4.5vw, 2rem)', // ✅ scales down on mobile
                  backgroundColor: '#6BA3D6',
                  border: 'none',
                  borderRadius: 20,
                  boxShadow: '0 4px 0 rgba(0,0,0,.2)',
                  maxWidth: '100%',                        // ✅ never exceed column
                  whiteSpace: 'normal',                    // ✅ allow wrap if needed
                  wordBreak: 'break-word'
                }}
              >
                Learn More
              </Button>
            </Col>

          </Row>

        </Container>
      </section>

      {/* ALWAYS VISIBLE SECTION */}
      <section
        id="more-about"
        className="py-5 border-top"
        style={{ scrollMarginTop: isV3Flow ? '1.5rem' : undefined }}
      >
        <Container className="text-center">
          <h2 className="fw-bold display-6 text-primary mb-4">
            More About Designing With Color
          </h2>
          <p className="fst-italic fs-5" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            This game shows what the world looks like when people can’t see all colors which helps designers make technology easier to understand and to look at.
          </p>
        </Container>
        {isV3Flow && (
          <Container className="text-center mt-4">
            <Button
              type="button"
              variant="primary"
              size="lg"
              className="v3-back-to-top"
              aria-label="Back to top"
              onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
            >
              <FaArrowUp aria-hidden="true" />
            </Button>
          </Container>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default ColorClashPage;

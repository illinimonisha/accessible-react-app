import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, Col } from 'react-bootstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import V3RestartButton from '../../components/V3RestartButton';
import { Link, useLocation } from 'react-router-dom';
import {
  beginV3Game,
  consumeV3PostScoreboardReturn,
  getV3EntryMode,
} from '../V3/v3Journey';

function SilentSurfingPage() {
  const location = useLocation();
  const isK8Version = new URLSearchParams(location.search).get('version') === 'k8';
  const v3EntryMode = getV3EntryMode('silent-surfing');
  const isV3Flow = v3EntryMode !== null;
  const canStart = !isV3Flow || v3EntryMode === 'start';
  const canLearn = !isV3Flow || v3EntryMode === 'learn';

  React.useEffect(() => {
    if (!isV3Flow || !consumeV3PostScoreboardReturn('silent-surfing')) {
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
    <div>
      <Header logoOnly={isV3Flow} />

      {/* HERO + ACTION */}
      <section className="py-5" style={{ backgroundColor: '#E3F2FD', position: 'relative' }}>
        {/* Back button - top left
        <a
          href="/"
          aria-label="Go back to home page"
          style={{
            position: 'absolute',
            top: '1.5rem',
            left: '1.5rem',
            background: 'transparent',
            border: 'none',
            fontSize: '2rem',
            cursor: 'pointer',
            color: '#002B5B',
            textDecoration: 'none',
          }}
        >
          &lt;
        </a> */}

        <Container>
          {isV3Flow && <V3RestartButton className="mb-3" />}
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-dark mb-2">Silent Surfing</h1>
            <p className="fs-5 text-dark mb-2">
              Accessibility for Deafness{' '}
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
                  src={process.env.PUBLIC_URL + "/icons/silentSurfing/silentSurfingRound2.svg"}
                  alt="Silent Surfing game illustration"
                  style={{
                    maxWidth: '100%',
                    height: '280px',
                    objectFit: 'contain'
                  }}
                />
              </div>

              <Button
                as={canStart ? Link : 'button'}
                to={canStart ? '/silent-surfing/round-1' : undefined}
                disabled={!canStart}
                aria-label={!canStart ? 'Start Game is unavailable during this V3 step' : undefined}
                onClick={isV3Flow && canStart ? (event) => {
                  if (!beginV3Game('silent-surfing')) event.preventDefault();
                } : undefined}
                variant="primary"
                size="lg"
                className="mt-3 px-4 py-2 fw-semibold"
                style={{
                  fontSize: '2rem',
                  backgroundColor: '#6BA3D6',
                  border: 'none',
                  borderRadius: 20,
                  boxShadow: '0 4px 0 rgba(0,0,0,.2)'
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
                    objectFit: 'contain'
                  }}
                />
              </div>

              <Button
                as={canLearn ? Link : 'button'}
                to={canLearn ? '/silent-surfing/learn-more' : undefined}
                disabled={!canLearn}
                aria-label={!canLearn ? 'Learn More is unavailable until after the game is complete' : undefined}
                variant="primary"
                size="lg"
                className="mt-3 px-4 py-2 fw-semibold"
                style={{
                  fontSize: 'clamp(1.6rem, 4.5vw, 2rem)', 
                  backgroundColor: '#6BA3D6',
                  border: 'none',
                  borderRadius: 20,
                  boxShadow: '0 4px 0 rgba(0,0,0,.2)',
                  maxWidth: '100%',                        
                  whiteSpace: 'normal',                    
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
        <Container className="text-center" style={{ maxWidth: '800px' }}>
          <h2
            className="fw-bold display-6 mb-4"
            style={{
              color: isK8Version ? '#774FCA' : '#303f9f',
              textShadow: isK8Version ? undefined : '1px 2px 2px rgba(0, 0, 0, 0.25)',
            }}
          >
            Universally Designing for Deafness
          </h2>
          <p className="fs-5">
            Useful for those who are deaf, hard of hearing, or have high, limited language fluency/comprehension, but also helpful in loud public spaces
          </p>
        </Container>

        <Container className="text-center">
          <table
            className="text-center"
            style={{
              width: '60%',
              margin: '0 auto',
              borderCollapse: 'separate',
              borderSpacing: '12px',
            }}
          >
            <thead>
              <tr>
                {['Permanent', 'Temporary', 'Situational'].map((category) => (
                  <th
                    key={category}
                    style={{
                      backgroundColor: isK8Version ? '#E4D8FF' : '#B6D5EB99',
                      border: 'none',
                      width: '33.33%',
                      padding: '12px',
                      fontWeight: 'normal',
                      fontStyle: 'italic',
                      fontSize: '20px',
                    }}
                  >
                    {category}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {[
                  ['Deafness', 'Auditory Processing Disorder(APD)'],
                  ['Ear infection', 'Language Barrier'],
                  ['Noisy Environment', 'Quiet Environment'],
                ].map((examples, index) => (
                  <td
                    key={index}
                    style={{
                      border: '1px solid black',
                      padding: '12px',
                      verticalAlign: 'top',
                      width: '33.33%',
                    }}
                  >
                    <ul className="text-start mb-0">
                      {examples.map((example) => <li key={example}>{example}</li>)}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </Container>

        <Container className="text-start" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p className="fs-5 fw-bold" style={{ color: '#272A79' }}>
            Types of disabilities:
          </p>
          <p>
            <strong>Permanent:</strong> A disability that diminishes an individual’s ability to perform tasks at the same capacity that the individual was able to before their condition.
          </p>
          <p>
            <strong>Temporary:</strong> A condition that prevents an individual from performing their activities for a limited period
          </p>
          <p>
            <strong>Situational:</strong> A temporary limitation in a person’s ability to interact with their environment or technology, caused by a momentary circumstance.
          </p>
        </Container>
        {isV3Flow && (
          <Container className="text-center mt-4">
            <Button
              type="button"
              variant="link"
              className="v3-back-to-top"
              onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
            >
              Scroll up ↑ for more
            </Button>
          </Container>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default SilentSurfingPage;

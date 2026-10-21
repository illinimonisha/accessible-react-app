import React, { useEffect, useRef, useState } from 'react';
import { Card, Col, Container, Navbar, Row } from 'react-bootstrap';
import '../../App.css';
import Footer from '../../components/Footer';
import ColorClashIcon from '../../components/icons/ColorClashIcon.jsx';
import SilentSurfingIcon from '../../components/icons/SilentSurfingIcon.jsx';
import DimmedDetailsIcon from '../../components/icons/DimmedDetailsIcons.jsx';
import {
  finishV3PostTest,
  getV3ResumeRoute,
  readV3Journey,
  startV3Game,
  startV3PreTest,
  startV3Journey,
  V3_GAME_ORDER,
} from './v3Journey';

const PRE_TEST_FORM_URL = 'https://forms.gle/6p4kTRvzan6SYHxu5';
const POST_TEST_FORM_URL = 'https://forms.gle/cfauebSKVtMtvXu79';
const APP_BASE_PATH = window.location.pathname.replace(/\/v3\/?$/, '/') || '/';

const games = [
  {
    id: 'color-clash',
    title: 'Color Clash',
    description: 'Accessibility for Color Blindness and more',
    to: '/color-clash',
    Icon: ColorClashIcon,
  },
  {
    id: 'silent-surfing',
    title: 'Silent Surfing',
    description: 'Accessibility for Deafness and more',
    to: '/silent-surfing',
    Icon: SilentSurfingIcon,
  },
  {
    id: 'dimmed-details',
    title: 'Dimmed Details',
    description: 'Accessibility for Low Vision and more',
    to: '/dimmed-details',
    Icon: DimmedDetailsIcon,
  },
];

const preGameMessages = [
  'Step into the game and discover how inclusive design changes the experience!',
  'Continue exploring why designing for everyone matters!',
  'Every player is different. Good designs make room for everyone!',
];

function V3HomePage() {
  const [stage, setStage] = useState(() => readV3Journey()?.stage || 'landing');
  const stageHeadingRef = useRef(null);
  const journey = readV3Journey();

  useEffect(() => {
    if (stage !== 'landing') {
      stageHeadingRef.current?.focus();
    }
  }, [stage]);

  useEffect(() => {
    if (stage !== 'games') {
      return;
    }
    const resumeRoute = getV3ResumeRoute();
    if (resumeRoute) {
      window.location.replace(`${APP_BASE_PATH}?v3=1#${resumeRoute}`);
    }
  }, [stage]);

  return (
    <div>
      <Navbar bg="white" variant="light" className="py-3 border-bottom">
        <Container>
          <Navbar.Brand as="div" className="d-flex align-items-center">
            <img
              src={process.env.PUBLIC_URL + '/icons/logo-full.png'}
              alt="Project Logo"
              className="img-fluid"
              style={{ height: '60px', maxWidth: '100%', objectFit: 'contain' }}
            />
          </Navbar.Brand>
        </Container>
      </Navbar>

      <section className="py-4" style={{ backgroundColor: '#E3F2FD' }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <p className="fw-bold text-dark mb-2" style={{ fontSize: '2rem' }}>
                Enhancing QUality
              </p>
              <h1
                className="fw-bold text-primary mb-0"
                style={{
                  fontSize: '3.2rem',
                  lineHeight: '1.2',
                  textShadow: '2px 2px 0px rgba(0,0,0,0.1)',
                }}
              >
                Accessibility <br />
                Learning Games
              </h1>
            </Col>
            <Col lg={6} className="text-center">
              <img
                src={process.env.PUBLIC_URL + '/icons/Game image.svg'}
                alt="Game Hero Graphic"
                className="img-fluid"
                style={{ maxWidth: '100%', height: 'auto', maxHeight: '360px' }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      <main className="py-5">
        <Container>
          {stage === 'landing' && (
            <section className="text-center" aria-labelledby="v3-landing-heading">
              <h2
                id="v3-landing-heading"
                className="visually-hidden"
                ref={stageHeadingRef}
                tabIndex="-1"
              >
                Welcome
              </h2>
              <button
                type="button"
                className="btn btn-primary btn-lg px-5 py-3"
                onClick={() => {
                  startV3PreTest(window.location.pathname);
                  setStage('pretest');
                }}
              >
                Let&apos;s begin
              </button>
            </section>
          )}

          {stage === 'pretest' && (
            <section aria-labelledby="v3-pretest-heading">
              <h2
                id="v3-pretest-heading"
                className="h3 text-center mb-4 v3-stage-heading"
                ref={stageHeadingRef}
                tabIndex="-1"
              >
                Pre-test
              </h2>
              <div className="mx-auto" style={{ maxWidth: '900px' }}>
                <iframe
                  src={PRE_TEST_FORM_URL}
                  title="Pre-test Google Form"
                  width="100%"
                  height="850"
                  style={{ border: 0, maxWidth: '100%' }}
                >
                  Your browser does not support embedded forms. Open the pre-test at{' '}
                  <a href={PRE_TEST_FORM_URL}>the Google Form</a>.
                </iframe>
                <div className="text-center mt-4">
                  <p id="v3-proceed-instruction">
                    Please complete the pre-test above. Once you have submitted it, click Proceed.
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary btn-lg px-5 py-3"
                    aria-describedby="v3-proceed-instruction"
                    onClick={() => {
                      startV3Journey(window.location.pathname);
                      setStage('games');
                    }}
                  >
                    Proceed
                  </button>
                </div>
              </div>
            </section>
          )}

          {stage === 'games' && (
            <section aria-labelledby="v3-games-heading">
              <h2
                id="v3-games-heading"
                className="h3 text-center mb-4 v3-stage-heading"
                ref={stageHeadingRef}
                tabIndex="-1"
              >
                {preGameMessages[journey?.completed?.length || 0]}
              </h2>
              <Row className="g-4 justify-content-center">
                {games.map(({ id, title, description, to, Icon }, index) => {
                  const completedCount = journey?.completed?.length || 0;
                  const isActive =
                    journey?.stage === 'games' &&
                    !journey?.currentGame &&
                    index === completedCount &&
                    V3_GAME_ORDER[completedCount] === id;
                  const isComplete = Boolean(journey?.completed?.includes(id));
                  const cardContent = (
                    <Card
                      className={`game-card h-100 shadow-sm text-decoration-none${isActive ? ' border border-primary border-3' : ' border-0'}`}
                      style={{
                        opacity: isActive ? 1 : 0.62,
                        cursor: isActive ? 'pointer' : 'default',
                      }}
                      aria-disabled={!isActive || undefined}
                    >
                      <Card.Body className="p-3 d-flex align-items-center">
                        <div className="card-icon me-3">
                          <Icon height={100} />
                        </div>
                        <div className="flex-grow-1">
                          <h3 className="h5 fw-bold mb-1">{title}</h3>
                          <small className="text-muted">{description}</small>
                          <div className="small mt-2 fw-semibold">
                            {isComplete ? (
                              <>
                                <span aria-hidden="true" className="text-success">✓ </span>
                                <span>Completed</span>
                              </>
                            ) : isActive ? (
                              'Next game — start here'
                            ) : (
                              'Available after the previous game'
                            )}
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  );

                  return (
                    <Col key={id} lg={4} md={6}>
                      {isActive ? (
                        <a
                          href={`${APP_BASE_PATH}?v3=1#${to}`}
                          className="d-block h-100 text-decoration-none"
                          onClick={(event) => {
                            if (!startV3Game(id, window.location.pathname)) {
                              event.preventDefault();
                            }
                          }}
                        >
                          {cardContent}
                        </a>
                      ) : (
                        <div>{cardContent}</div>
                      )}
                    </Col>
                  );
                })}
              </Row>
            </section>
          )}

          {stage === 'posttest' && (
            <section aria-labelledby="v3-posttest-heading">
              <h2
                id="v3-posttest-heading"
                className="h3 text-center mb-4 v3-stage-heading"
                ref={stageHeadingRef}
                tabIndex="-1"
              >
                Post-test
              </h2>
              <div className="mx-auto" style={{ maxWidth: '900px' }}>
                <iframe
                  src={POST_TEST_FORM_URL}
                  title="Post-test Google Form"
                  width="100%"
                  height="850"
                  style={{ border: 0, maxWidth: '100%' }}
                >
                  Your browser does not support embedded forms. Open the post-test at{' '}
                  <a href={POST_TEST_FORM_URL}>the Google Form</a>.
                </iframe>
                <div className="text-center mt-4">
                  <p id="v3-posttest-instruction">
                    After completing the post-test, click Finish.
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary btn-lg px-5 py-3"
                    aria-describedby="v3-posttest-instruction"
                    onClick={() => {
                      if (finishV3PostTest()) {
                        setStage('thankyou');
                      }
                    }}
                  >
                    Finish
                  </button>
                </div>
              </div>
            </section>
          )}

          {stage === 'thankyou' && (
            <section className="text-center" aria-labelledby="v3-thankyou-heading">
              <h2
                id="v3-thankyou-heading"
                className="h3 mb-3 v3-stage-heading"
                ref={stageHeadingRef}
                tabIndex="-1"
              >
                Thank you for participating!
              </h2>
              <p className="fs-5">
                You&apos;ve explored how design choices can shape the way we experience games.
              </p>
              <p className="fs-5">
                Take that curiosity beyond the game. Question what excludes, imagine what could
                change, and help make inclusion part of every design.
              </p>
            </section>
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default V3HomePage;

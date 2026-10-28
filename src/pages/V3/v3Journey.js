const V3_JOURNEY_KEY = 'equal-games:v3-journey';

export const V3_GAME_ORDER = ['color-clash', 'silent-surfing', 'dimmed-details'];

const V3_GAME_ROUTES = {
  'color-clash': {
    entry: '/color-clash',
    learnMore: '/color-clash/learn-more',
    roundPrefix: '/color-clash/round-',
    playPrefix: '/color-clash-play/game/',
    scoreboard: '/color-clash-play/recap',
  },
  'silent-surfing': {
    entry: '/silent-surfing',
    learnMore: '/silent-surfing/learn-more',
    roundPrefix: '/silent-surfing/round-',
    playPrefix: '/silent-surfing-play/game/',
    scoreboard: '/silent-surfing-play/recap',
  },
  'dimmed-details': {
    entry: '/dimmed-details',
    learnMore: '/dimmed-details/learn-more',
    roundPrefix: '/dimmed-details/round-',
    playPrefix: '/dimmed-details-play/game/',
    scoreboard: '/dimmed-details-play/recap',
  },
};

export function isV3JourneyRoute() {
  return new URLSearchParams(window.location.search).get('v3') === '1';
}

function isValidV3Path(path) {
  return (
    typeof path === 'string' &&
    path.startsWith('/') &&
    !path.startsWith('//') &&
    !/[?#\\]/.test(path) &&
    /^\/(?:.*\/)?v3\/?$/.test(path)
  );
}

function getDefaultV3Path() {
  const currentPath = window.location.pathname;
  const basePath = currentPath.endsWith('/')
    ? currentPath
    : currentPath.slice(0, currentPath.lastIndexOf('/') + 1);
  return `${basePath}v3`;
}

function isRoundSequence(rounds, lengthLimit = 4) {
  return (
    Array.isArray(rounds) &&
    rounds.length <= lengthLimit &&
    rounds.every((round, index) => round === index + 1)
  );
}

function isValidV3Journey(journey) {
  if (
    !journey ||
    typeof journey !== 'object' ||
    !isValidV3Path(journey.v3Path) ||
    !Array.isArray(journey.completed) ||
    !V3_GAME_ORDER.slice(0, journey.completed.length).every(
      (gameId, index) => journey.completed[index] === gameId
    ) ||
    journey.completed.length > V3_GAME_ORDER.length ||
    !Array.isArray(journey.rounds)
  ) {
    return false;
  }

  if (journey.stage === 'pretest') {
    return (
      journey.completed.length === 0 &&
      journey.currentGame === null &&
      journey.phase === null &&
      journey.rounds.length === 0
    );
  }

  if (journey.stage === 'games') {
    if (journey.completed.length >= V3_GAME_ORDER.length) {
      return false;
    }
    if (journey.currentGame === null) {
      return journey.phase === null && journey.rounds.length === 0;
    }
    if (journey.currentGame !== V3_GAME_ORDER[journey.completed.length]) {
      return false;
    }
    if (journey.phase === 'entry') {
      return journey.rounds.length === 0;
    }
    if (journey.phase === 'playing') {
      return isRoundSequence(journey.rounds);
    }
    return journey.phase === 'learn' && journey.rounds.length === 4 &&
      isRoundSequence(journey.rounds);
  }

  return (
    (journey.stage === 'posttest' || journey.stage === 'thankyou') &&
    journey.completed.length === V3_GAME_ORDER.length &&
    journey.currentGame === null &&
    journey.phase === null &&
    journey.rounds.length === 0
  );
}

export function readV3Journey() {
  const storedJourney = sessionStorage.getItem(V3_JOURNEY_KEY);
  if (!storedJourney) {
    return null;
  }

  let journey;
  try {
    journey = JSON.parse(storedJourney);
  } catch (error) {
    if (!(error instanceof SyntaxError)) {
      throw error;
    }
    console.error('Unable to parse saved V3 progress; restarting the V3 journey.', error);
    return null;
  }

  if (!isValidV3Journey(journey)) {
    console.error('Saved V3 progress is inconsistent; restarting the V3 journey.');
    return null;
  }
  return journey;
}

function saveV3Journey(journey) {
  sessionStorage.setItem(V3_JOURNEY_KEY, JSON.stringify(journey));
}

function hasCompletedCurrentGame(journey, gameId) {
  return (
    journey?.stage === 'games' &&
    journey.currentGame === gameId &&
    journey.phase === 'playing' &&
    journey.rounds?.length === 4 &&
    journey.rounds.every((round, index) => round === index + 1)
  );
}

function expectedRoundRoute(gameId, rounds) {
  const routes = V3_GAME_ROUTES[gameId];
  const nextRound = rounds.length + 1;
  return nextRound <= 4
    ? `${routes.roundPrefix}${nextRound}`
    : routes.scoreboard;
}

export function getV3RouteRedirect(pathname) {
  if (!isV3JourneyRoute()) {
    return null;
  }

  const journey = readV3Journey();
  const journeyPath = journey?.v3Path || getDefaultV3Path();
  const currentRoutes = V3_GAME_ROUTES[journey?.currentGame];
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';

  if (!journey || journey.stage !== 'games' || !currentRoutes) {
    return journeyPath;
  }

  let requestedGame;
  let requestedStep;
  let requestedRound;

  for (const [gameId, routes] of Object.entries(V3_GAME_ROUTES)) {
    if (normalizedPath === routes.entry) {
      requestedGame = gameId;
      requestedStep = 'entry';
      break;
    }
    if (normalizedPath === routes.learnMore) {
      requestedGame = gameId;
      requestedStep = 'learnMore';
      break;
    }
    if (normalizedPath === routes.scoreboard) {
      requestedGame = gameId;
      requestedStep = 'scoreboard';
      break;
    }

    const roundMatch = normalizedPath.match(
      new RegExp(`^${routes.roundPrefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\d+)$`)
    );
    const playMatch = normalizedPath.match(
      new RegExp(`^${routes.playPrefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\d+)$`)
    );
    if (roundMatch || playMatch) {
      requestedGame = gameId;
      requestedStep = 'round';
      requestedRound = Number((roundMatch || playMatch)[1]);
      break;
    }
  }

  if (!requestedGame) {
    return journeyPath;
  }
  if (requestedGame !== journey.currentGame) {
    return currentRoutes.entry;
  }
  if (requestedStep === 'entry') {
    if (journey.phase === 'entry' || journey.phase === 'learn') {
      return null;
    }
    return journey.phase === 'playing'
      ? expectedRoundRoute(journey.currentGame, journey.rounds || [])
      : journeyPath;
  }
  if (requestedStep === 'learnMore') {
    return journey.phase === 'learn' ? null : currentRoutes.entry;
  }
  if (requestedStep === 'scoreboard') {
    if (journey.phase === 'learn') {
      return currentRoutes.entry;
    }
    return hasCompletedCurrentGame(journey, journey.currentGame)
      ? null
      : expectedRoundRoute(journey.currentGame, journey.rounds || []);
  }

  if (journey.phase !== 'playing') {
    return currentRoutes.entry;
  }
  const expectedRound = (journey.rounds || []).length + 1;
  if (expectedRound > 4) {
    return currentRoutes.scoreboard;
  }
  return requestedRound === expectedRound
    ? null
    : `${currentRoutes.roundPrefix}${expectedRound}`;
}

export function getV3EntryMode(gameId) {
  if (!isV3JourneyRoute()) {
    return null;
  }

  const journey = readV3Journey();
  if (
    journey?.stage !== 'games' ||
    journey.currentGame !== gameId
  ) {
    return 'locked';
  }

  if (journey.phase === 'entry') {
    return 'start';
  }
  if (journey.phase === 'learn') {
    return 'learn';
  }
  return 'locked';
}

export function startV3Journey(v3Path) {
  saveV3Journey({
    stage: 'games',
    completed: [],
    currentGame: null,
    phase: null,
    rounds: [],
    v3Path,
  });
}

export function startV3PreTest(v3Path) {
  saveV3Journey({
    stage: 'pretest',
    completed: [],
    currentGame: null,
    phase: null,
    rounds: [],
    v3Path,
  });
}

export function startV3Game(gameId, v3Path) {
  const journey = readV3Journey();
  if (
    !journey ||
    journey.stage !== 'games' ||
    journey.currentGame !== null ||
    V3_GAME_ORDER[journey.completed.length] !== gameId ||
    !isValidV3Path(v3Path)
  ) {
    return false;
  }

  saveV3Journey({
    ...journey,
    currentGame: gameId,
    phase: 'entry',
    rounds: [],
    v3Path,
  });
  return true;
}

export function beginV3Game(gameId) {
  const journey = readV3Journey();
  if (
    !isV3JourneyRoute() ||
    !journey ||
    journey.stage !== 'games' ||
    journey.currentGame !== gameId ||
    journey.phase !== 'entry'
  ) {
    return false;
  }

  saveV3Journey({ ...journey, phase: 'playing', rounds: [] });
  return true;
}

export function recordV3RoundCompletion(gameId, roundNumber) {
  if (!isV3JourneyRoute()) {
    return false;
  }

  const journey = readV3Journey();
  const rounds = journey?.rounds || [];
  if (
    !journey ||
    journey.stage !== 'games' ||
    journey.currentGame !== gameId ||
    journey.phase !== 'playing' ||
    roundNumber !== rounds.length + 1 ||
    roundNumber > 4
  ) {
    return false;
  }

  saveV3Journey({ ...journey, rounds: [...rounds, roundNumber] });
  return true;
}

export function canCompleteV3Game(gameId) {
  return isV3JourneyRoute() && hasCompletedCurrentGame(readV3Journey(), gameId);
}

export function completeV3GameAndReturn(gameId) {
  const journey = readV3Journey();
  if (
    !isV3JourneyRoute() ||
    !hasCompletedCurrentGame(journey, gameId)
  ) {
    return false;
  }

  saveV3Journey({
    ...journey,
    phase: 'learn',
    postScoreboardReturn: gameId,
  });
  const basePath = journey.v3Path.replace(/\/v3\/?$/, '/') || '/';
  window.location.assign(`${basePath}?v3=1#${V3_GAME_ROUTES[gameId].entry}`);
  return true;
}

export function consumeV3PostScoreboardReturn(gameId) {
  if (!isV3JourneyRoute()) {
    return false;
  }

  const journey = readV3Journey();
  if (
    journey?.stage !== 'games' ||
    journey.currentGame !== gameId ||
    journey.phase !== 'learn' ||
    journey.postScoreboardReturn !== gameId
  ) {
    return false;
  }

  const journeyWithoutReturnMarker = { ...journey };
  delete journeyWithoutReturnMarker.postScoreboardReturn;
  saveV3Journey(journeyWithoutReturnMarker);
  return true;
}

export function completeV3LearnMore(gameId) {
  const journey = readV3Journey();
  if (
    !isV3JourneyRoute() ||
    !journey ||
    journey.stage !== 'games' ||
    journey.currentGame !== gameId ||
    journey.phase !== 'learn' ||
    V3_GAME_ORDER[journey.completed.length] !== gameId
  ) {
    return false;
  }

  const completed = [...journey.completed, gameId];
  saveV3Journey({
    ...journey,
    completed,
    currentGame: null,
    phase: null,
    rounds: [],
    stage: completed.length === V3_GAME_ORDER.length ? 'posttest' : 'games',
  });
  window.location.assign(journey.v3Path);
  return true;
}

export function getV3JourneyPath() {
  return readV3Journey()?.v3Path || getDefaultV3Path();
}

export function restartV3Journey() {
  const v3Path = getV3JourneyPath();
  sessionStorage.removeItem(V3_JOURNEY_KEY);
  window.location.assign(v3Path);
}

export function getV3ResumeRoute() {
  const journey = readV3Journey();
  if (!journey?.currentGame) {
    return null;
  }

  const routes = V3_GAME_ROUTES[journey.currentGame];
  return journey.phase === 'playing'
    ? expectedRoundRoute(journey.currentGame, journey.rounds || [])
    : routes.entry;
}

export function finishV3PostTest() {
  const journey = readV3Journey();
  if (!journey || journey.stage !== 'posttest') {
    return false;
  }

  saveV3Journey({ ...journey, stage: 'thankyou' });
  return true;
}

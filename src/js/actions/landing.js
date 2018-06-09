import { LANDING_LOAD, LANDING_UNLOAD } from '../actions';

export function loadLanding() {
  return { type: LANDING_LOAD };
}

export function unloadLanding() {
  return { type: LANDING_UNLOAD };
}

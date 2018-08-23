import React, { Component } from 'react';
import { from } from 'rxjs';
import { switchMap, delay } from 'rxjs/operators';
import * as api from '../util/api-util';
import '../styles/SwitchMapComponent.css';

export default class SwitchMapComponent extends Component {
  state = {
    character: '',
    planet: '',
    loading: true
  };

  componentDidMount() {
    // our first stream is responsible for getting the character
    const character$ = from(api.getStarWarsCharacter(3));

    // our second stream will pipe through the result from our first stream
    const homePlanet$ = character$.pipe(
      switchMap(c => {
        let starWarsDude = c;
        this.setState({ character: starWarsDude.name });
        return api.getHomePlanet(starWarsDude.homeworld);
      }),
      delay(2000)
    );

    // here we'll subscribe to the second stream
    // so that we can get the final result
    homePlanet$.subscribe(planet => {
      this.setState({
        loading: false,
        planet: planet.name
      });
    });
  }

  render() {
    const { planet, character, loading } = this.state;
    return (
      <div>
        Make two <strong>sequential</strong> calls
        {character && <h1>{character}</h1>}
        {loading && <h3 className="loading-strobe">loading planet...</h3>}
        {planet && <h1>{planet}</h1>}
      </div>
    );
  }
}

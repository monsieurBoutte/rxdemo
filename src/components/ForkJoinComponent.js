import React, { Component } from 'react';
import { from, forkJoin } from 'rxjs';
import * as api from '../util/api-util';

export default class ForkJoinComponent extends Component {
  state = {
    character: '',
    planet: '',
    film: ''
  };

  componentDidMount() {
    const character$ = from(api.getStarWarsCharacter(1));
    const planet$ = from(api.getHomePlanet('https://swapi.co/api/planets/1'));
    const film$ = from(api.getFilm(1));

    const starwarsResults$ = [character$, planet$, film$];

    // here we subscribe to a collection of all the streams above
    // and we'll get back the results once they've all completed
    // be sure to catch any possible errors
    // so that it doesn't break the chain of flow
    forkJoin(starwarsResults$).subscribe(results => {
      this.setState({
        character: results[0].name,
        planet: results[1].name,
        film: results[2].title
      });
    });
  }

  render() {
    const { character, planet, film } = this.state;
    return (
      <div>
        Wait for all observables to complete before returning{' '}
        <strong>all</strong> of the results
        {character && <h1>{character}</h1>}
        {planet && <h1>{planet}</h1>}
        {film && <h1>{film}</h1>}
      </div>
    );
  }
}

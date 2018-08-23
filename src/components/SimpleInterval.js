import React, { Component } from 'react';
import { Observable, interval } from 'rxjs';
import { skipUntil, take } from 'rxjs/operators';
import faker from 'faker';
import '../styles/SimpleInterval.css';

export default class SimpleInterval extends Component {
  state = {
    employees: []
  };

  componentDidMount() {
    const employeeSync$ = Observable.create(data => {
      setInterval(() => {
        data.next({
          jobTitle: faker.name.title(),
          email: faker.internet.email()
        });
      }, 1500);
    });

    const groupedEmployees$ = employeeSync$.pipe(
      skipUntil(interval(3000)),
      take(3)
    );
    groupedEmployees$.subscribe(person =>
      this.setState({
        employees: [...this.state.employees, person]
      })
    );
  }

  render() {
    const { employees } = this.state;
    return (
      <div>
        <h1>👩‍🔧 Random Employees 👨‍🔧</h1>
        {employees.length > 0 && (
          <React.Fragment>
            {employees.map((c, index) => (
              <ul className="employee-section" key={`${c}-${index}`}>
                <li>
                  Job Title: <strong>{c.jobTitle}</strong>
                </li>
                <li>
                  Email: <strong>{c.email}</strong>
                </li>
              </ul>
            ))}
          </React.Fragment>
        )}
      </div>
    );
  }
}

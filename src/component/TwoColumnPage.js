import React, { useRef, useEffect, useState } from 'react';
import './TwoColumnpage.css';

export default function TwoColumnPage() {
  const [togglePassword, setTogglePassword] = useState(false);
  const h1 = useRef(null);
  useEffect(() => {
    h1.current.focus();
  }, []);

  const togglePasswordEvent = function (e) {
    e.preventDefault();
    setTogglePassword(!togglePassword);
  };

  return (
    <div className="container">
      <div className="row">
        <div>
          <h1 className="header" tabIndex="-1" ref={h1}>
            column 1
          </h1>
        </div>
        <div>
          <form>
            <div className="text-left">
              <label className="d-block" htmlFor="userName">
                User Name
              </label>
              <input id="userName" type="text" />
            </div>
            <div className="text-left">
              <label className="d-block" htmlFor="password">
                User Name
              </label>
              <input
                id="password"
                type={togglePassword ? 'text' : 'password'}
              />
              <button id="togglePasswordBtn" onClick={togglePasswordEvent}>
                {togglePassword ? 'hide password' : 'show password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
